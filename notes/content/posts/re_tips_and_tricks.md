---
title: "Reverse Engineering Tricks and Tips"
---

* Find threads by patching a jump with a short jump (EB FE) to create an endless loop you can then search for
* Looking for "CO A8" to find local IP addr prefix (192.168)
* Looking for 4-byte Unix timestamps in hex in a file format or a network packet
* Search/google all application constant values, classes and libraries
* Resize Hex Editor window to identify unknown structures and its sizes
* Check application Log messages and Xref them
* Replace all `https` calls with `http` (instead of hooking on each TLS thread and decrypting SSL)
* Using LD_PRELOAD to disable specific functions or patching binaries on the fly
* Use Burp + `mitm_relay` to proxy traffic
* Decompile JAR and attack via Frida, [Byteman](/byteman) or any other dynamic instrumentation toolkit
* Use dotPeek to identify and process attack surface for anything .NET based
