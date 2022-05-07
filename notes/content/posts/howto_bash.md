---
title: "Bash in simple words"
---

The first two statements of your Bash script should be:

```
#!/usr/bin/env bash
set -euo pipefail
```

The first statement is a Mac, GNU/Linux, and BSD portable way of finding the location of the bash interpreter.

The second statement combines:

* `set -e` which ensures that your script stops on first command failure. By default, when a command fails, BASH executes the next command. Looking at the logs, you might feel that the script executed successfully while some commands might have failed. Caveat: Be careful about applying it to existing scripts.
* `set -u` which ensures that your script exits on the first unset variable encountered. Otherwise, bash replaces the unset variables with empty default values.
* `set -o` pipefail which ensures that if any command in a set of piped commands failed, the overall exit status is the status of the failed command. Otherwise, the exit status is the status of the last command.

Example of valid shell script:

```
#!/bin/sh 
# Author:
# License: Unlicense

set -euf

log() {
    printf '\033[32m->\033[m %s\n' "$*"
}

die() {
    log "$*" >&2
    exit 1
}

usage() {
    echo "${0##*/} ARGS
    desc
    "
    exit 0
}
```

