---
title: Code/ What I'm working on #01
date: Dec 11 2017
tags: ["nettis", "jeep"]
---

Some of you will understand this, once you hear family, friends, coworkers, or 
even your dog calling you by the name of `hacker`, you start to believe them.
Kind of funny tho, since once you get to that level you'd rather prefer not.
  
Don't you learn everyday? And when you check out the scene, the tiny
fraction of knowledge you have is nothing compared to what is out there.
Therefore, you don't expect to ever become one.
  
Or so do you think. Contributing your time "to the stuff" is already a way. 
You may not be a best hacker, but you still are one. A small kind, respected in 
your own way.
  
That is, if you are not already 2skiddy.

I'll force myself to write a couple of `What I'm working on`, which might seems
interesting in the sense of my contribution. 

# Nettis (Open-source)

[GitHub repo](https://github.com/duraki/nettis)
  
This is something I wanted to have all my life. Basically, it's a copy of `Shodan`, a
famous tool for pentesters. Why another clone? **Good question!** It is
built for country of Bosnia and Herzegovina which I reference to quite some of
my tools. And it will be built on top of Shodan itself!
  
This is the first sketch of `nettis`.
  
PLACEIMGHERE

I know, image does not show much. At the upper layer, there is top-level domain
builder. It should support a queue-like environment to scan and map domains from
all possible sources. Once a domain is found, it does a deep scan to get
possible domains within the same root. As such, using reverse techniques, or
routes, various different fingering (ehm ...) methods to do the scan are
possible.
  
Important domains (as in - business domains, not real one), is reverse
engineering to lowest lever. A zonefile is missing for this ccTLD, so we need
to gather info from various different sources.
  
At the **bottom layer**, there is a split map, one for server machines (read dc, 
hosts, isp), and other for local pcs (users, human beings).
  
In the middle, there is a storage, zero-cost, all goes on gist+github. Once we
stash everything, a queue will have zeroep, it should do something all the time.
  
Controling the bot with Telegram or similar is great, especially if the bot is
running 24/7 on Pi cluster.
  
At the end, I'm supposed to have information about 130k+ domain owners
(clients?), (thats nice), plus a whole network in the country mapped to ground. 
All info is already publicly available, the bot will just deep scan to connect these dots.
  
Checkout the project on [GitHub](https://github.com/duraki/nettis), I'm studying 
Crystal with it.
  
# Jeep - Metasploit for your car

[GitHub repo](https://github.com/duraki/jeep)

`jeep` is a Metasploit-like framework for CAN interfaces, mostly used in vehicle 
and automobile systems. This tool should allow you to interact with your tty 
in a simple manner, implementing both plugin system and native environment. There 
is also an API header file available for reuse and faster module writings.
  
That is how I explain this tool in few words. It's especially nice since it's
open-source, so you can learn a bit of CAN. 
  
`jeep` will be featured on [CAN Newsletter](https://can-newsletter.org/) very
soon where you will get the basic details of what it actually is. For more, read
my introduction to vehicle hacking and follow the
[repository](https://github.com/duraki/jeep).
