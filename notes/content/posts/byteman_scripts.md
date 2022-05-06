---
title: "Byteman Scripts"
---

**Simple trace skeleton**

```
RULE trace
CLASS ^App
METHOD login
AT ENTRY
IF true
DO System.out.println(" Tracing login stdout")
DO traceln("Tracing login ended")
ENDRULE
```

**Trace application entry**

```
RULE trace application entry
CLASS ^App
METHOD main
AT ENTRY
IF TRUE
DO traceln("BMB java.application.main() called!")
ENDRULE
```

**Trace application exit**

```
RULE trace application exit
CLASS ^App
METHOD main
AT EXIT
IF TRUE
DO traceln("BMB java.application exited")
ENDRULE
```

**Thread start**

```
RULE trace thread start
CLASS java.lang.Thread
METHOD start()
IF true
DO traceln("*** BMB start for thread: " + $0.getName())
ENDRULE
```

**Trace application login**

```
RULE trace application login
CLASS ^LoginApi
METHOD login
AT ENTRY
IF TRUE
DO traceln("BMB java.application.login() called!")
ENDRULE
```

**Trace class create entry**

```
RULE ClassLoadMonitor trace create
CLASS java.lang.ClassLoader
METHOD defineClass(String, byte[], int, int, ProtectionDomain)
AT EXIT
IF TRUE
DO traceStack("*** BMB Called defineClass(" + $1 + ") in thread " + Thread.currentThread().getName() + "\n", 10)
ENDRULE
```

**Early return**

```
RULE bypass license expiration
CLASS ^App
METHOD checkForSecurity
AT ENTRY
DO debug("returning earlz with bool");
    return true
ENDRULE
```

**Set default TimeZone**

```
 RULE check setDefault
 CLASS java.util.TimeZone
 METHOD setDefault(TimeZone)
 AT ENTRY
 IF TRUE
 DO traceStack("XXX attempting to get change the default timezone "+ ": parameter : " +$1 + " : detail : " + $1.getDisplayName())
 ENDRULE
```


