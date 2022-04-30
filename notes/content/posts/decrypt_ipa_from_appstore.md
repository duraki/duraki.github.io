---
title: "Decrypt IPA from AppStore"
---

Requires `iproxy` and `frida-ios-dump`. File will be generated in current
directory with `*.ipa` extension.

```
# => Start iproxy
$ iproxy 2222 22

# => Lists App from iOS processes
$ cd ~/util/re/ios/frida-ios-dump
$ python dump.py -l

PID Name Identifier
---
- App Name Here xxx.xxxxxx.xxxxxx.xx

# => Dump App from iOS device
$ ./dump.py xxx.xxxxxx.xxxxxx.xx
...
```
