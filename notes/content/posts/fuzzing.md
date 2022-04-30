---
title: "Web Fuzzing Technqiues"
---

* Use **SecList** seed fuzz
* Use **FuzzDB** seed fuzz

### Using Gobuster || FFuF

**Gobuster** fuzzing:

```
cat ~/SecLists/Discovery/Web-Content/Common-DB-Backups.txt \
~/SecLists/Discovery/Web-Content/Common-PHP-Filenames.txt \
~/SecLists/Discovery/Web-Content/PHP.fuzz.txt \
~/SecLists/Discovery/Web-Content/common.txt \
/tmp/php_files_only.txt | gobuster fuzz -u \
https://www.utic.ba/FUZZ -b 404 -w - -k -t 30
```

**ffuf** fuzzing:

```
cat ~/SecLists/Discovery/Web-Content/CMS/symphony-267-xslt-cms.txt \
~/SecLists/Discovery/Web-Content/CMS/symfony-315-demo.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/symfony.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/all.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/all-dirs.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/error.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/index.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/install.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/readme.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/root.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/setup.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/test.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/debug.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/context/admin.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Conf/conf.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Conf/config.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Conf/htaccess.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Database/inc.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Database/ini.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Database/sql.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Database/xml.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Language/php.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Language/js.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Language/html.txt \
~/SecLists/Discovery/Web-Content/SVNDigger/cat/Language/jar.txt \
~/SecLists/Discovery/Web-Content/api/actions-lowercase.txt \
~/SecLists/Discovery/Web-Content/Common-DB-Backups.txt \
~/SecLists/Discovery/Web-Content/Common-PHP-Filenames.txt \
~/SecLists/Discovery/Web-Content/PHP.fuzz.txt \
~/SecLists/Discovery/Web-Content/common.txt \
/tmp/backup_files_only.txt \
/tmp/log_files_only.txt \
/tmp/UnixDotfiles.txt | ffuf -w - -u https://www.nic.ba/FUZZ -mc 200,204,301,302,307,401,403,405 -fs 0
```

### Fuzz List

```
# => Symfony / Laravel Framework
Discovery/Web-Content/CMS/symphony-267-xslt-cms.txt
Discovery/Web-Content/CMS/symfony-315-demo.txt
Discovery/Web-Content/SVNDigger/symfony.txt

# => many stuff
Discovery/Web-Content/SVNDigger/all.txt
Discovery/Web-Content/SVNDigger/all-dirs.txt
Discovery/Web-Content/SVNDigger/context/error.txt
Discovery/Web-Content/SVNDigger/context/index.txt
Discovery/Web-Content/SVNDigger/context/install.txt
Discovery/Web-Content/SVNDigger/context/readme.txt
Discovery/Web-Content/SVNDigger/context/root.txt
Discovery/Web-Content/SVNDigger/context/setup.txt
Discovery/Web-Content/SVNDigger/context/test.txt
Discovery/Web-Content/SVNDigger/context/debug.txt
Discovery/Web-Content/SVNDigger/context/admin.txt
Discovery/Web-Content/SVNDigger/cat/Conf/conf.txt
Discovery/Web-Content/SVNDigger/cat/Conf/config.txt
Discovery/Web-Content/SVNDigger/cat/Conf/htaccess.txt
Discovery/Web-Content/SVNDigger/cat/Database/inc.txt
Discovery/Web-Content/SVNDigger/cat/Database/ini.txt
Discovery/Web-Content/SVNDigger/cat/Database/sql.txt
Discovery/Web-Content/SVNDigger/cat/Database/xml.txt
Discovery/Web-Content/SVNDigger/cat/Language/php.txt
Discovery/Web-Content/SVNDigger/cat/Language/js.txt
Discovery/Web-Content/SVNDigger/cat/Language/html.txt
Discovery/Web-Content/SVNDigger/cat/Language/jar.txt
Discovery/Web-Content/api/actions-lowercase.txt

# => ruby
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/webservers-appservers/Ruby_Rails.txt

# => mostly php stuff
Discovery/Web-Content/Common-DB-Backups.txt # => good stuff
Discovery/Web-Content/Common-PHP-Filenames.txt # => good stuff
Discovery/Web-Content/PHP.fuzz.txt # => good for phpmyadmins
Discovery/Web-Content/common.txt # => usual stuff like .git/.rc-s/dotfiles
https://raw.githubusercontent.com/xajkep/wordlists/master/discovery/php_files_only.txt # => more php

# => mostly api
Discovery/Web-Content/swagger.txt # => find swagger location
Discovery/Web-Content/api/api_endpoints.txt # => api endpoints

# => all web extensions are available below:
Discovery/Web-Content/web-extensions.txt
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/filename-dirname-bruteforce/CommonWebExtensions.txt

# => also this one for backups
https://raw.githubusercontent.com/xajkep/wordlists/master/discovery/backup_files_only.txt
https://raw.githubusercontent.com/xajkep/wordlists/master/discovery/log_files_only.txt

# => for login/admin pages
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/login-file-locations/Logins.txt
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/login-file-locations/cfm.txt
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/login-file-locations/html.txt
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/login-file-locations/jsp.txt
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/login-file-locations/php.txt

# => webservers
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/webservers-appservers/Apache.txt 
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/webservers-appservers/ApacheTomcat.txt

# => other ...
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/master/discovery/predictable-filepaths/UnixDotfiles.txt
```



