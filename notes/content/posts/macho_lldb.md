---
title: "lldb"
---

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

