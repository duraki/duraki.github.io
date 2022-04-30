---
title: "Network Lab"
---

## Simple Topology 

**In GSN3**, add 2 VPCS and 2 Cisco routers. Start VPCS and enter Console mode.
Append IPv4 address for the interface.

```
# sets ipv4; netmask and gw for the vpc
PC1> ip 192.168.0.10/24 192.168.0.1 
Checking for duplicate address...
PC1 : 192.168.0.10 255.255.255.0 gateway 192.168.0.1

# ... same for the 2nd vpc with different static ip
# PC2> ip 192.168.0.11/24 192.168.0.1
```

Always save the configuration of the assets with **save** command:

```
PC1> save
Saving startup configuration to startup.vpc
.  done
```

## Advanced Topology

## Corporate Topology

## SCADA Topology
