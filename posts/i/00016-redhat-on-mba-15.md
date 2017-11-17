---
title: Challenge/ Apple & Redhat Enterprise Linux
date: Nov 12 2017
tags: ["challenge", "redhat", "rhel", "macbook", "air", "setup"]
---

## What?

Trying to setup a sort of normal distro on Macbook is itself demanding task, but
stepping up the game and putting RedHat on a tiny Air is another fun.
  
Older Macbook of mine survived with Ubuntu for a fair time. Common issues takes
time, like network connection setup and small polishing details, which is
logical. Network issues are present because of large amount of devices, 
standards and small number of developers who contribute. Another thing to point
at is security, for which we hear and horror stories every now and then on 
/r/netsec, hn and alike.
  
What I'm trying to show is issue you will mostly face if you try this. At the
end you'll have something unique and stable.
  
Currently typing this on Macbook Air from 2015 running a fully-supported
RHEL.

## How?

First and foremost, RH is enterprise distribution, which means you'll have to be
subscribed to their SPM system which allows you to have all these toolsets they
offer. Not having that will  result in a non-working environment and
unsupported system. You may be allowed to use `Developers Edition` or something
like that which is offered for free and in what you get is only a basic toolset
to build your machine.
  
Me, I'm subscribed to a desktop oriented system with support of security and
development edition. Preffered choice for my daily usage which is devOping such
system at large.
  
Most basic `dd` and a 16GB USB3.0 will do it fine with your new shiny USB
already inside your Mac. Holding (Apple) Option key will result your boot to
jump in device selection. Of course continue with installation through `EFI
Boot` as with any other distribution. No problem arises.
  
Through installation you may be asked to set installation media, which needs to
say `Auto-detected installation media`. If it's not working, try rewriting image
to your USB again.

Set the root password and reboot the system.

## Status

Once you boot in, you will have the most basic [GNOME &
KDE](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/3/html/Reference_Guide/s1-x-clients.html) installed and ready for use. This is of course
if you subscribed already to repositories you have to and registered your
    machine. But first.
  
**What works:**

* Display / Brightness 
* Keyboard / LED
* Mousepad
* Battery / Charging

**What doesn't work:**

* Network (Wireless)
* CPU Fans
* Audio / Microphone

I'm not sure about **camera**, and as seen [here](http://atodorov.org/blog/2015/04/26/installing-red-hat-enterprise-linux-7-on-macbook-air-2015/) I'm having different 
setup issues which is not strange since I'm working on different RH version.
  
Moving on, **one night** was spent fixing network, **one night** fixing audio, and **one
night** fixing audio/mic.

### Network (Wireless)

Thankfully, my friend @e_mouse had given me a USB to Ethernet cable just the
other day. This worked out of the box and I started furiosuly working on
solution.
  
If you try to follow blog post above, and the fix presented
[here](http://atodorov.org/blog/2015/04/27/compiling-broadcom-wl-kmod-wifi-driver-for-rhel-7/)
you will see that it isn't working. I didn't figure out what the problem was but
perhaps the given repository might work.
  
As of me, I followed the instructions given on [elrepo](https://elrepo.org/tiki/wl-kmod).

```
$ lspci| grep Network
03:00.0 Network controller: Broadcom Limited BCM4360 802.11ac Wireless Network Adapter (rev 03)

# support
14e4:43a0	no	BCM4360
```

Out of the box, this wireless card is [not
supported](https://wireless.wiki.kernel.org/en/users/drivers/b43). Alternative
is to use `wl`, solid choice for me since I had experience with it. RedHat team
also have great support for these stuff so that is a huge plus.

So lets get all stuff necessary to compile `wl` for our fresh install.
  
```
# Root

$ yum group install -y 'Development Tools' # for compiling
$ yum install -y redhat-lsb kernel-abi-whitelists # std base & kernel symbols
$ yum install -y kernel-devel-$(uname -r) # kernel dev libs
 
# User

$ mkdir -p ~/rpmbuild/{BUILD,RPMS,SPECS,SOURCES,SRPMS}
$ echo -e "%_topdir $(echo $HOME)/rpmbuild\n%dist .el$(lsb_release -s -r|cut -d"." -f1).local" >> ~/.rpmmacros
```

We also need *wl-kmod* (tool used to manage wl module) and Broadcom drivers. You
can get both of these from their public repos.

To get **Broadcom drivers** [link - linux STA 32/64](http://www.broadcom.com/support/802.11)

```
$ cd ~/rpmbuild/SOURCES/
$ wget https://docs.broadcom.com/docs-and-downloads/docs/linux_sta/hybrid-v35_64-nodebug-pcoem-6_30_223_271.tar.gz
```

Build and prepare `wl-kmod` for install:

```
$ cd ~/rpmbuild
$ wget http://elrepo.org/linux/elrepo/el7/SRPMS/wl-kmod-6_30_223_271-4.el7.elrepo.nosrc.rpm 

# Build
$ rpmbuild --rebuild --define 'packager James Madison' ~/rpmbuild/wl-kmod-6_30_223_271-4.el7.elrepo.nosrc.rpm 
```

Now lets clean up the mess:

```
$ yum remove \*ndiswrapper\*

# Install
$ rpm -Uvh ~/rpmbuild/RPMS/[architecture]/kmod-wl*.rpm
```

**Important notice:**

For some reason, I was getting network hiccups as seen in kernel logs. This was
up to other drivers taking place at packdrop. To fix this, just disable what you
don't need.

```
$ modprobe -r b43 b43legacy ssb wl lib80211
$ modprobe lib80211_crypt_tkip
$ modprobe wl
```

You can now grab a beer since this night is over.

```
$ rm -rf ~/rpmbuild
```
