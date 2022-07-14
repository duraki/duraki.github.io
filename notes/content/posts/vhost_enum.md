---
title: "vhost Enumeration"
---

**`vhost` discovery via ffuf:**

```
# => first, find the total char lenght when the vhost does not exists
$ curl -s -H "Host: thisdoesntexists.target.ba" http://target.ba | wc -c
246

# => now use ffuf + filtering options to find valid vhosts
$ ffuf -w ~/SecLists/Discovery/DNS/subdomains-top1million-110000.txt -H "Host: FUZZ.target.ba" -u http://target.ba -fs 246 # -fc 404,403
```

**`vhost` discovery via Ruby:**
```
$ git clone https://github.com/jobertabma/virtual-host-discovery.git
$ cd virtual-host-discovery
$ ruby scan.rb --ip=51.77.138.18 --host=target.ba
```

=> then continue [here](/web-penetration-testing-oneliners)


