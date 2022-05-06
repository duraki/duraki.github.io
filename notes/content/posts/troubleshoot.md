---
title: "Troubleshoot"
---

## VirtualBox || VMWare

**When in Kali Linux and doing Security Assessment**

* Make sure to set VMWare Kali Box to use NAT (so the VPN connection can be shared from Host, ie. MacOS)

**When installing VMWare from JAMF but it doesn't work**

- Install VMWare via JAMF Store (to obtain License Key)
- Backup the license-fusion-120-e3-202001 from the JAMF Store VMWare Installation Application Support
- Manually downloading the new DMG
- Removing the JAMF Store VMWare installation
- Installing the DMG and activating via above license

**Guest addition shared folder does not work**

```
# => Work in linux-based vmbox
$ sudo /usr/bin/vmhgfs-fuse .host:/ /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other
```

**Guest addition shared clipboard does not work**

```
# => Start from Terminal or on Startup
$ /usr/bin/vmware-user

# => Another option is to bring daemon
$ vmtoolsd -n vmusr

# => For Microsoft Windows
> taskkill /F /IM vmtoolsd.exe
> "C:\Program Files\VMware\VMware Tools\vmtoolsd.exe" -n vmusr
```

**Fix Kali Linux screen resolution**

```
xrandr --newmode "2560x1440_40.00"  201.00  2560 2720 2984 3408  1440 1443 1448 1476 +hsync +vsync
xrandr --addmode Virtual1 2560x1440_40.00
xrandr --output Virtual1 --mode 2560x1440_40.00
```

**Install XFCE4 + Openbox in Kali**

(Increases Speedyness)

```
$ apt-get install kali-defaults kali-root-login desktop-base xfce4 xfce4-places-plugin xfce4-goodies openbox

# => login in xfce session
$ openbox --replace & exit
```

## Burp Proxy

When connecting to a **new wi-fi** or internet connection, make sure to:

* Click Network in the Taskbar Properties
* Configure Firewall and Security Settings
* In Windows Security, click "Allow an app through firewall"
* Click **Change Settings**
* Select Burp Proxy / Charles etc. and select all 3 checkboxes (Network, Home, Public)
