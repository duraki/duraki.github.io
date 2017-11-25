---
title: Getjarpy - Python downloader
date: May 05 2014
tags: ["getjar", "python", "script", "massdownload"]
---

## Intro
[Getjarpy](https://github.com/dn5/getjarpy) is easy-to-use script/software with main use to download particular files from website [www.getjar.mobi](www.getjar.mobi), the oldest living database for downloading JAR files (applications, games, etc.) primary for older mobile phones. Getjarpy is transforming user-data and tricking website that it's been accessed over mobile phone and allowing user to automatically download JAR application. **Note:** that GetJar official website is not allowing users to download files from PC as you can see from screencast bellow! 
  
![GetjarSuckz](http://i.imgur.com/KkyTa3b.gif)

## Usage
To use Getjarpy you will need Python 2.7 with additional modules, read [Dependencies](#Dependencies) for more information. Basic usage of Getjarpy is to edit line 63 and it's variable data `mobileModel` which is at the moment of coding set to `nokia-5130-xpressmusic/`. You can get your model name parsed by visiting www.getjar.mobi, selecting your model and visiting any application listed. 

Then, it's just a matter of using predefined commands listed bellow. Please, make sure to change coresponding phone model, in case you don't, all files will be downloaded to the resolution of `Nokia 5130 XpressMusic`. 

![Usage](http://i.imgur.com/cJlFHFX.gif)

# To list usage / help use `--help` argument

	$ python getjarpy.py --help
	            _    _                        
	  __ _  ___| |_ (_) __ _ _ __ _ __  _   _ 
	 / _` |/ _ \ __|| |/ _` | '__| '_ \| | | |
	| (_| |  __/ |_ | | (_| | |  | |_) | |_| |
	 \__, |\___|\__|/ |\__,_|_|  | .__/ \__, |
	 |___/        |__/           |_|    |___/ 
	Simple GetJar java application downloader   
	Coded by dn5 / http://dn5.ljuska.org / @dn5__ 

	Usage: python getjarpy.py http://getjar.mobi/mobile/xxxxxx/name-of-app-model localFileName
	Example: python getjarpy.py http://www.getjar.mobi/mobile/567704/fooddash-for-nokia-5130-xpressmusic/ FoodDash

# To download file use `URI LOCALNAME` argument

	$ python getjarpy.py http://www.getjar.mobi/mobile/567704/fooddash-for-nokia-5130-xpressmusic/ FoodDash
	            _    _                        
	  __ _  ___| |_ (_) __ _ _ __ _ __  _   _ 
	 / _` |/ _ \ __|| |/ _` | '__| '_ \| | | |
	| (_| |  __/ |_ | | (_| | |  | |_) | |_| |
	 \__, |\___|\__|/ |\__,_|_|  | .__/ \__, |
	 |___/        |__/           |_|    |___/ 
	Simple GetJar java application downloader   
	Coded by dn5 / http://dn5.ljuska.org / @dn5__ 

	Usage: python getjarpy.py http://getjar.mobi/mobile/xxxxxx/name-of-app-model localFileName
	Example: python getjarpy.py http://www.getjar.mobi/mobile/567704/fooddash-for-nokia-5130-xpressmusic/ FoodDash

	Setting a link for exploitation!
	http://www.getjar.mobi/mobile/567704/fooddash-for-nokia-5130-xpressmusic/

	Writing other settings!
	Trying to exploit this URL: http://m.getjar.mobi/mobile/567704/fooddash-for--java/?d=-java
	Extracting some files from URL ...
	Getting file data and extracting installation!

	Getting a JAR file for the last time, I promise.
	Opening a file for testing, just to make sure everything works!
	Writting data ...
	w00t w00t, your file is ready to be transfered or reverse engineered! Filename: FoodDash.jar

## Dependencies

* Python 2.7
* BeautifulSoup (`pip install BeautifulSoup`)
* urllib2 (should come installed by default)
* socket (should come installed by default)

## About / License

This software is not intended to replace mobile downloading operation from GetJar, it is used for testing purpose and is not suported to use for illegal act. Me, dn5 coded this software for testing purpose and learning experience with Python. Software is licensed under GNU General Public License v3.0 (GPL-3.0). 