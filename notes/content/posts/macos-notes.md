---
title: "MacOS Notes"
---

**Check Application entitlement**

```
# ~> brew install jtool

# => no visible entitlemens
$ jtool --ent /Applications/MachOView.app
/Applications/MachOView.app/Contents/MacOS//MachOView apparently does not contain any entitlements

# => with visible entitlements
$ jtool --ent /Applications/ProtonVPN.app
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.application-identifier</key>
	<string>J6S6Q257EK.ch.protonvpn.mac</string>
	<key>com.apple.developer.maps</key>
	<true/>
...
```
**libSystem.B.dylib**

All API rely on above library. For example, when the MachO Process starts, the above library will be loaded early in time so it can use other APIs.
