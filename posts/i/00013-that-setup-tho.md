---
title: Toward to automated developers environment 
date: Jul 11 2017
tags: ["development", "environment", "automation"]
---

## Opinions

Last year and a bit, I've spent engineering various `devops/deployment`  and `backend` service that powers a large betting platform, at current company called `Nsoft`.

Every so often, I find myself going through a single repetitive task number of times before I finally settle things down and find a way to automate it.

With that said,  I'd also like to interest you in my approach to solving a problem through engineering and thinkering. Without going much in details, this blog should present you with a stuff that I, as an engineer regurarly use to develop new stuff, wether these are open-source, or a work-related project.

Please note that this setup, wether you like it or not, is not suitable for all and every programmer out there, but should definitely introduce you to some proper automated solutions that the usage should be appreciated.

## Toolset

I've heard this not once, that some often find themself overwhelmed with a number of tools in use, through every, day-to-day life. This is normal and in a difference, we should sometimes think about it and appreciate the point of it.

Having a large number of available tools is great, since multiple source of the same problem-solving solution creates a cheaper market and breaks the tale of  monopoly. 

This above, of course, does not mean that there aren't the *things* that we use regurarly, either through lifetime, or for the past few months, or years. These are the utilities we are used to. We know every inch of them, and they feel like a home.

So, here is a list, of my personal source of home-feeling tools:

*  Vim 
* iTerm/Tmux
* Git

>  Giving me in hand these tools (with a necessary equipment), and I assure you everything is possible.

Nevertless, this was a topic about automation the developers setup, so I'll try to head it in that way from now on.

## Vim

Ah, the father of text editors. Although just a few selected youngers use Vim in the company I work for, I love to hear colleagues, rearly, asking me questions about it.

It's enormous configuration settings and keymapping allowed me to automate it in various tasks, either while developing or writing devdocs.  

Here, I'll explain just a bit of my `.vimrc` file and the stuff it offers me. I don't like open-sourcing my dotfiles, especially `vimrc` which I think [every] should be written by the developer who use it, himself. Here is just a part of my configuration that automates a few things.

```
nmap <leader>t2 :set expandtab tabstop=2 shiftwidth=2 softtabstop=2<CR>
nmap <leader>t4 :set expandtab tabstop=4 shiftwidth=4 softtabstop=4<CR>
nmap <leader>t6 :set expandtab tabstop=6 shiftwidth=6 softtabstop=6<CR>
nmap <leader>t8 :set expandtab tabstop=8 shiftwidth=8 softtabstop=8<CR>
```

Why choosing especially these few lines from my 500-something long `vimrc` file? 

I'm working in several languages, switching between Ruby, C and PHP. These maps above help me switch between proper code indentation with a three keys, one of which we should not count here - my lead key. 

Simply, pressing `t2` gets me ready for a Ruby, or as such, typing `t4` switch me in PHP *ninja* mode.

This is something I found my self typing a lot in the past when I started working in different languages.







