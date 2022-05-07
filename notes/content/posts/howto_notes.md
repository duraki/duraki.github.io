---
title: "How to write Notes"
---

### TL;DR

* Use Markdown for everything
* Use shortcodes
* Clear and consistent
* Integrate well with `art` CLI

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


