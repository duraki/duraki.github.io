---
title: "Frida & Objection Tutorial"
---

## Android Tutorial

### Frida Setup

Make sure to have Android Debugging interface running (`adbd`) on your testing device. For reference, read the [adbd setup](#adbd-setup) first and then continue here.

Install the Frida for [Android](https://frida.re/docs/android/):

```
$ adb root # might be required
$ adb push frida-server /data/local/tmp/
$ adb shell "chmod 755 /data/local/tmp/frida-server"
$ adb shell "/data/local/tmp/frida-server &"
```

Smoke test on Frida setup:

```
$ adb devices -l
$ frida-ps -U
# PID NAME 1590 com.facebook.katana
# 13194 com.facebook.katana:providers
# 12326 com.facebook.orca
# 13282 com.twitter.android
...
```

### `adbd` setup

* Change all SELinux permissions to **Permissable**
* Use SELinuxPermission Android application, which checks for `getenforce` on a system reboot
* In MagiskManager application, enable the [ADB Root](https://github.com/evdenis/adb_root)
* When device is rebooting, USB debugging will not work out of the box
* SSH to Android device, using OpenSSHD
* In SSH shell type the following:

```
# => On Android device (ssh)
% su
% whoami
% adbd

# => On Attackers machine (duh)
$ adb root
$ adb shell
(android) $ whoami # => root
```

## iOS Tutorial

### Frida Setup

* iOS connected over Wi-FI, Windows/Host connected to the same Wi-Fi, Linux/Guest connected to the same Wi-Fi
* Establish SSH connection to the iPhone (`ssh root@x.x.x.x -p $PORT`)
* SSH Auth combo (default): `root:alpine`
* Initiate a `frida-server` with remote connection listener
* In iOS device, open the application 
* In a new Terminal, connect to Frida server

To create a new `frida-server`, first remove frida autoload script and start manually:

```
# => Unload iOS daemon
$ launchctl unload -w /Library/LaunchDaemons/re.frida.server.plist

# => Start frida-server manually
Testers-iPhone:/Applications root# frida-server -l x.x.x.x
```

To establish a Frida REPL connection, use `frida` CLI:

```
root@kali:~# frida -H x.x.x.x -F
     ____
    / _  |   Frida 12.10.0 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://www.frida.re/docs/home/
[Remote::AppName]->
```

### Objection Setup

First reference to [Frida Setup](#frida-setup) to establish connection to the Frida server. Then use `objection` to investigate into the targeted application.

```
root@kali:~# objection -N -h 172.22.4.109 -g App explore
Using networked device @`172.22.4.109:27042`
Agent injected and responds ok!

     _   _         _   _
 ___| |_|_|___ ___| |_|_|___ ___
| . | . | | -_|  _|  _| | . |   |
|___|___| |___|___|_| |_|___|_|_|
      |___|(object)inject(ion) v1.9.4

     Runtime Mobile Exploration
        by: @leonjza from @sensepost

[tab] for command suggestions
x.xxxx.xxxxxxxx.xxxx on (iPhone: 13.3) [net] #
```

**Objection Usage**

$ env
x.xxx.xxxxxxxxx.xxxx on (iPhone: 13.3) [net] # env                                                                                                                                                        

```
Name               Path
-----------------  -------------------------------------------------------------------------------------------
BundlePath         /private/var/containers/Bundle/Application/DD6C2A3C-6CD3-44D0-9EAF-BC8EEE8C6702/App.app
CachesDirectory    /var/mobile/Containers/Data/Application/B26572F4-75BA-45C0-A6DE-40AEA275AF28/Library/Caches
DocumentDirectory  /var/mobile/Containers/Data/Application/B26572F4-75BA-45C0-A6DE-40AEA275AF28/Documents
LibraryDirectory   /var/mobile/Containers/Data/Application/B26572F4-75BA-45C0-A6DE-40AEA275AF28/Library
```

---

**References**

* [Frida and Objection](https://www.allysonomalley.com/2018/12/20/ios-pentesting-tools-part-3-frida-and-objection/)
* [Objection Mobile Exploration](https://kalilinuxtutorials.com/objection-mobile-exploration/ )
* [Frida and Objection via x64.sh](https://x64.sh/mobile/security/2019/06/01/Frida-and-Objection/)
* [Objection/Frida Guide](https://www.secjuice.com/objection-frida-guide/)

