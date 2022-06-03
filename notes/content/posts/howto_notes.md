---
title: "How to write Notes"
---

### TL;DR

* Use Markdown for everything
* Use shortcodes
* Clear and consistent
* Integrate well with `art` CLI

### Markdown

**Styled Blocks**

```
::: alert red
This is a **Red Alert!** Take cover.
:::
```

::: alert red
This is a **Red Alert!** Take cover.
:::

**Media Insertion**

Use quotes markdown block:

```
> https://vimeo.com/1234567
```

**FontAwesome Icons**

Use `FontAwesome` [Icon Library]():

```
# => in markdown (md)
## Some of my photos :fa-camera-retro:
```

**Highlight Lines**

[List of supported languages](https://gohugo.io/content-management/syntax-highlighting#list-of-chroma-highlighting-languages)

```
# => xml
{{ < highlight xml "linenos=table, linenostart=11, hl_lines=1 3"> }}
<category blog="posts">
    <label xml:lang="en" text="Article" />
</category>
{{ < /highlight > }}

# => go
{{ < highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" > }}
// ... code
{{ < / highlight > }}

# => go - specific lines
go { linenos=table,hl_lines=[8,"15-17"],linenostart=199 }
// ... code
```

**Reference a link**

```
{{ < ref /blog > }}
```

### Shortcodes

**Caption images via this shortcode**

```
<span class="caption-wrapper">
  <img class="caption" src="/images/2016/thetheme/1.png" title="Sample caption" alt="Sample caption">
  <span class="caption-text">Sample caption</span>
</span>
```

```
{{ < imgcap title="Sample caption" src="/images/2016/thetheme/1.png" > }}
```

**Insert Gist via this line**

```
{{ < gist duraki 78985452 > }}
```

**Include Instagram image in the note**

```
# => https://www.instagram.com/p/BWNjjyYFxVx/

# => Normal Instagram view
{{ < instagram BWNjjyYFxVx > }}

# => Hide caption
{{ < instagram BWNjjyYFxVx hidecaption > }}
```

**Include Tweet in the note**

```
# => https://twitter.com/SanDiegoZoo/status/1453110110599868418

{{ < tweet user="SanDiegoZoo" id="1453110110599868418" > }}
```

**Hide something**

{{ < details > }}
This website is provided for free educational purposes. Knowledge shared here can be used for personal gain and experience.
{{ < /details > }}

[More shortcodes](https://gohugo.io/content-management/shortcodes/) on official website.

### Deploy

**To deploy localy, use any server and a generator**

```
# => build
$ ruby art notes local # => for local environment
$ ruby art notes hybrid # => for prod environment

# => serve
$ php -S 127.0.0.1:8800 # => in $REPO_ROOT directory
```


