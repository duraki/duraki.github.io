---
title: Cyber-attack on vehicle system P1
date: Mar 26 2016
tags: ["cyberattack", "vehicle", "system", "car", "canbus"]
---

## Intro  
Ko bi rekao da ću ja jednom pisati o cyber-attacks i hardveru. Znam za jedan post trenutno a to je bilo hakovanje onog Dongle-a sa Švicarske mreže na domaću. I tako se jednom vozam sa drugom u autu, i razmišljamo zašto ne bi provjerili sigurnost sistema na novijim automobilima koji imaju mogućnost kompjuterske dijagnostike općenito.  
  
## Zašto ne?  
Za početak, ono što nas je prvo odvuklo od toga jesu finansije. Počevši od automobila koji testiramo, pa dijagnostički (hardver) alati, API, softveri, i naravno skontamo da nam treba previše novca za krenuti. Onda sam se ja odlučio da se baziram teoretski, napišemo potrebnu dokumentaciju i onda potom to prenesemo praktično.  
  
## 0x01 - Općenito (Teorija)  
Motorno vozilo korišteno u svrhu transporta, kao proizvod koji je nastao automobilnom industrijom. U današnjem vremenu skoro neophodan predmet. Sa godinama, automobilska industrija je radila na poboljšanjima automobila i danas se čak može reći da dostiže vrhunac tehnologije. No, ova tehnologija u mnogo slučajeva može da se negativno odrazi na samog potrošača. Kao što svi znamo, onda kada do nekog predmeta imamo pristup fizičke ili druge prirode, u vidu umrežavanja, to nam kao *napadačima* pruža određene (ne)pogodnosti. Sigurnost automobilske industrije mnogo proizvođaća zabrinjava. Tako npr. **Mercedes** ima poseban sektor koji se bavi inžinjeringom i sigurnošću sistema. Takvo nešta ima i **Tesla**, i **Hyundai**. Kao što možete primjetiti, velike firme se bore da održavaju nivo sigurnosti u novijim automobilima koji imaju razne pristupe povezanosti (GPS, GSM, WiFi, Bluetooth ..).  
  
## 0x02 - Veza  
Automobili su kompleksne jedinice, a svaki automobil je po nečemu unikatan. Kada se baziramo na modele, noviji automobili u SAD i Europi imaju dodatne mogućnosti povezivanja. Tako imamo USB, razne jackove, CD/DVD radio, OBD, pa čak i "novije" načine kao WiFi, Bluetooth, itd.    
  
Tako se možemo postaviti u dvije pozicije u svrhu pristupa:  
  
    * BEŽIČNO
        |
        |___________________ * SIGNALI (Radio valovi, keyfobs, IR ...)
                             * SIGNALI NA DODIR ILI MOTION
                             * WiFi
    * KOMPJUTERSKI
        |
        |___________________ * CD/DVD, USB, BLUETOOTH
                             * DIJAGNOSTIKA
                             * DASHBOARD
                             

## 0x03 - Sigurnost
Naravno, mi ćemo se u ovom tekstu bazirati prije svega na sigurnost kompjuterskih sistema unutar automobila. Za početak čemo podijeliti način na koji se kompjuter povezuje na [ECU](https://en.wikipedia.org/wiki/Electronic_control_unit) komponentu. **ECU** (*Electronic Control Unit*) je ustvari mali system koji u automobilskoj industriji služi kao veza između kompjutera i operacijskih radnji vozila. U današnjim automobilima možemo nači i više od 70 ECU sistema koji upravljaju raznim radnjama.  
  
Instrument kojim upravljamo ECU da vrši operacije se naziva konzola, a u današnje vrijeme je bitno napomenuti da takav pristup imamo i putem infotainment systemima ili jednostavno dashboard (Tablet).  
  
     -----------------------------------------------------------------------
    |   FIZIČKI             |   WIRELESS                | KEY CONNECTED
     -----------------------------------------------------------------------
        - USB Portovi           - Bluetooth               - CAN bus
        - Auxilary              - WiFi                    - Ethernet
        - CD/DVD Rom            - GSM                     - High-Speed mbus
        - ...                   - OPS, XM, Remote         - ...

Gore smo naveli način pristupa konzole na automobil. Ako detaljno istražimo gore pojmove ili ako imamo uvid u sigurnost, navedene možemo svrstati po sigurnosnom segmentu. Tako možemo razumjeti attack-surface na kojem se baziramo.  
  
![diagram-konzola](http://i.imgur.com/GWubT8R.png)  
  
Na prethodnom diagramu možemo vidjeti da se zavisno od vrsta povezivanja može doći do dva predjela. To jest, imamo pristup **user mode** u slučaju da se vezujemo putem bluetootha ili WiFi. To znači da imamo limitiran pristup na infotainment systemu. Ali, ako vezu ostvarujemo putem mobilne mreže (tj. GSM) na HSI, ili USB-om na UDEV, te kvaser interfejsu (CAN), odma imamo pristup kernelu / srce sistema. Važno je napomenuti da se infotainment system bazira na **Windows CE** ili **Linux** varijanti zavisno od proizvođača automobila. Na top-u se pišu razna sučelja.  
  
![infotsys](http://i.imgur.com/jgyBVHy.png)  
  
Mene iskreno najviše zanima kernel level mod jer u takvom pristupu imate mogućnost obavljanja svih mogućih funkcija i kanala na automobilu. Najlakši pristup tome je fizički, odnosno pristup CAN Bus, pa ćemo se tako praktično i teoretski bazirati na njemu i njegovoj signalizaciji. Noviji automobili imaju pristup preko etherneta što je jako zanimljivo budući da se snifanje mreže može izvršiti efikasno i jeftino.  
  
## 0x04 - CAN Bus  
Dosta puta sam u dosadašnjem tekstu napisao CAN Bus pa je vrijeme da objasnim o čemu se radi. [Controller Area Network](https://en.wikipedia.org/wiki/CAN_bus) ili CAN Bus je port / plug u vozilima koji omogućava mikrokontrolerima i uređajima da upravljaju i omoguće interakciju sa aplikacijama, tzv. VCS. CAN Bus standard je izrađen 1983. u [Robert Bosch GmbH](https://en.wikipedia.org/wiki/Robert_Bosch_GmbH). Protokol je prvi put zabilježen u upotrebi 1988. u BMW 8 seriji. Znači, automobili imaju i do 70 ECUa za razne subsisteme (transmisija, airbag, abs, volan, el. podizači, vrata itd.). CAN standard je uveden sa razlogom da bi se mogli čitati odgovori od raznih senzora koji su ECU napajani.  
  
VCS:  

* CAN Bus  
* Linbus  
* MOST  
* Flexray (BMW SUV automobili)  
* Ethernet  
* TPMS  
  

Trenutno ga ima u dvije glavne verzije, kao sistem, **CAN 1.0**, i **CAN 2.0** (1991), a druga verzija je u glavnoj standarizaciji ISO-118982. Treba napomenuti da CAN nije namjenjen samo automobilskoj industriji, iako je napravljen za to ulogu, danas ga možemo vidjeti u raznim aspektima proizvodnje. Uglavnom, CAN 2.0 verzija se dijeli na dvije BIT verzije:  
  
  * CAN 2.0A (11-bit)
  * CAN 2.0B (29-bit)

Budući da radi na low-level protokolu, ne podržava nikakav vid sigurnosne implementacija. Aplikacije koje komuniciraju sa njim su napravljene na osnovu svog specifičnog sigurnosnog mehanizma (npr. da se komunikacije provjere).  
  
**CAN Bus** radi na osnovu signalizacije tj. šalje dva signala koja emituju neku informaciju. Tako imamo signal visoke frekfencije (CAN HIGH / **CANH**) i signal niske frekvencije (CAN LOW / **CANL**). Za primjer protokola CAN Bus-a uzet ćemo standardnu OBD diagnostiku, tipa OBD-II. U skupu, CAN Bus podržava 2.5 volti odnosno dovoljno voltaže za emitovanje signala. Na osnovu CANH i CANL možemo odrediti signalizaciju i informaciju.  
  
![voltaza-canbus](http://i.imgur.com/UUvmy9r.png)
  
Zavisno od vrste konektovanja na dijagnostici, pinovi i signali su raspoređeni na različitim mjestima. Za OBD-II ovi pinovi se nalaze na poziciji 6 za CANH, te poziciji 14 za CANL. Više o on-board diagnostic možete porčitati [ovdje](https://en.wikipedia.org/wiki/On-board_diagnostics).  
  
## 0x05 - Signal / Informacije  
Svi signali sa CAN Bus-a na procesor se šalju sa razlogom to jest da pošalju neki vid informacije. Signal ima svoju strukturu to jest frame informacije. Klasičan način generisanja informacija je sljedeći:  
  
* Arbitation ID
    - Predstavlja ID subjekta sa kojim se komunicira
    - Može sadržavati više subjekata / ID-ova
    - Prvi subjekat je onaj sa kojim se komunicira
* IDE
    - Standard formata
    - Uvijek 0
* DLC/DATA LENGTH CODE
    - Veličina podatka u bajtovima
* DATA
    - Podatak
    - Najviše 8 bajtova  
  
**Primjer informacije: **
```
    | ARBITATION ID #                                                         |
    |                  IDE                                                    |
    |                       DLC                                               |
    |                            ========== DATA ==========                   |```
  

Jedan frame podatka se sastoji od bitova koji su prevedeni iz signala (CANH i CANL). Bitovi se dijele različite strukture zavisno od framea.  
  
![frame-primjer](http://i.imgur.com/RI89RBI.png)
  
Kao što možemo vidjeti na primjeru nekog frame-a, imamo kompletan prikaz CAN slike. CAN standard zahtjeva implementaciju base frame formata ali se isti može nadovezati sa extended frame formatom odnosno da pruža takav vid opcije.  
  
- Zeleno označen prostor je ustvari identifier koji sadrži jedinstven ID koji asocira sa tim signalom.
- Plavo označen prostor je vrsta frame-a
- Žuto označen prostor je broj bajtova koji se šalju
- Crveno ozčaen prostor je informacija koja se šalje


## 0x06 - U praksi
U drugom dijelu sigurnosti automobilnih sistema ću pisati o emitovanju signala na virtualni CAN. Kad govorim virtualni, mislim na to da ću napraviti virtualnu mašinu odnosno automobil na svom računaru koji će imati CAN interfejs. Ovo radim isključivo iz razloga što vozim prahistorijsko auto (oldschool E30) i što nemam hardver. Nakon toga ide praksa na automobilu srednje klase iznad 2010-o godište. Za buduće, preporučujem da pročitate malo o [SocketCAN](https://en.wikipedia.org/wiki/SocketCAN) i nadam se da se vrtite na Linuxu jer se sljedeći dokument snifanja mreže bazira na njemu.
   
Outro ću da ostavim za drugi put.