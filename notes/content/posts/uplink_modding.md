---
title: "Modding Uplink by Introversion"
---

Are you a modder? Do you want to learn how to make game modes and game hacks? You are at the right place. We will take Uplink as an example and explore various things, based on recollection of the source code. The source codes is visible at [this link]().

## Changing the Uplink default Font Size for HDPI

On MacOS, specifically when using 2K resolution or above, either via Retina or external display; the font size of Uplink interface becomes to small to read. You can change this behaviour by patching address:

```
00000001000cdd28          mov        ecx, 0xa                                    ; argument #4 for method sub_1000a2da0
```

What this does is replace the default Uplink UI font size from 9 to **10**, making it appear larger on the screen and more easier to read. Looking at the source code, the following item is present:

```
// taken from: uplink/src/uplink.cpp
void Init_Fonts	()
{
	...
		success =
		  (GciLoadTrueTypeFont ( HELVETICA_10, "Dungeon", dungeonFontFilename, 9  ) &
		   GciLoadTrueTypeFont ( HELVETICA_12, "Dungeon", dungeonFontFilename, 11 ) &
		   GciLoadTrueTypeFont ( HELVETICA_18, "Dungeon", dungeonFontFilename, 16 ));
```

The above fixes the first call of GciLoadTrueTypeFont() function, and changing the default `mov ecx, 0x9` to `mov ecx, 0xa` (10). Produce a new binary and run it from MacOS application directory. Voi-la! 🎉

**References**: [uplink/src/uplink.cpp](https://github.com/gene9/uplink-source-code/blob/master/uplink/src/uplink.cpp#L1175-L1178)

## Definitions

Some interesting definitions have been identified.

**Game World and Mapped Data**

```
Taken from: `https://github.com/gene9/uplink-source-code/blob/master/uplink/src/game/data/data.h`

#define		WORLD_START_DATE				0, 0, 0, 24, 2, 2010	
#define		GAME_START_DATE					0, 0, 0, 24, 3, 2010	// ;)
#define		PLAYER_START_BALANCE			3000
#define		PLAYER_START_GATEWAYNAME		"Gateway ALPHA       "
#define		PLAYER_START_CPUTYPE			"CPU ( 60 Ghz )"
#define		PLAYER_START_MODEMSPEED			1
#define		PLAYER_START_MEMORYSIZE			24

// also see
#define		IP_LOCALHOST						"127.0.0.1"


// also see
#define		TICKSREQUIRED_*
#define		TRACESPEED_*
#define		HACKDIFFICULTY_*
#define		PROB_MISSION_*
#define		PAYMENT_*
#define 	MINDIFFICULTY_*
#define 	TIME_*
#define 	MINDIFFICULTY_*
#define 	MINDIFFICULTY_*
#define 	MINDIFFICULTY_*
```

**Global App Defines**

```
Taken from: `https://github.com/gene9/uplink-source-code/blob/master/uplink/src/app/globals_defines.h`

#define		ALPHA				0.85f							// Alpha value used for interface
#define		ALPHA_DISABLED		0.5								// Alpha value for disabled buttons
//#define	CHEATMODES_ENABLED									// Eg all-links, all-software, password-bypass etc
```

**Game Data, Titles, World Map Gateways, SW/HW Upgrades**

```
Taken from: `https://github.com/gene9/uplink-source-code/blob/master/uplink/src/game/data/data.cpp`

UPLINKRATING []
NEUROMANCERRATING []
PHYSICALGATEWAYLOCATIONS []
SOFTWARE_UPGRADES []
```


