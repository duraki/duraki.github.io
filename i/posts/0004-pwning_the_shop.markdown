---
title: Pwning the shop - Electronicpromo!
date: Mar 19 2014
tags: ["pwning", "hacking", "shop", "carders", "vpro"]
---

Long time no see. First post on english, let's start. Today special is pwning the old carding shop called "electronicpromo". Electronicpromo allows various carder from around the world to check credit card balance, additional check if credit card is valid and working, check for VBV (Verified by Visa) & MCSC (Mastercard Secure Code) etc. We will cover all of them later but first.. Let take a small look at information of Electronicpromo.

## I Gathering info Electronicpromo  
  
    Website     : electronicpromo.net
    IP          : 192.184.8.95
    Name servers: yns1.yahoo.com ; yns2.yahoo.com
    Mail server : mail.electronicpromo.net

![DNS](http://i.imgur.com/Xn9eHVK.png)

 Domain is registered @ melbourneit.com. You can check whole whois at whois.melbourneit.com. Particular thing I found very interesting is registration and creation date of domain which is 01/05/2010. Seems that either domain administrator don't have a life, or lives in a country which doesn't celebrate (International) Workers' Day [1]. Just to note that whois registration info is private, either by private-whois or another offshore service.

## II What does EP offer

Login form @ front-page
http://i.imgur.com/aTyAs2v.png

Registration page: It is invite only so don't bother contacting them, if you are security researcher, I can give it to you for free, just write me on twitter (@dn5__)
http://i.imgur.com/pXfKpRn.png

Dashboard / Account home
You can see service they offer: CCV Checker 69; 3D Secure Checker & Balance CVV Checker
http://i.imgur.com/yGZusai.png

 CCV Checker 69 - Visa, Mastercard, Amex, Discover; Accepting all country
http://i.imgur.com/lA3yJtK.png

 3D Secure Checker - Visa, Mastercard; Accepting all country
http://i.imgur.com/hmyXH3X.png

 Balance CVV Checker (Check card balance) - Visa, Mastercard, Amex, Discover; Accepting all country
http://i.imgur.com/omtkYeK.png

 Profile page / Change password
http://i.imgur.com/sx8qHT4.png

 They even offer own API, which is by the way, exploitable but we will leave that for later on. Bellow is the picture of their API Service. 
http://i.imgur.com/ik0F3ka.png

III MY HAX0RZ SKILLS

First step is to dig inside of domain name, check behaviour and such. Lets start!

$ dig www.electronicpromo.net +noadflag

; <<>> DiG 9.10b1 <<>> www.electronicpromo.net +noadflag
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44933
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.electronicpromo.net.       IN      A

;; ANSWER SECTION:
www.electronicpromo.net. 306    IN      A       192.184.8.95

;; Query time: 15 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Mon Mar 17 22:38:51 Central European Standard Time 2014
;; MSG SIZE  rcvd: 57


By the time of writting this document, we've checked IP address to which we access electronicpromo.net domain. Based upon our research we've found that IP address with numbers 192.184.8.95 is dedicated from datacenter located in USA. Owner of this IP is Black Lotus Communications[2] company (BLCC) who provide DDoS protection. This kind of reference give us clue to ask same company for additional information of their client who need this service. In this case Black Lotus provide emergency response center telephone number but I was kind enough to contact abuse center by e-mail. Black Lotus will be forced to reveal information so we can sinkhole domain and do additional tracking of administration.

Location of IP address by map/graph:
http://i.imgur.com/6Sk3Pcm.png

 Lets keep smashing the box. While doing the vulnerability assestment on Electronicpromo, I've found out that they have "_vti_inf" file which reveals us that FrontPage is installed, and that we can check FrontPage Configuration Information. Looking up into this file, comments reveals us this:

Frontpage Version 			- 	5.0.2.4803
Frontpage SHTML Script URL 	- 	_vti_bin/shtml.exe/_vti_rpc
Frontpage Author Script URL - 	_vti_bin/_vti_aut/author.exe
Frontpage Admin Script URL 	- 	_vti_bin/_vti_adm/admin.exe


Without too much complication of process we use, here are the relative informations. Oh yes, by the way, thanks for setting file_uploads register to 1 (On)! Gived us much, much help.

$ uname -a
Linux la427.electronicpromo.net 2.6.32-358.2.1.el6.x86_64 #1 SMP Wed Mar 13 00:26:49 UTC 2013 x86_64


$ mysql --version
mysql  Ver xx.xx Distrib 5.1.73 (masked*)


$ openssl version
OpenSSL 1.0.1e-fips 11 Feb 2013


So, you are now probably interested on which way did I root the server if there were no IP availible except firewall one. Well, here is the answer: Ha! Got' ya! Magician never reveals their secret! Lets go on.

$ php -r "print getenv("DOCUMENT_ROOT")";
/home/elecpro/public_html

$ php -r "print getenv("SERVER_ADMIN")";
webmaster@electronicpromo.net

IV Outro
 I hope you found this post interesting. Post will be updated probably. If not, ask me questions on my twitter @dn5__ or email me . Please note that this post is for educational purpose only. This post is not made to show off my skills but to show respect to people who are still there to break cyber-crime. This post will be proceeded to IC3 as complain. Do not redistribute to your blog. Domains will be sinkholed ASAP.
Kind regards everyone. This is dn5!
t - @dn5__
e - <dn5@dn5.ljuska.org> 

References
[1] http://en.wikipedia.org/wiki/International_Workers%27_Day
[2] http://www.blacklotus.net/

http://i.imgur.com/vEZXwE9.jpg
