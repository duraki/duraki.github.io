---
title: "Android Recompilation"
---

Decompile Android APK file using `apktool`:

```
# => decompile
$ apktool -r d AppName.apk -o AppName

# => recompile
$ apktool b AppName
```

Resign the APK package and install the Android application:

```
# => sign the apk package
$ keytool -genkey -keystore example.keystore -validity 10000 -alias example
$ jarsigner -keystore example.keystore -verbose AppName.apk example

# => installation
$ apk install AppName.apk
```

