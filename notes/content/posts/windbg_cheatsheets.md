---
title: "WinDbg Cheatsheets"
---

Just personal things related to my frustration with WinDbg (:

The symbol search path tells WinDbg where to look for symbol (PDB) files. The debugger needs symbol files to obtain information about code modules (function names, variable names, and the like).

```
.sympath srv*
Symbol search path is: srv*
Expanded Symbol search path is: cache*;SRV
```

To see the symbols for the Notepad.exe module, enter this command:

```
x notepad:!
```

Note, if ytou don7t see any output, enter `.reload` again:

```
x notepad!*main*
# => 000000d0`428ff7e8 00007ff6`3282122f notepad!WinMain
```

To put a breakpoint at notepad!WinMain, enter this command:

```
bu notepad!WinMain
```

To verify that your breakpoint was set, enter this command:

```
bl
# => 00007ff6`32825f64     0001 (0001)  0:**** notepad!WinMain
```

Start the process:

```
g

# => ...
# Breakpoint 0 hit
# notepad!WinMain:
# 00007ff6`32825f64 488bc4          mov     rax,rsp
```

To see a list of code modules that are loaded in the Notepad process, enter this command:

```
lm

# => ...
# 0:000> lm
# start             end                 module name
# 00007ff6`32820000 00007ff6`3285a000   notepad    (pdb symbols)          C:\...\notepad.pdb
# 00007ffc`ab7e0000 00007ffc`ab85b000   WINSPOOL   (deferred)             
...
```

To see a stack trace, enter this command:

```
k

# => ...
# Child-SP          RetAddr           Call Site
# 00000048`4e0cf6a8 00007ff6`3282122f notepad!WinMain
# 00000048`4e0cf6b0 00007ffc`b1cf16ad notepad!WinMainCRTStartup+0x1a7
# 00000048`4e0cf770 00007ffc`b1fc4629 KERNEL32!BaseThreadInitThunk+0xd
# 00000048`4e0cf7a0 00000000`00000000 ntdll!RtlUserThreadStart+0x1d ...
```

To break in the Notepad, choose **Break** from the **Debug Menu**.

```
Debug Menu -> Break
```

To set and verify a breakpoint at ZwWriteFile, enter these commands:

```
bu ntdll!ZwWriteFile
bl
```

To see a list of all threads in Notepapd process, enter this command (tilde):

```
~

# => 
# 0:011> ~
#    0  Id: 10c8.128c Suspend: 1 Teb: 00007ff6`31cdd000 Unfrozen
```

To look at the stack trace for thread 0, enter these commands:

```
~0s
k

# =>
0:011> ~0s
USER32!SystemParametersInfoW:
00007ffc`b12a4d20 48895c2408      mov     qword ptr [rsp+8], ...
0:000> k
Child-SP          RetAddr           Call Site
00000033`d1e9da48 00007ffc`adfb227d USER32!SystemParametersInfoW
(Inline Function) --------`-------- uxtheme!IsHighContrastMode+0x1d
00000033`d1e9da50 00007ffc`adfb2f12 uxtheme!IsThemeActive+0x4d
...
00000033`d1e9f810 00007ffc`b1cf16ad notepad!WinMainCRTStartup+0x1a7
00000033`d1e9f8d0 00007ffc`b1fc4629 KERNEL32!BaseThreadInitThunk+0xd
00000033`d1e9f900 00000000`00000000 ntdll!RtlUserThreadStart+0x1d
```

To quit and detach from process:

```
qd
```
