---
title: "MITM_Intercept"
---

Configure your MacOS to point `/etc/private/hosts` to real server.

Next use the following script to print and return handlers.

```
## basic intercept tcp macos desktop via /etc/private/hosts

def handle_request(message):
	print(message)
    return message + b"\x00"

def handle_response(message):
    # Both functions must return a message.
    print(message)
    return message
```

Run `mitm_intercept.py` with the following command line:

`$ mitm_intercept.py -l u:x.x.x.x:port t:x.x.x.x.x:port -t u:x.x.x.x:port x.x.x.x:port -p x.x.x.x:8080`

References:

* via `-l` listener
* via `u:` & `t:` udp + tcp listener
* via `-t` target
* via `-p` proxy listener (burp)
* via `-m` (mix connection) performs TCP relay without SSL handshake

> In this case, the communication goes through the HTTP modification server running on `127.0.0.1:49999` (via MITM Intercept) and Burp's proxy.

Connection to MSSQL is made by TDS Protocol on top of TCP. The authentication itself is performed with TLS on top of the TDS protocol. To see intercept that TLS process, we will need two patchy modification scripts:

```
# => demo-script-handler-1.py

from time import time
from struct import pack
from pathlib import Path

def handle_request(message):

	if message.startswith(b"\x17\x03"):
		return message

	with open("msg_req" + str(time()), "wb") as f:
		f.write(message[:8])

	return message[8:]

def handle_response(message):

	if message.startswith(b"\x17\x03"):
		return message

	path = Path(".")
	try:
		msg_res = min(i for i in path.iterdir() if i.name.startswith("msg_res"))
		data = msg_res.read_bytes()
		msg_res.unlink()
	except ValueError:
		data = b'\x12\x01\x00\x00\x00\x00\x01\x00'

	return data[:2] + pack(">h", len(message)+8) + data[4:] + message
```

```
# => demo-script-handler-2.py

from time import time
from struct import pack
from pathlib import Path

def handle_request(message):

    if message.startswith(b"\x17\x03"):
        return message

    path = Path(".")
    try:
        msg_req = min(i for i in path.iterdir() if i.name.startswith("msg_req"))
        data = msg_req.read_bytes()
        msg_req.unlink()
    except ValueError:
        data = b'\x12\x01\x00\x00\x00\x00\x01\x00'


    return data[:2] + pack(">h", len(message)+8) + data[4:] + message


def handle_response(message):

    if message.startswith(b"\x17\x03"):
        return message

    with open("msg_res" + str(time()), "wb") as f:
        f.write(message[:8])

    return message[8:]ž
```

With that, and `tmux`:

**start a backbone listener** with script **(1)**:

`$ python mitm_intercept.py -l 192.168.48.1:49801 -t 127.0.0.0.1:49801 -p 127.0.0.1:8080 -s demo-script-handler-1.py` 

**start a tls proxy**

`$ python mitm_intercept.py -m -l 127.0.0.1:49801 -t 127.0.0.1:49800 -p 127.0.0.1:8080 -w 127.0.0.1:49998 -lc cert.pem -lk key.pem -tv tls1 -ci ALL:eNULL`

{{< details >}}
(the above uses a listener configuration with a certificate and a private key, you are obligated to change tls version and the chipers manually. the target will be third listener)
{{< /details >}}

**start a target listener** with script **(2)**:

`$ python mitm_intercept.py -l 127.0.0.1:49800 -t 192.168.48.128:49801 -p 127.0.0.1:8080 -s demo-script-handler-2.py -w 127.0.0.1:49997` 

**start a target udp listener** for targeted **db**:

`$ python mitm_intercept.py -l u:192.168.48.1:1434 -t u:192.168.48.128.1434 -p 127.0.0.1:8080 -w 127.0.0.1:49996`



