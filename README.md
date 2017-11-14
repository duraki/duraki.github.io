duraki/blog/deviltux
======================

This repository contains the static site generator, a `deviltux` theme, and a 
space for writing blogposts for my blog located [here](https://duraki.github.io). 
The script is built in Ruby, called `Art`, with a few dependencies, and the blog is developed 
as a project or a library, consisting of `changelog` details, and various other 
configuration files. The script, posts and theme is bundled with the repository for the ease of use.
  
On every publish, a new release should be made, including the details from the 
changelog for that particular version. This is not mandatory but affects the repository 
usage.
  
![Blog image](http://i.imgur.com/LGbjIiZ.png)

## Table of content

- [Installation](#installation)
- [Theme](#themes)
- [Configuration](#configuration)
- [Write](#write)
- [Build](#build)
- [License](#license)

## Installation 

### Basic 

If you want to install and use `deviltux` theme and `Art` script, the only thing you have to do is clone this repository and install builder dependencies. The only requirements is Ruby (+ `gem`).

```
$ git clone git@github.com:duraki/duraki.github.io.git
Cloning into 'duraki.github.io'...
...

$ ruby -v && gem -v
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-darwin16]
gem 2.6.12

$ gem install front_matter_parser
$ gem install colorize

$ npm -g install markdown-styles 
```

Of course, this will also build my blog, and my posts, so to start fresh, I'd rather advice you to clone only raw `Art` script and clone `tuxtheme` manually and continue with the reading of this file.

```
$ mkdir blog && cd blog/
$ wget https://raw.githubusercontent.com/duraki/duraki.github.io/master/art
...

$ git clone git@github.com:duraki/tuxtheme.git
...
```

## Themes 

### deviltux 

This repository is equiped with a submodule `tuxtheme` which is available [here](https://github.com/duraki/tuxtheme) and which one may use for their own blog.
To create your own theme, clone or fork the `tuxtheme` and make changes locally. You will also need an `layout/index.erb` file which is your homepage/index file. This file is not bundled with your theme but is located in main repository. Use Ruby `erb` binding to create own layout. Check out `index.erb` file of this repository.

```
$ cd blog/
$ mkdir layout/ && touch layout/index.erb
```

## Configuration 

Once you are ready to configure own blog, you can either copy `.home.yml` file from this repository or `touch .home.yml` and enter the details manually. 
Below is an example of configuration file which defines all necessary properties.

```
--- 
minimal: 
  artists: "Joe Doe" # your name
  title: "eatinjoe blog" # blog title
  description: "Soup is free. Eat in Joe." # blog description / meta
posts: 
  in: /posts/i # Directory for *md files (written blog posts)
  out: /posts/o # Directory for *html files (the script output)
scripts: 
  # Here you can define scripts / gists you wrote
  # Format is: "[title]:[script.path]"
  - "My script for ultron:/scripts/google_ultron.c"
art:
  ga: true # enable google analytics
```

Afterwards, just save the file to your repository and push it to the `git`. The `./art` script takes parameter from this file and creates a standalone static blog.
In case you want **gA** (Google Analytics), make sure to update the `ga.js` file located in [tuxtheme/assets/js/ga.js](https://github.com/duraki/tuxtheme/blob/master/assets/js/ga.js) or create the file in your own in exact directort: `assets/js/ga.js`.

## Write

So you are ready to write some new blog post and publish it? It's simple, create a new markdown datafile in `/posts/i` or whatever you defined for **posts/in** in your `.home.yml` configuration.

```
$ touch ./posts/i/1111-my-slug-here.md
$ echo "## Art" >> ./posts/i/1111-my-slug-here.md
```

* Please, make sure to follow the format for creating new post.  
* The exact filename will be used for a URL (slug-name) except `*md` will be converted to `*html`.  
* The higher the first numbers, the higher the priority post get. 
    - Post with slug `1111-slug-name.md` will have priority over `850-slug-name.md`.
    - Depending on your `layout/index.erb` file, the post `1111-slug-name.md` will be shown first in the list. 
  
The expected format for new post is: `[priority]-[slug-_name-_here].md`.  
  
Example:  
  
    - `1000-awesome-blog-post-slug.md`
    - `12000-this-is-another-post.md`
  
It's also good to note that files are *front matter* based, which means they offer various know-alike. This is useful for SEO and various extensions that can be made while creating layouts and themes. Example of post front matter inside the `*md` file.

```
---
title: Category/ Some post title
date: Dec 22 2017
tags: ["some", "tag", "here"]
---
```

Once these files are created, `Art` script will build the input / markdown post to output directory, with the given theme.

## Build 
And the final magic, which is to output your generated blog from the given layout.  
This is the easiest part, and if you did everything correctly, only thing is to generate the blog.  
Just use `./art` command and the script will build the project / blog which you can then upload remotely on for e.g. on GitHub or GitLab static pages.

```
./art
Welcome to Art.
Art is a standalone Ruby static blog generator.
---------
[+] Loading `.home.yml` from this directory ...
[+] File loaded.
---------
[+] Creating build configuration ...
[+] Reading `layout/index.erb` file ...
[+] Index layout loaded.
[+] Creating accessors from YAML file ...
---------
[+] Detecting who you are ...
[+] Detecting blog title ...
[+] Detecting blog description ...
[+] Detecting input directory ...
[+] Detecting output directory ...
[+] Building script list ...
[+] Detecting Google Analytics ...
[x] Accessors built.
---------
[+] Exporting markdown to HTML ...
[+] Building metadata & posts ...
[+] Building scripts ...
[+] All systems ready ...
---------
[+] Binding results ...
[x] All done.
```

![Art](http://i.imgur.com/BHTTkV4.png)

## License

The MIT License (MIT)

Copyright (c) 2017 Halis Duraki and contributors

See [LICENSE](LICENSE) for details.

