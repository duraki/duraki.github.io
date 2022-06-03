---
title: "Network Reverse Engineering"
---

using **netstat (xnu)** to print only TCP entries for a specific PID:

```
$ netstat -anvp tcp | awk '{ if ($9 == PID) print }'

# => ie.
#  $ netstat -anvp tcp | awk '{ if ($9 == 1105) print }'
## tcp4       0      0  192.168.0.25.52952     52.0.253.194.443       ESTABLISHED 131072 131072   1105      0 0x0102 0x00000000
## tcp4       0      0  127.0.0.1.45112        *.*                    LISTEN      131072 131072   1105      0 0x0100 0x00000106
## tcp4       0      0  127.0.0.1.30666        *.*                    LISTEN      131072 131072   1105      0 0x0100 0x00000106
```

using **netstat (xnu)** for inet, tcp or udp:

```
$ netstat -anvp inet/tcp/udp # => pick one
# => other shorthands: inet,inet6,pfkey,atalk,netgraph,ipx,unix,link,sctp,udp,ddp (man netstat)
```

using **netstat (linux)** for host matching:

```
$ netstat -a -c | grep -i example.com
```