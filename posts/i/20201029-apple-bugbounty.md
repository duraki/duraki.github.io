---
title: BugBounty/ Sensitive data disclosure in Apple web-server 
date: Oct 29 2020
tags: ["apple", "bugbounty", "git", "sensitive data disclosure"]
---

## Intro

On 19. March in 2020 I was browsing Apple Swift documentation to look up for some dev knowledge as I was converting an old project from Swift to Objective-C. Later that evening I started hunting for some eggs on Apple website. Apple was always a great potential target with huge pwn scope, and I was eager to get my name on Apple website. Who doesn't like a little fame from a tech giants like Apple itself.

## Get pwnd

The vulnerability was easy-peasy to find, my in-house developed extension sent me an alarm while I was browsing the website for potential entry points to attack. The bug was an exposed .git directory on, guess where, Apple Swift doc pages. Therefore the fun started.

```
Hostname: https://docs.swift.org/
Disclosure at: https://docs.swift.org/.git/config
```

This is how the .gitconfig looked like once I visited the appropriate page above:

![Dump .gitconfig](/images/posts/applegit/dump.png)

Upon visiting the Remote Git URL, the GitHub yielded 404 (because I didn’t have access rights to the repository). This means that sourcecode of `.git` directory shouldn’t be available to attacker. An attacker might still be able to download and checkout `.git` repository from with-in local machine using ie. **GitTools**.

Thats basically what I did:

```
$ gitdumper.sh https://docs.swift.org/.git/ /tmp/docs.swift.org
$ extractor.sh  /tmp/docs.swift.org /tmp/docs.swift.org/fix_incomplete
```

![Terminals](/images/posts/applegit/gitclone.png)

The first command tries to get dump all Git commit objects into local directory, while the second command fixes incomplete downloads due to missing merges and stashing. This results in a complete download of internal tools and source code used, including environment variables that might be hidden in the project directory.

## Reporting

Obviously, I didn't touch the juicy details as to not do anything illegal; breaking hacking ethics. I did what I always do, report the issue to the front-company. I've quicly sent an email explaining the vulnerability and severity to Apple.

![Report](/images/posts/applegit/report.png)

It took Apple over 4 months to publish a fix and remedy for this issue as confirmed by the email below:

![Fixed](/images/posts/applegit/fix.png)

Alas, I finally got my name up on the big tech players: Apple and Huawei. Next time, Google? See the live version of the website here:

> https://support.apple.com/en-us/HT201536

![Finally, seeing my name on Apple website](/images/posts/applegit/fame.png)

The cybersecurity company I currently work in, **Infigo IS doo**, also wrote a great article about this disclosings, be sure to check it out [here](https://www.infigo.hr/curenje-povjerljivih-podataka-na-appleovom-web-serveru-n83).

