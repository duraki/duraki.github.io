---
title: "Windows Notes"
---

When setting up Reverse Engineering workstation, use `retoolkit` for a start kit.

---

**Extract WiFi cleartextr password**

```
cls & echo. & for /f "tokens=4 delims=: " %a in ('netsh wlan show profiles ^| find "Profile "') do @echo off > nul & (netsh wlan show profiles name=%a key=clear | findstr "SSID Cipher Content" | find /v "Number" & echo.) & @echo on
```

**Active Directory**

Access Active Directory Domain Admin via Linux:

```
$ sudo apt-get realmd
$ realm join example.ba --user username
```

See also [Linux Notes](/linux-notes)

Resource:

* [AD Attack-Defense](https://github.com/infosecn1nja/AD-Attack-Defense)
* [Windows Data Hunting](https://thevivi.net/2018/05/23/a-data-hunting-overview/)

