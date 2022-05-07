---
title: "PHP Filesystem Functions"
---

Filesystem functions analysis as a part of [PHP Source Code Analysis](/php-source-code-analysis):

```
// open filesystem handler
fopen
tmpfile
bzopen
gzopen
SplFileObject->__construct
// write to filesystem (partially in combination with reading)
chgrp
chmod
chown
copy
file_put_contents
lchgrp
lchown
link
mkdir
move_uploaded_file
rename
rmdir
symlink
tempnam
touch
unlink
imagepng   - 2nd parameter is a path.
imagewbmp  - 2nd parameter is a path. 
image2wbmp - 2nd parameter is a path. 
imagejpeg  - 2nd parameter is a path.
imagexbm   - 2nd parameter is a path.
imagegif   - 2nd parameter is a path.
imagegd    - 2nd parameter is a path.
imagegd2   - 2nd parameter is a path.
iptcembed
ftp_get
ftp_nb_get
// read from filesystem
file_exists
file_get_contents
file
fileatime
filectime
filegroup
fileinode
filemtime
fileowner
fileperms
filesize
filetype
glob
is_dir
is_executable
is_file
is_link
is_readable
is_uploaded_file
is_writable
is_writeable
linkinfo
lstat
parse_ini_file
pathinfo
readfile
readlink
realpath
stat
gzfile
readgzfile
getimagesize
imagecreatefromgif
imagecreatefromjpeg
imagecreatefrompng
imagecreatefromwbmp
imagecreatefromxbm
imagecreatefromxpm
ftp_put
ftp_nb_put
exif_read_data
read_exif_data
exif_thumbnail
exif_imagetype
hash_file
hash_hmac_file
hash_update_file
md5_file
sha1_file
highlight_file
show_source
php_strip_whitespace
get_meta_tags
```
