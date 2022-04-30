---
title: "How to write Notes"
---

### TL;DR

* Use Markdown for everything. Site generator reuses it as well.
* Use shortcodes
* Clear and consistent

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
{{ < gist duraki 78985452 "filename.go" > }}
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
