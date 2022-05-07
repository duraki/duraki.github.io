---
title: "Frida Gadget Injection"
---

This is quick description on how to inject Frida gadget into Smali directly without much overhead. Start by installing [Frida and Objection](./frida-objection-tutorial#android-tutorial) and then continuing from here.

First [decompile the APK](./android-recompilation) and check the **AndroidManifest.xml** file.

```
$ more AndroidManifest.xml

<application ...>
<activity android:name="xxx.activity.SplashActivity" android:noHistory="true" android:screenOrientation="portrait">
...
```

Write down the Activity name (such is `SplashActivity`). Must be somewhere on early start-up of application lifecycle. Open up the Activity in decompiled Smali object, and change the `public constructor <init>(V)` to include frida-gadget. 

```
$ vim xxx.activity.SplashActivity

.class public Lcom/xxx/activity/SplashActivity;
.source "SourceFile"

# direct methods
.method public constructor <init>()V
    .locals 0

    .line 8
    invoke-direct {p0}, Lcom/halcom/mobile/hybrid/activity/SplashActivity;-><init>()V

    # => injection point
    const-string v0, "frida-gadget"
    invoke-static {v0}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V

    return-void
.end method
```

Remember to inject this code in all of your `public constructor <init>()V` in Splash* activities. Move the application to your device and start it. Application has to handle `libfrida-gadget.so` correctly and load it at runtime. In Frida, it's enought to type `%resume` in Frida REPL to continue execution after the injection.
