---
title: "Cycript"
---

**Tips and Tricks**

Get pasteboard/clipboard items.

```
[UIPasteboard generalPasteboard].items
```

Get UI elements dump.

```
[[UIApp keyWindow] recursiveDescription]
```
**Bypass Jailbreak UIAlertController via Cycript**

```
function bypassJailbreakDetection() {
	try {
		var hook = ObjC.classes.Utils['+ isJailbroken'];
		Interceptor.attach(hook.implementation, {
	    	onLeave: function(oldValue) {
	    		_newValue = ptr("0x0") ;
	    		oldValue.replace(_newValue);
	    	}
	    });

	} catch(err) {
		console.log("[-] Error: " + err.message);
	}
}
```

... from [Dynamic Analysis and Hacking](https://github.com/ivRodriguezCA/RE-iOS-Apps/blob/master/Module-4/README.md).

**Syslog Macros**

```
# => common.cy
@import com.saurik.substrate.MS
NSLog_ = dlsym(RTLD_DEFAULT, "NSLog")
NSLog = function() { var types = 'v', args = [], count = arguments.length; for (var i = 0; i != count; ++i) { types += '@'; args.push(arguments[i]); } new Functor(NSLog_, types).apply(null, args); }
```

Load the macro into Cycript: 

```
$ cycript -p App common.cy
$ cycript -p App
```

Read syslog for log lines:

```
socat - UNIX-CONNECT:/var/run/lockdown/syslog.sock
watch
```


