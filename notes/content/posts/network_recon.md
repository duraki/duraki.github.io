---
title: "Network Recon"
---

## External Network Engagement

**nmap oneliners (do-it-all)** + fw evasion

```
$ nmap -Pn -vvv -sC --script=firewalk -p1-65535 -D RND:10 <target>
```

**basic recon**

```
$ nslookup
set type=NS
x.x.x.x
```

**basic nmap**

```
$ sudo nmap -sS 80.101.121.42                 # syn scan first
$ sudo nmap -O 80.101.121.42                  # os detection
$ sudo nmap -sV -sS 80.101.121.42 -p 8089     # service detection 
$ nc 80.101.121.42 8089                       # try connecting via detected ports
```

**basic masscan**

```
$ sudo masscan 80.101.121.42 -p0-65535 --rate 10000 -eutun2     # => via vpn tunnel (tun2) 
$ sudo masscan 80.101.121.42 -p0-65535 --rate 10000             # => default eth
```

**nmap exoitc firewall evasion rules**

* [Bypassing Firewall Rules](https://nmap.org/book/firewall-subversion.html)

**ping gateway ipv4 address**

```
$ nmap -sn -v -PE 192.168.*.1
```

**dns enumeration**

```
$ dig –t any example.ba
```

**revere DNS lookup**

```
$ sudo nmap -sL x.x.x.x
```

**identity alive ipv4**

```
$ sudo nmap-sn-n x.x.x.x
```

**asn/bgp extractoion**

* [BGP View](https://bgpview.io/ip/x.x.x.x)
* [BGP.he.net](https://bgp.he.net/ip/x.x.x.x)

**reverse ip domain lookup**

* [Domainstools](https://reverseip.domaintools.com/search/?q=x.x.x.x)

**zoomeye search**

* [zoomeye](https://www.zoomeye.org/searchResult?q=80.101.121.42)

**additional nmap scripts**

```
# => Basic Recon
nmap -n p80,<port>,... --script http-enum x.x.x.x
nmap -v --script dos x.x.x.x
sudo nmap -v --script vuln x.x.x.x
nmap -n -p --script dns-brute x.x.x.x

# => Vuln scan
nmap -sV --script=vulners x.x.x.x
sudo nmap -sV -Pn -p4000-4433,8000-8089,80-443,9000-9443 --script=vulscan/vulscan x.x.x.x
```

**firewall evasion**

* [Firewall Penetration Test](/firewall-engagement)

```
# => Firewall Hopping
$ nmap --script=firewalk --traceroute x.x.x.x

# => Firewall Vulnerability Scanning
$ nmap --script nmap-vulners,vulscan --script-args vulscandb=scipvuldb.csv -sV -p$PORT x.x.x.x
```

**run specific nmap scripts on specific port**

```
┌──(kali㉿kali)-[/usr/share/nmap/scripts]
└─$ sudo nmap --script "+http-*" x.x.x.x -p4433,8089,80,9443
```

**discover vhost on the target**

* [Virtual Host Enumeration](/vhost-enumeration)

```
$ nmap -p4433,8089,80,9443 --script="+http-vhosts" x.x.x.x -Pn
```

**`PUT` directly to server**

```
$ nmap -p 4433,8089 x.x.x.x --script http-put --script-args http-put.url='/',http-put.file='fileput.txt' -Pn
```

**detecet WAF**

```
$ nmap --script=http-waf-fingerprint --script-args http-waf-fingerprint.intensive=1 x.x.x.x -Pn --top-ports=100
```

**SSL scan**

```
$ nmap -sV --script ssl-dh-params x.x.x.x -Pn -p4433,8089,80,9443,443
```

**heartbleed scan**

```
$ nmap -sV --script ssl-heartbleed x.x.x.x -Pn -p4433,8089,80,9443,443
```

**known SSL keys**

```
$ nmap -sV --script ssl-known-key x.x.x.x -Pn -p4433,8089,80,9443,443
```

**check for POODLE**

```
$ nmap -sV --version-light --script ssl-poodle -p4433,8089,80,9443,443 x.x.x.x -Pn
```

**check for SSLv2 DROWN**

```
$ nmap -sV --script=sslv2-drown -p4433,8089,80,9443,443 x.x.x.x -Pn
```

**try banner grabbing**

```
$ nc -nvv x.x.x.x 4433
(UNKNOWN) [???] 4433 (?) open
```

**try dumping pcap files**
```
$ sudo tcpdump -ttttnnr tcp_dump.pcap
tcpdump -qns 0 -A -r blah.pcap
```

