---
title: "Firewall Engagements"
---

Reconned from the start to finish in a few sec ...

```
┌──(kali㉿kali)-[~]
└─$ ping x.x.x.x 
PING ??? 56(84) bytes of data.
64 bytes from ???: icmp_seq=1 ttl=52 time=64.4 ms
64 bytes from ???: icmp_seq=2 ttl=52 time=62.7 ms
^C
--- ??? ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms

┌──(kali㉿kali)-[~]
└─$ host x.x.x.x 
```

```
% nslookup 
> set type=PTR
> x.x.x.x
Server:	        ???	
Address:        ???	

Non-authoritative answer:
...
```

```
% whois x.x.x.x (example.ba)
```

TCP Port Scan (Active)

```
% sudo nmap -sS  x.x.x.x
PORT     STATE SERVICE
8089/tcp open  unknown
```

UDP Port Scan

```
% sudo nmap -sU --top-ports=100 x.x.x.x
PORT   STATE         SERVICE
9/udp  open|filtered discard
67/udp open|filtered dhcps
```

Using `masscan` for rate allowance

```
% sudo masscan 80.101.121.42 -p0-65535 --rate
Scanning 1 hosts [65536 ports/host]
Discovered open port 4433/tcp on x.x.x.x
```

OS Detection

```
% sudo nmap -O x.x.x.x
```

Port Service detection

```
% sudo nmap -sV -sS x.x.x.x -p $PORT           
PORT     STATE SERVICE VERSION
$PORT/tcp open  http    FRITZ!Box TR-069 service
```

Enumerate HTTP Paths via `nmap`

```
$ nmap -n -p80,4433,8080,8089,9443 --script http-enum x.x.x.x 

PORT     STATE  SERVICE
80/tcp   closed http
4433/tcp open   vop
8080/tcp closed http-proxy
8089/tcp open   unknown
9443/tcp closed tungsten-https
```

Certificate identification

```
% nmap -sV --script ssl-cert-intaddr $SONICWALL -Pn -p4433,8089,80,9443,443 
...

PORT     STATE    SERVICE        VERSION
80/tcp   filtered http
443/tcp  filtered https
4433/tcp open     ssl/http       SonicWALL firewall http config
|_http-server-header: SonicWALL
| ssl-cert-intaddr: 
|   Subject commonName: 
|     192.168.168.168
|   Issuer commonName: 
|_    192.168.168.168
8089/tcp open     http           FRITZ!Box TR-069 service
9443/tcp filtered tungsten-https
Service Info: Devices: firewall, broadband router
```

Active DNS Enumeration from the $ISP:

```
% amass intel -active -addr x.x.x.x
```

Firewalk Evasion

```
% sudo nmap --script=firewalk --traceroute x.x.x.x
...

PORT    STATE   SERVICE

Host script results:
| firewalk: 
| HOP  HOST           PROTOCOL  BLOCKED PORTS

TRACEROUTE (using port 443/tcp)
HOP RTT      ADDRESS
1   ...
```

[`vhost`](./vhost-enumeration) discovery

```
$ nmap -p4433,8089,80,9443 --script="+http-vhosts" $SONICWALL -Pn       

PORT     STATE    SERVICE
...
```

wafw00f  implementation

```
% wafw00f https://x.x.x.x:4433 -a -v

                ______
               /      \                                                      
              (  W00f! )                                                     
               \  ____/                                                      
               ,,    __            404 Hack Not Found                        
           |`-.__   / /                      __     __                       
           /"  _/  /_/                       \ \   / /                       
          *===*    /                          \ \_/ /  405 Not Allowed       
         /     )__//                           \   /                         
    /|  /     /---`                        403 Forbidden                     
    \\/`   \ |                                 / _ \                         
    `\    /_\\_              502 Bad Gateway  / / \ \  500 Internal Error    
      `_____``-`                             /_/   \_\                       
                                                                             
                        ~ WAFW00F : v2.1.0 ~                                 
        The Web Application Firewall Fingerprinting Toolkit                  
                                                                             
[*] Checking https://???
[+] The site https://??? is behind SonicWall (Dell) WAF.
```

**Other Technqs**

* Phineas' Phisher VPN exploit
* Manual SQL Injection via binary patch diffing of vuln/non-vuln version
* Bruteforce Attack (Rate Limiter, Bypass)
* VPN or Firewall Version Disclosure
* Known Exploits and CVE's
* Potential SQLmap payload
