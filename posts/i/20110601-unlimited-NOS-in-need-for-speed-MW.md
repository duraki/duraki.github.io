---
title: Binary patching in Need For Speed Most Wanted
date: Jun 01 2011
tags: ["nfsmw", "needforspeed", "reverseengineering", "gamemod"]
---

Need for Speed – Greates arcade racing game ever; Most Wanted – Best version out there. So what is this tutorial all about? I can’t say it is tutorial, more like reversing engineering technique to get an unlimited nitro on any gameplay in NFSMW.
  
In this tutorial there is no memory editing. You will need OllyDbg and Cheat Engine. This requires basic knowledge of RE  and of course a little bit of time.

## Reverse Engineering the Binary

First thing first, create a backup copy of your `speed.exe` from your `X:\Dir\SubDir\Need for Speed Most Wanted` (Installation Directory). Open it up in OllyDbg. 
  
![Backup](https://i.imgur.com/p3nKwIc.png)

So you have your “speed_debug.exe” in your OllyDbg, right? Now go to address `0x00692B06`.

```
00692B05   .  57               PUSH EDI                                 ;  ntdll.7C910208
00692B06      D99E F8000000    FSTP DWORD PTR DS:[ESI+F8]               ;  <- RIGHT HERE :]
00692B0C   .  E8 FF90FDFF      CALL speed_de.0066BC10
```

Why jumping to this address? I'll explain later in **Finding the right address* section of this blogpost. Above this address, there is a `PUSH EDI` instruction. The keypress `Alt` (by default), starts Nitro in NSFW gameplay. This is where the instruction is called. For now, just remember, the address `0x00692B05` is our starting point. 
  
At address `0x00692B0C`, we see some strange call. What is that, you may ask? Go into that call (navigate to address line and press F7)-. Now we are here:

```
007C4041   .  8BEC             MOV EBP,ESP                                ; <- Initial on call instruction
007C4043   .  6A FF            PUSH -1                                    ; <- Push n-1 from stack
007C4045   .  68 A0808B00      PUSH speed_de.008B80A0                     ; <- Step into this is
	                                                                        008B809F    00FF               ADD BH,BH    // Adding two same values will result 0 right?

007C404A   .  68 E4D57C00      PUSH speed_de.007CD5E4                     ;  SE handler installation which step into is
                                                                            007CD5E4  /$  55               PUSH EBP     // Something new... Uhm.. Forget it.

007C404F   .  64:A1 00000000   MOV EAX,DWORD PTR FS:[0]                   ;  Whoops, what is this? Moving first byte of FS to EAX!
007C4055   .  50               PUSH EAX                                   ;  And lets push it INTO stack and decrease EAX.
```

Lets just assume that the `call` at the very start (`0x00692B0C`) was only call for renewing scene and everything in it. We assumes this because it jumps to progam entry point (`0x007C4041`). And every new operation that happenes jumps to that entry point. Now, if you remember bellow address `0x00692B06` (which we will discuss later) is that call. We can create some conclusion based on this:

```
Address    :    00692B05    -    Pressing button for nitro
Address    :    00692B06    -    MAIN function
Address    :    00692B0C    -    The call we discussed about above
```

## MAIN function 

Main is from my view where it decrement size of Nitro health. I’m sure 100% because I got the pointer pointing to this address. We will leave PUSH EDI where it is, so we won’t do anything at address `0x00692B05`, but lets do a normal jump to call where is scene renewing. We will work with-in Main, so double click that disassembly at address `0x00692B06` and replace value to normal `JMP` instruction to call bellow that:  

![Replaces, Decrease Nitro to Main call](https://i.imgur.com/PUlWw68.png)

If we would just `NOP` the instruction at address `0x00692B06`, we would do nothing in particular. The address would be still useable by the game rules, and you will always end up on the same call. The point of this is to simply not destroy instructions at address `0x00692B06`, but use as resource for the next instruction (jump to call). Now, go to this address we just jumped to and you'll have the result:

```
00692B06       /EB 04            JMP SHORT speed_de.00692B0C                        ; Where we set to jump
00692B08       |F8               CLC                                                ; 
00692B09       |0000             ADD BYTE PTR DS:[EAX],AL                           ; ADD value of AL to byte pointer of EAX
00692B0B       |00E8             ADD AL,CH                                          ; Add value of CH to AL
00692B0C        000              Go into next address                               ; Direction
```

If we dissasemble the address just below direction at `0x00692B06` with instruction call: `“FSTP DWORD PTR DS:[ESI+F8]`, the result is obvious:

```
00692B06 - //
00692B08 - CLC is probably the F8 for adding to ESI           (FSTP)
00692B09 - Add value from AL to EAX but in one byte           (DWORD PTR DS:[ESI+above line (F8)]
00692B0B - Add value from CH to AL                            (CH is FF and AL is 00)

Result =                                                      FSTP DWORD PTR DS:[ESI+F8]
```

After we did this edit, try to run your NFS:MW (F9) from Olly, and choose any account and any car. Your Nitro will last forever. Easy peasy.

## Finding the right address

Now, lets get all to the very start, the point where we say about address we need to navigate to first. The one that we talk about in whole lesson, the famous `0x00692B06` that we disassemble. How did I found this address? The secret is in Cheat Engine.
  
Open up your NFS:MW, and drive any car with Nitro. Open your Cheat Engine and choose `speed.exe`, and lets do a little scanning. For scan type choose “Unknown initial value“, value type 4 bytes and press “First scan“. You will get with billions of result. Go and use a nitro for a little bit, press escape, navigate your cheat engine, but this time, choose “Decreased value” in scan type, press “Next Scan” and let it finish. Now use your nitro again, but not all. In Cheat Engine just press “Next Scan” and don’t change anything. The results will get smaller and smaller. Now, let your intro goes up a little, don’t use it at all. Navigate to your Cheat Engine, choose “Increased Value” press “Next Scan“.
  
Don’t touch other options! After scan is finished, repeat this steps again and again until you left with at least 20 addresses (requires some time but pays off). If you get up with none results just press “Undo Scan” in Cheat Engine.
  
After you've got at least 20 addresses (max: 30), add all of them into the addresses list bellow. This time, you need to freeze address one by one. Try with first one, and repeat each one of them one by one. The process goes like this:

```
- Freeze the address
- Go into the NFS:MW
- Use Nitro
- If your Nitro fuel percentage goes down then it’s not the right address
- Freeze another
- Repeat the process
```

Do that for every address until you found the right one. This address, once freezed, will lock the nitro bar after using it. For my binary, the address was `0x01356118`:

```
Active                Description                Address                Type                Value
[x]                   No description             01356118               4 Bytes             1057120574
```

The `[x]` means the address and value are frozen. The address may not be same as in your binary, and perhaps value will be different too. Values are not always what in-game HUD is showing us. Now when we have frozen, valid address,  right click on it and select **Found out what writes to this address**. This is simple technique if you are looking for pointers. The result will be, of course none because nothing at the moment didn’t use this address. Now, navigate your NFS:MW and use nitro a bit. You may get something like this:

```
00692B06 – D9 9E F8000000  – fstp dword ptr [esi+000000F8]
```

Hold up. Remeber the address `0x00692B06` I used to disassemble in this tutorial? Well, there it is. 

Thanks for reading!
