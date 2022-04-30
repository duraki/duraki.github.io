---
title: "iOS Static Analysis"
---

- Find all JSON and Plist files in app bundle and see if there are any disclosures
- `NSAllowsArbitraryLoads` - Disables App Transport Security (ATS), allowing weak TLS configs
- `CFBundleURLTypes` - Custom Scheme URLs that can be exploited further (see [this](https://github.com/ivRodriguezCA/RE-iOS-Apps/tree/master/Module-4#url-scheme-injection))
- `AFNetworking 2.5.1` - Version and below are vulnerable to MITM if there was no SSL pinning applied

