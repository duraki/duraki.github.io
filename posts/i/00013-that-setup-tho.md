---
title: Dev/ Automated & Productive environment
date: Jul 11 2017
tags: ["development", "environment", "automation"]
---

## Opinions

Last year and a bit current, I've spent engineering various `devops/deployment`  and `backend` service that powers a large betting platform. 

Every so often, I found myself going through a single repetitive task, number of times, before I finally settle things down and find a way to automate it.

Without going much in details, this post should show you how I deal with that stuff, whether working on an open-source, or a work-related project.

Please note that this setup is not suitable for all and every of you out there. Although this should definitely introduce you to some proper automated solutions that the usage should be appreciated.

## Toolset

I've heard this not once, that some find themself overwhelmed with a number of tools in use, through every, day-to-day life. This is normal and for a difference, I enjoy it.

Having a large number of available tools is great, since multiple source of the same problem-solving solution creates a cheaper market and breaks the tale of  monopoly. 

Although above is true, we still have *things* for life. These are the utilities we are used to. We know every inch of them, and they feel like a home.

So, here is a list, of my personal source of home-feeling tools:

*  Vim 
*  iTerm/Tmux
*  [OhMy] / Zsh
*  Git / Devist

>  Cliche feels.

Nevertless, this was a topic about automation on dev environment, so I'll try to head it in that way from now on.

### Vim

Ah, the father of text editors. Although just a few selected youngers use Vim in the company I work for, I love to hear colleagues, rearly, asking me questions about it.

It's enormous configuration settings and keymapping allowed me to automate it in various tasks, either while developing or writing devdocs.  

I'll offer just a bit of my `.vimrc` file. I don't like open-sourcing my dotfiles, especially `vimrc` which I think [every] should be written by the developer who use it, himself. 

Here is just a part of my configuration that automates Vim.

```
nmap <leader>t2 :set expandtab tabstop=2 shiftwidth=2 softtabstop=2<CR>
nmap <leader>t4 :set expandtab tabstop=4 shiftwidth=4 softtabstop=4<CR>
nmap <leader>t6 :set expandtab tabstop=6 shiftwidth=6 softtabstop=6<CR>
nmap <leader>t8 :set expandtab tabstop=8 shiftwidth=8 softtabstop=8<CR>
```

Why choosing especially these few lines from my 500-something long `vimrc` file? 

I'm working in several languages, switching between Ruby, C and PHP. These maps above help me switch between proper code indentation with a three keys, one of which we should not count here - my lead key. 

Simply, pressing `t2` gets me ready for a Ruby, or as such, typing `t4` switch me in PHP *ninja* mode.

This is something I found my self typing a lot in the past when I started working in different languages. As of course, it gets boring awhile after, one should find a help that usually comes in different size and shape. Therefore, some plugin it, and other native it. 

Although many use various Vim plugins, I usually try to keep it as simple as possible. That is — no stuff that I don't really need or rarely use.

### iTerm

The finest combination with Tmux. The Yin & Yang of developers heaven. 

**iTerm** is a very known terminal emulator. My configuration is pretty straight forward. I look for minimal window with nothing more then a typing space.

A picture of the my terminal:

![minimal_iterm_view](http://i.imgur.com/VzktTpk.png)I'm pretty aware of text color being a bit darker and blending with the black background, but my eye sight is currently *ok* , and I have no problem reading it. 

Here is a split pane. 

![minimal_split_pane_iterm](http://i.imgur.com/WEjBmkp.png)

So, where is the automation here, one might ask. My iTerm is automated in various tasks, depending on the situation I'm currently in. One of my favourite is presented below.

For an example, as a heavily **git** user, I try to follow proper changelog tags even while commiting the message. That means that every log show excatly what I did in a particular commit.

![gitlog_sendkeys_iterm](http://i.imgur.com/btPLp4X.png)

Thankfully, with iTerm, I've only added these kepmaps to  `Keys` in Preferences. These lines were added to support tagging commit message.

| KEYCOMBO | Action | Text        |      |      |      |
| -------- | ------ | ----------- | ---- | ---- | ---- |
| `⇧⌘A`    | Send   | `[added]`   |      |      |      |
| `⇧⌘F`    | Send   | `[fixed]`   |      |      |      |
| `⇧⌘R`    | Send   | `[removed]` |      |      |      |

Now, with every commit, just press the key combination and you'll have a tag automatically added.

```sh
- repo (dev) $ git commit -m "[press_combo] message"
> [added] my feature here
```

Enjoy beautiful gitlog. This configuration is available through tmux, so let's hop into it.

### Tmux

As of **tmux**, I personally only automated various server/worker environments that fire up in multiple panes and execute particular commands. 

For this, I'm using [tmuxinator](https://github.com/tmuxinator/tmuxinator) which is one of my favourite Gem out there. It is fast, and it support various features that one can extend in ways and combinations.

This tool is beautiful, and I'm soon starting to send pull requests. It's a joy once you get used to it. I usually setup the configuration file per-project basis. An example of such a project is presented below (edited alias for presentation purpose).

```yaml
$ cat $HOME/.tmuxinator/gradapp.yml
~/.tmuxinator/gradapp.yml

name: gradapp
root: ~/dev/gradba-web

windows:
  - app:
      layout: even-vertical
      panes:
          - vim .
      layout: even-horizontal
      panes:
          - php artisan
          - tail -f ./storage/logs/dev.log
  - db:
      layout: even-vertical
      panes:
          - sqlite3 /dev/db/grad.sqlite
          - mysql
          - tail -f ./storage/logs/db.log
          - tail -f ./storage/logs/slowlog.sym.log
  - logs:
      layout: even-horizontal
      panes:
          - tail -f ./storage/logs/dev.log
          - tail -f ./storage/logs/router.log
          - tail -f ./storage/logs/commands.log
```
Whenever I get ready to work on this application:

```sh
# alias mux=tmuxinator $1
$ mux gradapp
```

> Above environment is for a startup called "Grad" (eng. *City*) - https://grad.ba. It's an iOS / Android mobile application that will help you enjoy small country in Europe ([Bosnia and Herzegovina](https://en.m.wikipedia.org/wiki/Bosnia_and_Herzegovina)). Shot out to my team out there, thank you for doing this.

This is how the environment looks like while in devmode. 

![tmuxinator_env_setup](http://i.imgur.com/YpPsTFQ.png)

A good example of using **tmux** is via pane sync. For example, my `.tmux.conf` is binded to `s` key to start pane synchronization.

```sh
$ cat $HOME/.tmux.conf
...
bind s set-window-option synchronize-panes
```

Now imagine you want to log two different files or open two different projects in **tmux** panes (pseudo usage below). 

```
$ tmux
> prefix+" 		# splits panes
> prefix+s 		# start sync
$ tailf /var/log/		# synced to both panes
pane#1 $ /var/log/this.log
pane#2 $ /var/log/that.log
> prefix+s		# stop sync
```

### [OhMy] / Zsh

[This framework](https://github.com/robbyrussell/oh-my-zsh) is something special for [that shell](http://www.zsh.org/).   I try to keep my `.zshrc` file clean but that ain't working lately. I'm putting various stuff that I should try to seperate. Nevertheless, I had to point it in this post.

Some of my favourite aliases and functions are below. Others are kept for a nostalgic feeling or muscle memory, but I'm pretty sure these greatly helped me with production.

```sh
# smh, I had to put this here
alias :q='exit'

# I'm working in Laravel/Symfony quite alot
alias art='php artisan' # laravel framework cliapp
alias sym='bin/console' # symfony framework cliapp

# This + `mux` alias for tmuxinator are great combo 
alias muxreload=tmux source-file ~/.tmux.conf # reload config

# Since Google Chrome now offer headless feature, 
# enjoy this alias to export any URL/Website to PDF
function urlpdf {
    chrome --headless --disable-gpu --print-to-pdf $1
}
```

I also have several aliases that points or `cd` to a particular directory, one of them directly entering my external SSD volume, which I use every day.

### Git / Devist

This is another paragraph where I will include another tool of mine called [Devist](https://github.com/stacklog/devist).

Most of us already know what Git is, but rarely what `Devist` is. It's a **Ruby gem** that **generates beautiful release notes** for your projects. I rewrote it from it's original source [Vicilog](https://github.com/duraki/vicilog). It offer various usage integration and my favoruite one is Git.

Imagine you are pushing a new release, of course, you want to edit your CHANGELOG.md file. But who cares about it? Even I forget about bumping my version and changes. Therefore, I've developed a `git hook` that is bundled with Devist.

It checks if the given tag is being added to CHANGELOG before pusing on remote. The whole script is available at [hook.sh](https://github.com/stacklog/devist/blob/dev/hook.sh) file which you add to `.git/hooks/` in your (repo). Basically, it strips down your markdown file and check for correct version. If the version is missing, Devist will exit and you won't be able to push a tag without either:

1. Add the version you are pushing to *logfile* (e.g. `changelog.md`) 
2. Use `—no-verify` to skip git hooks. 

This not only does it automate the check of release, but it also offer a layer of security.

```sh
$ (repo) git tag v1.0.0
$ (repo) git push origin v1.0.0

Devist / tag/hook / pre-push - https://devist.io
> Pre-push hook activated.
> Tag detected.
> Checking for file CHANGELOG.md in this directory ...
Checking tag version ...
Stripping non-numeric characters ...
Detected tag: 1.0.0
Checking latest TAG in changelog file ...
Tag not found in CHANGELOG.md ; please bump your version.
Use --no-verify while to skip this git-hook.
Exit.
```

You may check a [Devist changelog](http://devist.io/changelog.html) and see exported example. You can read more about Devist - http://devist.io .

## Attention

This is only a small part of my automated integration. Do not automate tasks that you think are not worth it. Automate tasks once you find yourself thinking:

> Oh God, I did this thousend times ...

I hope this post helped you solve some of the boring tasks you've been doing in the past. I'd also like to hear your input so be free to message me on [Twitter](https://twitter.com/devil_tux). 

If some of you know some neat tricks, please let me, I may have the same problem and you may become one great dude in my eyes. I'll send out some proper credits. :)

Thank you for reading, until sometimes ...

![Stranger Things](http://i.imgur.com/N4e4ktx.jpg)

Stranger Things is nice time killer. Original author on [DeviantArt](http://rider-tart.deviantart.com/art/Stranger-Things-622490916).