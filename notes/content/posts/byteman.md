---
title: "Byteman"
---

### Introduction

Byteman is a bytecode manipulation tool for tweaking and changing Java
application at load time and runtime. It work without the needs for
recompilation. The modification is purely in memory, via Event Condition Action
rule language - based on Java.

### Rules

Write ECA based rules which you can inject using Byteman directives and command
line application.

```
# => trace.btm
RULE trace main entry
CLASS ^CognitiveApp
METHOD main
AT ENTRY
IF TRUE
DO traceln("Byteman: Application loaded successfully. java.application.main() called.")
ENDRULE
```

Replace the CognitiveApp with any class handling the Main application login. Use JD-GUI to find for `main()` functions. It's important to leave `^` char because it indicates the regex pattern.

### Registers

The following registers exists:

* RULE, CLASS, METHOD (Description, Classname, Method Name)
* AT ENTRY, AT EXIT
* IF TRUE (Run always)
* DO (Execute command)
* ENDRULE (Script end)

### Running

* Run the Java application either via Command Line or from the `*.shortcut`
* Add `%JAVABYTE_HOME%` environment in Windows/Linux (ie. `setx` on Windows, or `export` on Linux)
* Create a RULE
* Use `bminstall.bat $PID` to inject Byteman in the JVM runtime
* Use `bmsubmit.bat ..\scripts\trace.btm` to register Byteman script
* Watch application stdout log output and search for `traceln` tagged calls

```
# => WinNT injection example

> cd byteman/bin
> bminstall.bat $PID
> bmsubmit.bat ..\scripts\trace.btm
Cannot locate byteman JBoss modules plugin jar
redefine rule trace main entry
```


