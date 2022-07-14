---
title: "lldb"
---

## Cheatsheet

### Objective-C

**Important** -- set a lldb language context to Objective-C:

```
(lldb) settings set target.language objc 
```

Cast an address to object:

```
(lldb) po ((MKPinAnnotationView *)0x7df67c50).alpha
```
...

### Swift

**Important** -- set a lldb language context to Swift:

```
(lldb) settings set target.language swift
```

Import a Library in the lldb context:

```
# => Library
expr -l Swift -- import UIKit

# => Custom Classes
expr -l Swift -- import MyTestProject
expr -l Swift --  let $vc = unsafeBitCast(0x7fad22c066d0, ViewController.self)
expr -l Swift -- print($vc.view)
```

Create a new class from lldb:

```
expression let $myHello = HelloClass()
po $myHello
```

Call a method from a class:

```
po $myHello.hello()
```

Get an object address of current instance:

```
(lldb) p tabView.controlTint
(NSControlTint) $R10 = defaultControlTint

(lldb) p self
(LearningStoryboard.NSTabViewController) $R11 = 0x00006080000e2280 {

# => then cast this address to x object. @see below.
```

Cast an address to object:

```
(lldb) e let $pin = unsafeBitCast(0x7df67c50, MKPinAnnotationView.self)
(lldb) po $pin

# => then you can work with $pin as usual – access properties, call methods, etc.
```

### Multiplatform (ObjC + Swift)

If you want to run an lldb expression depending on the scope, use:

```
expression -l objc -o -- HelloClass* class = [[HelloClass alloc] init]      # => obj-c
expression -l swift -o -- let $myHello = HelloClass()                       # => swift
```

## `lldb` Errors and Workarounds

### Attach Failed

Not allowed to attach to process:

```
(lldb) process attach --pid 76371  (# => or by Name)

error: attach failed: attach failed (Not allowed to attach to process.  Look in the console messages (Console.app), near the debugserver entries, when the attach failed.  The subsystem that denied the attach permission will likely have logged an informative message about why it was denied.)
```

**Solution:**

```
$ cat /tmp/debug_entitlements.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>com.apple.security-get-task-allow</key>
        <true/>
        <key>com.apple.security.cs.disable-library-validation</key>
        <true/>
        <key>com.apple.security.device.audio-input</key>
        <true/>
</dict>
</plist>

$ codesign --force --options runtime --sign - --entitlements /tmp/debug_entitlements.plist /Apps/MyApp.app
```

### Terminated due to code signing error

Happens when codesign is not put in place. Need to codesign a Macho binary:

```
(lldb) process attach --pid 76371  (# => or by Name)

Process 8873 exited with status = 9 (0x00000009) Terminated due to code signing error
```

**Solution:**

```
# => Create a new Code Signing certificate in Keychain Access, then ...

$ codesign --deep --force -s "signature" /Apps/MyApp.app
```

