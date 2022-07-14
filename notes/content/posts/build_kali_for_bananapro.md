---
title: "Building Kali Linux for Banana Pro"
---

### Equipment

* MacOS with GNU/Linux Virtual Machine or GNU/Linux equivalent
* LeMaker Banana Pro `arm_pc` 
* SDCard with at least 16GB capacity (preferably "Class 10" or higher)

### Build Instructions

The Banana Pro has a dual core 1GHz Cortex™-A7 processor with a Mali400MP2 GPU and 1GB DDR3 RAM. Kali Linux can run from an external microSD card.
  
Kali Linux is [supporting Banana Pro](https://www.kali.org/docs/arm/banana-pro/) but it must be built from source. You will obviously need a GNU/Linux based OS (preferably Kali Linux) -- although I personally use VMWare Workstation with **Ubuntu 20.04**. I'd advice you to `mkswap` of at least 8GB space, and extend your drive to min. 120GB. The build instructions are summarised below, with Banana Pro build script [described here](https://gitlab.com/kalilinux/build-scripts/kali-arm/-/blob/master/banana-pro.sh):

```
$ cd ~/
$ git clone https://gitlab.com/kalilinux/build-scripts/kali-arm
$ cd ~/kali-arm/
$ sudo ./common.d/build_deps.sh 			# will take some time

# => i'm a fan of Mate DE
$ sudo ./banana-pro.sh --desktop mate

	 Compilation info 
	 Hardware model:  Banana Pro (32-bit) 
	 Architecture: armhf 
	 OS build: kali-rolling 2022.2 
	 Desktop manager: mate

	 ...
```

The generated image will be deployed in the `./images` directory with the `*.img.xz`.

### Post-Build Instructions

After successfully building a Kali Linux image for Banana Pro, via the process explained above, you can now proceed to deploy the final `arm` image by any route of your interest.
  
Therefore, if you want to use `dd` -- via GNU/Linux or MacOS:

`xzcat images/kali-linux-2022.2-banana-pro-xfce-armhf.img.xz | sudo dd of=/dev/sdb bs=4M status=progres`

Or, if you are like me -- favoring [BalenaEtcher](https://www.balena.io/etcher/) which automatically fixes BOOT disk partitions:

> Pick an Image -> Select SD Card -> **Etch!**

### Running

Your Banana Pro might need a first-setup hardware equipment (display, mouse & kb). 

**Preflight Configuration:**

I usually deploy the following config once I'm logged in Kali:

```
# => ssh kali@x.x.x.x
$ touch .hushlogin 		# => remove welcome message
$ echo $PS1 			# => (in .bashrc): PS1="@\h [\s] \w "
		"@\h [\s] \w "

@ kali [-bash] ~ 		# => clean term prompt
```

**Enabling `root` account:**

```
kali@kali:~$ sudo passwd
[sudo] password for kali:
```

**Enabling `root` for SSH:** 

```
kali@kali:~$ grep PermitRootLogin /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# the setting of "PermitRootLogin without-password".
kali@kali:~$
kali@kali:~$ man sshd_config | grep -C 1 prohibit-password
     PermitRootLogin
             Specifies whether root can log in using ssh(1).  The argument must be yes, prohibit-password, forced-commands-only, or no.  The default
             is prohibit-password.

             If this option is set to prohibit-password (or its deprecated alias, without-password), password and keyboard-interactive authentication
             are disabled for root.
kali@kali:~$
kali@kali:~$ sudo systemctl restart ssh
```

**Upgrading & Updating the box**

```
kali@kali:~$ sudo apt update
kali@kali:~$ sudo apt full-upgrade -y
kali@kali:~$ sudo apt install -y kali-linux-default
```

Other metapacakages: [System Packages](https://www.kali.org/docs/general-use/metapackages/#system), [DE's](https://www.kali.org/docs/general-use/metapackages/#desktop-environmentswindow-managers), [Tools Package](https://www.kali.org/docs/general-use/metapackages/#tools), [Menu Package](https://www.kali.org/docs/general-use/metapackages/#menu)

Additional info is [available on Kali.org](https://www.kali.org/docs/general-use/) website, which includes `Kali In The Browser (noVNC)`, `Kali In The Browser (Guacamole)`. 