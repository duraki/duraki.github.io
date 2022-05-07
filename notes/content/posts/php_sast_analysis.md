---
title: "PHP Source Code Analysis"
---

When looking at PHP applications and source code analysis process, one of the first things I grep and search for are for functions accepting **$USER** input with the potential to execute an external program or malform the input in some form or action:

**Use this grep command**

```
$ grep -nR "exec(" ./phpBB/ --include \*.*php* | more`
```

**Important Function**

```
assert()
create_function()
eval()
exec()
Execution Operators (``)
include()
include_once()
passthru()
pcntl_exec()
popen()
preg_replace() (with `/e` modifier)
proc_open()
ReflectionFunction (class)
require()
require_once()
shell_exec()
system()
```

**Command Execution**

```
exec           - Returns last line of commands output
passthru       - Passes commands output directly to the browser
system         - Passes commands output directly to the browser and returns last line
shell_exec     - Returns commands output
`` (backticks) - Same as shell_exec()
popen          - Opens read or write pipe to process of a command
proc_open      - Similar to popen() but greater degree of control
pcntl_exec     - Executes a program
```

**PHP Code Execution**

```
eval()
assert()  - identical to eval()
preg_replace('/.*/e',...) - /e does an eval() on the match
create_function()
include()
include_once()
require()
require_once()
$_GET['func_name']($_GET['argument']);
$func = new ReflectionFunction($_GET['func_name']); $func->invoke(); or $func->invokeArgs(array());
```

**List of Functions which accept callbacks**

```
Function                     => Position of callback arguments
'ob_start'                   =>  0,
'array_diff_uassoc'          => -1,
'array_diff_ukey'            => -1,
'array_filter'               =>  1,
'array_intersect_uassoc'     => -1,
'array_intersect_ukey'       => -1,
'array_map'                  =>  0,
'array_reduce'               =>  1,
'array_udiff_assoc'          => -1,
'array_udiff_uassoc'         => array(-1, -2),
'array_udiff'                => -1,
'array_uintersect_assoc'     => -1,
'array_uintersect_uassoc'    => array(-1, -2),
'array_uintersect'           => -1,
'array_walk_recursive'       =>  1,
'array_walk'                 =>  1,
'assert_options'             =>  1,
'uasort'                     =>  1,
'uksort'                     =>  1,
'usort'                      =>  1,
'preg_replace_callback'      =>  1,
'spl_autoload_register'      =>  0,
'iterator_apply'             =>  1,
'call_user_func'             =>  0,
'call_user_func_array'       =>  0,
'register_shutdown_function' =>  0,
'register_tick_function'     =>  0,
'set_error_handler'          =>  0,
'set_exception_handler'      =>  0,
'session_set_save_handler'   => array(0, 1, 2, 3, 4, 5),
'sqlite_create_aggregate'    => array(2, 3),
'sqlite_create_function'     =>  2,
```

**Information Disclosure**

```
phpinfo
posix_mkfifo
posix_getlogin
posix_ttyname
getenv
get_current_user
proc_get_status
get_cfg_var
disk_free_space
disk_total_space
diskfreespace
getcwd
getlastmo
getmygid
getmyinode
getmypid
getmyuid
```

**Other Notable Functions**

```
extract - Opens the door for register_globals attacks (see study in scarlet).
parse_str -  works like extract if only one argument is given.  
putenv
ini_set
mail - has CRLF injection in the 3rd parameter, opens the door for spam. 
header - on old systems CRLF injection could be used for xss or other purposes, now it is still a problem if they do a header("location: ..."); and they do not die();. The script keeps executing after a call to header(), and will still print output normally. This is nasty if you are trying to protect an administrative area. 
proc_nice
proc_terminate
proc_close
pfsockopen
fsockopen
apache_child_terminate
posix_kill
posix_mkfifo
posix_setpgid
posix_setsid
posix_setuid
```

**Filesystem Functions**

Read up more on [PHP Filesystem Functions](/php-filesystem-functions). Investigate all filesystem handlers as a part of the analysis.

**References**

[Stackoverflow (1)](https://stackoverflow.com/a/3697776), [Stackoverflow (2)](https://stackoverflow.com/a/3115645), [SecLists.org](https://seclists.org/bugtraq/2001/Jul/att-26/studyinscarlet.txt)
