---
title: Security/ SQL injection on REST-style URL
date: Dec 18 2013
tags: ["security", "web", "api", "vuln", "sql", "injection", "rest"]
---

## REST, a šta je to?

Pri samom početku, prije nego što počnete čitati ovaj tutorijal ili vršiti praksu po naznačenom, moram vas napomenuti nekoliko stvari. Prva stvar je da je ovaj tutorijal namjenjen za edukacione svrhe, najčešće u koristan za blackbox penetration testinga. Druga stvar su preduslovi, a isti su sljedeći: da znate vršiti advanced SQL injection; da ne koračate preko teksta; i da znate osnove HTTPa.

Šta je zapravo REST? Representational state transfer a/k/a REST je arhitektura koja koristi identifikaciju resursa. Iste resurse manipulišemo preko reprezentacija, i ostalih dodataka koje dolaze uz sam REST da bi izgradili sistem koji je podložan promjenama. Treba naznačiti da REST uzima resurs kao glavni izvor, odnosno sami request. REST je danas implementiran u mnogo web-aplikacija zbog njegove jednostavnosti bilo da se radi o MVCu ili pure PHPu, za razliku od SOAP, RPC, CORBA, koji "vežu" mašine, REST ustvari koristi HTTP da napravi poziv među mašinama. Šta to ustvari znači? To znači da REST aplicira API koji kasnije služi kao objekat kojem se treba mjenjati samo uvoz kod jednog toka, a ne da mjenjamo čitav sustav, i/ili dodavanjem novih redirekcija. SVAKI RESURS JE REQUEST!

Možda se sada pitate kako to izgleda, čemu služi, kako da ga upotrijebim, kako da znam kad, gdje i šta? Idemo polako. REST ima unikatan način pozivanja a ja sam siguran da ste vi dobro upoznati s njim, samo toga niste svjesni. Mogu da se kladim da ste bar jednom "naletjeli" na webaplikaciju koja koristi REST. Implementiran je u većini frameworka, brz je i pouzdan. Možda poslije ovog write-upa vi počnete koristiti REST?! Upotreba REST arhitekture je široka. Neko to radi zbog estetike, neko zbog njegove pouzdanosti, neko zbog smanjena posla, neko zato što je primoran od strane šefa, a neko jednostavno voli da eksperimentiše sa njim (kao npr. ja). No dobro, ovdje smo da pričamo o vršenju SQLi na REST-styled URI-ma.

## Znam šta je REST, a šta je REST-url?

**REST-styled** a/k/a **RESTful** a/k/a **clean URL** a/k/a **SEO-friendly** (etc.) URL JE: struktura URL-a koji ne sadrže parametar URL-a već njegov resurs + reprezentaciju. Tipičan URL sa kojim ste se svi susretali, a o kojem sam već pričao je taj da se resurs šalje preko reprezentacija koji su već deklarisani. Ovaj tip URL-a se najčešće koristi zbog SEO i stalnog standarda linka.

Ako i dalje niste shvatili na šta ciljam, idem vam to prikazati "grafički". Uzmimo u obzir da se u sljedećem linku pod parametrom "mod=" vrši query za "modul {user,admin,vip}", a pod parametrom "id=" vrši selektiranje ID korisnika. Output bi trebao biti print ID korisnika.

**URL**: http://example.com/show.php?mod=user&id=33  
**PHP** (pseudo):

	<?php
	    $id = $_GET['id'];
	    echo "ID je: " . $id;

	    ...

	    query_u_bazu($id);
	    query_u_bazu($_GET['mod']);
	?>

**OUTPUT**:  
ID je: 33

Ovo gore je tipični primjer. U ovom slučaju, da testiramo SQL injection, probali bi postaviti quotes/double_quotes ispred parametra. Primjer je napisan ispod. Važno je napomenuti da u pentestingu treba testirati svaki parametar jer ako nemamo izvorni kod, ne znamo koji je parametar filtriran a koji ne. Možda baš taj koji nam je bilo "mrsko" da testiramo bio je ranjiv, a to traje svega 2-5 sekundi.  
  
	URL SQL#1: http://example.com/show.php?mod="user&id=33
	URL SQL#2: http://example.com/show.php?mod=user&id="33

Uzmimo u obzir sljedeće: da je DBMS MySQL; da se radi o GET requestu; i da nam je i prvi i drugi test bacio MySQL error. Izvršavanje SQL komandi na URLu iznad je jednostavano i to bi večina koja čita ovaj tutorijal trebala znati. No, šta ako se radi o URL gdje su parametri sakriveni preko reprezentacije. Primjer takvog URL-a je napisan ispod.  
  
URL_REST: http://example.com/show/user/33
  
Jel vam sad poznatno? Prvo ću napisati tabelu razlike između normalnim URLom i čistim URLom.

	+----------------------------------------------------------------------------------------+
	| http://example.com/   - Normalni URL           | http://example.com/   - RESTful URL   |
	|----------------------------------------------------------------------------------------|
	| show.php?mod=user&id=33                        | show/user/33                          |
	| show.php?mod=user&id=69                        | show/user/69                          |
	| show.php?mod=user&id=32                        | show/user/32                          |
	| show.php?mod=admin&id=2                        | show/admin/2                          |
	| show.php?mod=admin&id=3                        | show/admin/3                          |
	| show.php?mod=vip&id=18                         | show/vip/18                           |
	| show.php?mod=vip&id=30                         | show/vip/30                           |
	| show.php?mod=vip&id=13                         | show/vip/13                           |
	+----------------------------------------------------------------------------------------+


Nadam se da shvaćate razliku između ova dva URLa. Vrlo je moguće da vas je ovakav RESTful URL odbacio od napada koji ste spremili. Poenta je da od sad pa nadalje ne bi trebao. Vrlo je malo literature na ovu temu ali ja sam izdvojio vremena da testiram i da podijelim znanje. Ako ste zabrinuti kako je moguće pozivati ovakav sklop URLa preko RESTa evo ideje. Deklarisani su svi resursi i reprezentacije, treba ih samo ukopčati. Treba napomenuti da je response servera drugačiji ako se koristi REST arhitektura.

	show.php / {show} / resurs
	mod=user / {user} / reprezentacija
	id=69    / {69}   / reprezentacija
	http://example.com/show.php?mod=user&id=69
	http://example.com/{show}/{user}/{69}


Moguće da i dalje niste shvatili opći bit REST API-a, zašto se koristi, šta je REST-ful URL, i ostalo, najbolje bi vam bilo da pročitate tekst ispočetka jer je ovo kompleksna tema za kratak tekst i dajem sve od sebe da je objasnim što lakše mogu. Na kraju tutorijala imate reference koje bi vam preporučio da pročitate ako želite detaljno znati šta se vrti u pozadini budući da je ovo tekst konkretno na SQL injection čistih URIa.

**Napomena**: Gore navedeni čisti URL ne mora da znači da je osnovica REST arhitekture. Vrlo moguće je da se takva domena javlja i ako je u pitanju RewriteRula u .htaccess; injection se vodi na istom principu uz malu razliku koju ću navesti u tekstu ispod. Isto tako, reference za .htaccess možete pogledati na kraju tutorijala. Dobro će vam poslužiti ako želite da se igrate sa ovakvim stvarima.

## Kako vršiti injection

Sad ide počinje pravo učenje. Ne čitaj ako ne znaš osnovu. Zbunit ćeš se! Recimo da želite vršiti pentesting na neki određen websajt. Taj websajt ima URL "http://example.com/. Prvo što radite jeste provjerite da li je CMS pre-made/public ili je custom-made odnosno CMS po naruđbi. Ako je to prvo, onda pokušajte ispisati exploit ili ako je starija verzija, nađite si exploit sami. AKO je CMS po naruđbi, šta treba raditi pri samom početku je "baciti" request i provjeriti header-response websajta. Za takve stvari inače koristim alat "curl" sa parametrom head + URL. Potrebno je obratiti pažnju na X-Powered-By jer nam on inače vrača informaciju na kojoj tehnologiji se bazira webaplikacija a pri tome i verziju.

	dns@kutija:/$ curl --head http://example.com
	HTTP/1.1 200 OK
	Date: Thu, 19 Dec 2013 00:10:10 GMT
	Server: Apache/2.2.14 (Ubuntu)
	X-Powered-By: PHP/5.3.2-1ubuntu4.22
	Set-Cookie: PHPSESSID=fn07ffrue52frs7u4gnenainu1; path=/
	Expires: Thu, 19 Nov 1981 08:52:00 GMT
	Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
	Pragma: no-cache
	Vary: Accept-Encoding
	Content-Type: text/html; charset=cp1250



Nekad X-Powered-By ne vraća ništa (sakriven je), a nekad vraća i REST API codename ili ime (ako je korišten), u ovom slučaju nije nam vratio. No to nije kraj, injection i dalje možemo izvršiti. Ali pre toga jedna napomena. Sjetite se da sam rekao da ima razlika između injectovanja na čisti URL koji se vodi preko REST arhitekture, i na čisti URL koji se vodi preko .htaccess-a. Razlika je u tome da u REST arhitekturi, ako je konfigurisano, reprezentacija mora imati konstantu vrijednost, u protivnom samo slanje zahtjeva nije moguće. Primjer. Ako je REST konfigurisan da username parametar ima vrijednost od 3 karaktera, REQUEST MORA ZADOVOLJAVATI TO. Ako ne zadovoljava, vraća grešku. U tom slučaju četvrti i peti link bi bacio hard grešku. Drugi link bi bacio soft grešku (ako query ne postoji ili slično)

	[1] http://example.com/show.php?username=dn5  <- ne baca grešku
	[2] http://example.com/show.php?username=dn51 <- baca grešku (soft error - zavisi od slučaja do slučaja - query)
	-
	[3] http://example.com/show/dn5/  <- ne baca grešku
	[4] http://example.com/show/dn51/ <- baca grešku (hard error - UVIJEK) / Previše karaktera odnosno nije identičan 3
	[5] http;//example.com/show/dn/   <- baca grešku (hard error - UVIJEK) / Premalo karaktera odnosno nije identičan 3



U slučaju da se koristi .htaccess sa rewrite rulom, konfiguracija ne postoji i request bi se sastojao kao u drugom linku, nebitno što je čisti URL. Kako se svodi injection ću objasniti u sljedećem paragrafu. Važno je bilo napomenuti gore napisano jer će vam služiti za sljedeći paragraf.  
  
Ako za SQL injection koristimo quote ili double quote, isti bi princip koristili i na čisti URI. Da provjerimo jel input sanitizovan, provjeravamo svaku reprezentaciju pa čak i resurs jer je razliku teško naći, odnosno nemoguće ako ne znate back-end. Imamo jednostavan link koji smo koristili u poršlom primjeru, {show} je resurs, {dn5} je reprezentacija a budući da resurs može biti ne-deklarisan, moramo provjeriti i njega što samim tim idemo na crno.

	Normalni URL:  [1] http://example.com/show.php?username=dn5' <- baca MySQL error
	RESTful  URL:  [2] http://example.com/show/dn*               <- baca MySQL error
	Rewrite  URL:  [3] http://example.com/show/"dn5              <- baca MySQL error


**ZAŠTO?** Kod prvog linka gdje je normalni URL, već je poznato da grabimo dn5 + quote , a input nije očišćen. Tipični napad preko SQL injection. Kod drugog linka, uzimamo u obzir da je REST konfigurisan na 3 karaktera, znači, jedan karakter moramo obrisati i zamjeniti ga sa zvjezdicom (*) ili navodnikom ("). U većini slučajeva se koristi zvjezdica, a iz kojeg razloga nikad nisam ni saznao, valjda je Kyle Anderson uveo takav zakon :)). Ako server nije konfigurisan da reprezentacija sadrži tri karaktera, možete probati i dn5*. Kod trećeg primjera gdje se koristi mod_rewrite + .htaccess, quote stavljate ispred jer nekad je loše ispisan RewriteRule i veče su mogućnosti da vam tako baci grešku mada nije pogrešno postaviti quote i na kraju.  
  
U prvom linku ne trebate provjeravati show.php (nemoguće je), ali ako se nađete u situaciji kao u linku 2 ili 3, morate provjeriti i to jer ne znate da li je to reprezentacija ili resurs, i ako je to prvo, da li je ista ranjiva. Koliko znam, resurs nije moguće konfigurisati na određenu vrijednost karaktera. Radite sljedeće.

	RESTful URL:  [1] http://example.com/*show/dn5               <- ne baca MySQL error
	Rewrite URL:  [2] http://example.com/"show/dn5               <- ne baca MySQL error


Ovaj slučaj može značiti dvije stvari. Prva stvar je da je "show" resurs, a druga stvar je da je input sanitizovan i da nije moguće izvršiti injection na taj parametar. Opet kažem, važno je testirati svaku vrijednost jer nikad ne znate šta je tu resurs a šta reprezentacija, šta je ranjivo a šta ne. Znači testiranjem do pobjede.

## Alati

Hmm... Odgovor na vaše pitanje "Jel ima š'a automatsko da se ne peglam?" će biti.. "MOŽDA" :)) Alati postoje i uvijek će postojati. Tu su da nam pripomognu i ubrzaju proces. Lista alata se nalazi ispod. Uz sqlmap koristite paramtera za URL + *, a u BurpSuite morate konfigurisati koliko threada da šalje jer mnogo alarmira IDS. Prihvatite se manuel testiranja na ranjivost a onda koristite sqlmap ako baš morate.
  
	[*] sqlmap          - Alat za testiranje ranjivosti nad SQL injection, sadrži testiranje i na čistim URLima (implementirao Miroslav u v0.9)
	[*] BurpSuite       - Sadrži opciju za testiranje svih direktorija i fajlova sa quotom
	[*] yourbrain.pl    - Nije baš alat ali je korisniji od svakog alata /sarkazam

## Outro

To bi bilo to. Ako ste našli grešu, prijavite je meni na twitter: @dn5__ ili na email dn5@dn5.ljuska.org :)) Pozdrav za ekipu sa irca. Ljuska.org! Specijalan shotout za knownsrv.com. Posjetite moj blog: http://dn5.ljuska.org. Ako imate kakve ideje i prijedloge, šaljite ih na mail a ja ću ugoditi svima i odgovoriti.  

	Twitter: @dn5__
	Email: dn5@dn5.ljuska.org
	IRC: irc.rizon.net / #ljuska / dn5

## Reference

	Arhitectural Style and the Design of Network-based Software Arhitectures - http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm
	REST - http://en.wikipedia.org/wiki/REST
	Clean URLs - http://en.wikipedia.org/wiki/Clean_URL
	How to have clean URLs - http://wettone.com/code/clean-urls
  
	$ exit
