---
title: Reversing Viber Private API
date: May 27 2020
tags: ["viber", "macos", "osx", "reverseengineering", "reverse engineering", "hacking"]
---

## 0x00 Intro

I always had a dream of building equivalent of NSA tool for spying on citizens. That idea start as long as I remember. Back in the days when I spent time blackhatting, I started writing a sort of RAT//spyware that shall include a custom module for guessing how many people are users of the household computer (PC). That was long, long time ago. The webcams just started getting tractions on the market, and whole family was using one PC in their house (Computers were expensive). The idea was roughly to count number of accounts in operating system, and then detect desktop//mouse//keyboard workflow + match some pictures if webcam was present. Unfortunetly, as I started writing and going deeper, I found out the complexity of such a tool was of a big time and I ended giving up.

So, why am I walkie-talking here? Well, my dream sort of came true when I started building `nettis` [1]. The tool is with-in my knowledge resource right now, and I've been working on it, on-off, for a few years now (4 years, since 2016) [2]. Anyway, to feed `nettis`, I used many undisclosed OSINT techniques that I figured out in those 4 years.

Last of my joy while tackling issue board on my private repo was to feed [Viber] phone number, and disclose given AccountInfo name and media (avatar). I did this so I can later dot-connect instances of media images with the one I scraped of Instagram. That way, I shall have phone number to Instagram username ratio. Seems pretty complicated but I'm on it.

## 0x01 Whats bugging

In the end, the only thing I wanted to do was to: (a) Enter the fuzzed mobile number [in Red], and get the appropriate image and account name [in Blue]. Easier said then done.

![The workflow](/images/posts/viber/doers.png)

There are few ways that I imidietly knew I should try. One of it would be to check appropriate request that is being sent through Viber application to remote servers and reuse it via my fuzzing input. The issue arise when I checked the request in my proxy.

![Sent request](/images/posts/viber/reqbase.png)

```
GET /media/user_photo?dlid=0-03-04-15150c2048bbffe831fb6c8ffa202ff7f9c622a6895d02a937b69d42acf7f5d3&fltp=jpg&rqvr=1&sdcc=387&styp=7&udid=14a076895ed15f3c2d65af49bd300c7c5ef0b286&vcpv=51&vrnt=720&xuat=e674bf666674bf66&xuav=13.0.0.75-91ee1df HTTP/1.1
Host: media.cdn.viber.com
Connection: Keep-Alive
Accept-Encoding: gzip, deflate
Accept-Language: en-US,*
User-Agent: Mozilla/5.0
```

I thought the request would contain the phone number (perhaps it does), but all I get is encrypted parameter values. In red, I highlighted the request sent when I want to message a number, while the Blue repesent the media (Avatar) response. So far so good, the request does exists on network stack. But, how do I proceed.

## 0x02 Unpractical solution(s)

Instead of throwing my brain in thinkering mode, I though about reusing what is already given to me. My first idea to ease the pain was to create Apple Script and use Apple Automator to do the heavylifting. Initially, this could be done if Viber standalone Mac application was allowing scripting via Script Editor. Throwing Viber.app into Script Editor, it yields an error, meaning my first practical solution was not possible. 

![Script Editor](/images/posts/viber/scripteditor.png)

Another solution I thought about was the one from my Game Hacking background on WinNT machines. The idea was to use equivalent of `SendKeys` [3] which simulates keystrokes to a given Window. On MacOS, the use case would be using `CGEventSourceRef//CGEventRef` and `CFRelease` to send those keys (via `ApplicationServices/ApplicationServices.h` & keys inside `HIToolbox/Events.h`. The idea was doable, but sounds to tedious and slow. Looking up further via Inspector, I found out there is some other possibilities regarding it (like sending direct events).

![Accessibility Inspector](/images/posts/viber/inspector.png)

## 0x03 The definite solution

What I ended up doing? The answer is, Ghidring. I fired up Ghidra and load `Viber.app` in it. That way I can examine what the encryption is doing, and perhaps do something similar in my queue-like environment prior to sending the request. Be aware that Viber application is HUGE, and I really mean it. It took Ghidra some time to load and analyze the whole binary. The binary is also stripped, meaning you will need to guess what is functionallity of the given method.

I started searching up in `Defined String` window for various keywords that will bring me closer to the account info request. It wasn't too long before I found an API route String with two Cross Reference.

![String available](/images/posts/viber/refapi.png)




[1] https://github.com/nettishq/nettis
[2] https://duraki.github.io/posts/o/20171211-nettis-what-is-it.html
[3] https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/sendkeys-statement