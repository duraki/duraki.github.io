---
title: "Blog Setup"
---

The blog is using a custom site generator called [art](https://github.com/duraki/duraki.github.io/blob/master/art) and it uses Ruby and some wrapper magic to generate this from a rather minimal configuration setup in `.home.yml` file.

```
--- 
minimal: 
  artist: "Your Name"
  title: "Blog Title"
  description: "Blog description."
  theme: "theme-name"
  
posts: 
  in: /posts/in   # => post in (md)
  out: /posts/out # => post out (html)
  
scripts: 
  - "my super href:/about/me.html" # => Links/URIs/Other
  
art:
  ga: UA-00000000-X # => your Google Analytics
```
