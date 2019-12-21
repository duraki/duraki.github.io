---
title: Gfx Workload, Komunikacija sa OpenGL i vrhovima
date: Jul 03 2011
tags: ["graphics", "gfx", "ogl", "vertex"]
---

Ovo je oldie tekst, ne sjecam se kad sam ga napisao ali sam ga nasao u mom notesu. Kao mašinski inžinjer i konstruktor na računaru, vrijeme sam provodio izučavajući rad grafičke kartice i njenih internala.

## Komunikacija grafičke kartice i OpenGL-a
  
OpenGL u samoj srži šalje rendering komande ili instrukcije do GPU (Graphichal Processing Unit), ali to se na nižev sloju (layeru) izbjegava zbog zagušavanja trodimenzionalnog prostora. Uprkos tome, aplikacije koje proizvode trodimenzionalan prostor (3D) komunicira sa GPU kroz instrukcije na drajver (driver). Driver čita ove komande, a zatim iste proslijedi na GPU. 3D grafički drajveri implementiraju OpenGL funkciju direktno, da bi se izbjegla nepotrebna transformacija funkcija namjenjena za rendering. Interface OpenGL-a za ovu transformaciju nazivamo HAL (Hardware Abstract Layer). On sadrži set funkcija za renderovanje ili prikazivanje scena u trodimenzionalnom prostoru.

![Komunikacija CPU/GPU](https://i.imgur.com/ZlekCwN.png)
*Shema: Komunikacija i proces komunikacije izmedju CPU instrukcija i GPU*

## Pohrana podataka

Grafička kartica ima svoju memoriju koju nazivamo VRAM (Video Random Access Memory). GPU pohranjuje podatke u VRAM, kroz njene prednje i krajnje bafere (front & back baffer).
  
VRAM **Front buffer** (prednji buffer) - pohranjuje pixeliziranu trodimenzionalnu (rendering) scenu vidljivu krajnjem korisniku. Nasuprot tome, VRAM **Back buffer** (zadnji buffer) pohranjuje i sadrži rendering scenu čitavog GPU, tj. dijelova koji nisu vidljivi u trenutku krajnjem korisniku.

Znači, zadnji bafer nam sadrži slike, scene i piksele nevidljive, i prerađene prije nego što su prikazane. Kada je slika sprema za prikazivanje, kreira se proces transformacije, te se zadnji i prednji baferi razmjenjuju. To nazivamo **buffer swap**.

**Buffer Swap** je terminologija osvježavanja (refreshanja) piksela scene. Kroz istu instrukciju, održavamo određen nivo frekvencije, da bi se izbjeglo nepotrebno "treptanje" slike. To "treptanje" slike ili scene se dešava kada se buffer swap instrukcija pokrene u toku trenutnog osvježavanja scene. U VRAM, između ostalog, smješteni su i **Depth Buffer** (tzv. **Z-Buffer**), tj. podatke koje sadrže dubljinu slike ili scene. Ova dubina se mjeri kao udaljenost od virtualne kamere do scenskog prikaza koji se trenutno prikazuje (renderira).

![Depth Buffer](https://i.imgur.com/MZL9CXO.png)

U GPU//VRAM memoriju također pohranjujemo i bitmap mask, tj. slikoviti prikaz before/after scene koje koristimo za sjene (shadows), teksture (textures), te vidljivost (transparency). Ove maske služe za preslikavanje nekog dijela suptilnog ili pomoćnog objekta za njeno "uljepšavanje".

![Bitmap Mask](https://i.imgur.com/jShtJno.png)

## Transformacija vrhova

**Vertex Transformation** je terminologija koja objašnjava početak i kraj nekog geomtrijskog prikaza u trodimenzionalnom porstoru. Geomtrijski podaci ili modeli se šalju na grafičku karticu u ovaj prostor. Jedna od uloga grafičke kartice je da transformiše ove geometrijske podatke, da bi se isti mogli prikazivati u 2D ili 3D prostoru.
  
Vrhovima modela, ili geometrijskog oblika, nazivamo sve tačke koje kreiraju jedan **Object Space**, tj. prostor koji jedan ovakav oblik zauzima. Pozicija i orjentacija modela su definirani u **World Space**. 
  
Prije nego se geomtr. oblik može prikazati na nekoj sceni, njegovi vrhovi se moraju transformisati u **Camera Space++. To je prostor vidljiv i definiran osama X i Y, te paralelna osa dubine vidljivosti Z. Kada se objekat transformiše u ovaj prostor kamernog/vidljivog prikaza, kreira se perspektiva; što znači da ovoj sceni kamera prikazuje geomt. oblik manjim ako je kamera dalja od objekta, te večim ako je kamera bliža ovom objektu.

Proekcija je prikazana u četiri-dimenzionalnim homogenim koordinatima koji nazivamo **Homogeneous Clip Space**. U tom prostoru, vrhovi imaju normalizirane koordinate u prostoru. Nakon transformacije geomtr. vrhova, pozicije su prikazane kroz render scenu u tzv. **Window Space**.

![Transformacija Vrhova](https://i.imgur.com/LGtcBZP.png)

## Vrhovi i Matrice

Vrhovi su osnovna arhitektura bilo kojem 3D engineu. Oni predstavljaju tačke u prostoru koje lociraju i definišu neki geomtr. oblik. Također se koriste za orjentaciju kamere, orjentaciju modela, definiranje prostora, moguće dubine i sličnih terminologija. Za 3D modelere, programere, i inžinjere, vrhovi su osnovna jedinica za transformaciju podataka u vizualnom prostoru, te se koriste za manipulaciju gore navedenih stavki.
  
Manipulacija ovih vrhova se vrši matematičkim putem, tj. matricama. Ovaj termin nazivamo **Matrix Calculation**.

Matrice su osnovni pojam transformacije i definicije skup više vrhova.

**Primjer matrice**:
  
```
[ 3 4 2 ]
[ 5 1 7 ]
[ 9 6 1 ]
```

U ovom tekstu nećemo objašnjavati i detaljisati matrice kao terminologiju. Predpostavit ću da znate osnove matrica i kalkulaciju istih kroz razne operacije. Zato ćemo odma preskočiti ovaj dio i prikazati primjere kalkulacije vrhovva.
  
U daljnim primjerima, nećemo praviti razliku između vrhova koje predstavljaju krajnje tačke geomtr. oblika, niti vrhova koje predstavljaju krajnje tačke scenskog pravca.
  
Vrhove označavamo slovom **V**, a to je vrh jedne tačke, dok *n* označava broj vrhova. N-dimenzionalni vrh možemo računati i definisati ovako:

`V = [V1, V2, V3, ... , Vn]`

U gornjem primjeru, tačka **V** ima komponente vektora koje smo definisali slovom **Y**. U stvarnom primjeru, komponente se označavaju imenama osa koje korespondiraju tim komponentama, npr. komponente 3D tačke **P** bi mogli napisati ovako:

```
P = [Px, Py, Pz]
```

Kroz iste osnove matrice računamo i vrhove bilo kojeg oblika:

```
    [V1]
    [V2]
V = [V3]
    [..]
    [V4]
```

Vrhove također možemo transformisati kao skalarne veličine, te tako izraćunati novi vrh koji ima iste (relevantne) proporcije nasuprot datim:

```
aV = Va = <aV1, aV2, ... , aVn>
```

U slučaju da je `a = -1`, koristimo notaciju `-V` da prestavimo negaciju vrha **V**. Kao takve, vrhovima se komponente mogu dodavati ili oduzimati:

```
P + Q = <P1+Q1, P2+Q2, ... , Pn+Qn>
```

Kao rezultat ove jednačine, transformacija detaljno, gledajuči je kroz matrice, izgleda ovako:

```
     	  [P1]
     	  [P2]
 P = 	  [P3]
    	  [..]
     	  [Pn]

     	  [Q1]
     	  [Q2]
 Q = 	  [Q3]
     	  [..]
     	  [Qn]

          [P1 Q1]
          [P2 Q2]
 C= P+Q = [P3 Q3]
          [.. ..]
          [Pn Qn]
```

Ovo je najjednostavniji primjer transformacije vrhova kroz matrica, ali stvari mogu biti složenije kada se tu pojavi više komponenti u vrhu **P** i u vrhu **Q**. Takva kalkulacija može potrajati duže u procesu GPU. 