---
title: Scripting in Ghidra, Patching MacOS Image2Icon
date: Feb 27 2020
tags: ["image2icon.app", "macos", "osx", "reverseengineering", "ghidra", "scripting"]
---

## Intro

Have you ever wondered how cool Ghidra is? I did for almost since the release. As someone who pretty much enjoy reading low-level code, I really dig what NSA did with this framework. To be honest, I'm still learning Ghidra and it's potential but from what I can see, the possibilities are endless.

In this post, we will learn how to use **Ghidra Scripting** to patch a MacOS application called `Image2Icon`. This simple yet cool application allows you to change Folder Icons to look Sick! The application has been developed by the same [company](http://www.shinyfrog.net/) who created a famous [Bear.App](https://bear.app/) (*a note taking ecosystem app*). The application is rather cheap (10$), and you can **buy it** [here](http://www.img2icnsapp.com/) which I highly recommend for the simplicity of use and the pricetag. Support these awesome developers.

In short, here is the example of the end results:

![Two folders with my shiny new icons](/images/posts/img2icon/2folders.png)

![Image2Icon.App](/images/posts/img2icon/image2icon.png)

As you can see from above picture, basically all Sick modes in the application are disabled; which means there are just a couple of them possible (**use-for-free**). The Lock Icon represents the mode which are not available for free.

Also, there is no offline installation, nor key-based activation. This means we can't crack application logic and create keygen. What we can do is patch, as always.

btw. I use [Sketch.App for all my image editings](https://duraki.github.io/posts/o/20200214-sketch.app-patch-in-ghidra.html).

Well, onto Ghidra.

## Patching

After loading the application in Ghidra, I imidietly went for `Functions` window. In here, I searched for few occurence of the words which would yield interesting results. Typing `lock` showed me there some interesting functions in the executable. 

After retyping, 48 methods named `isLocked` showed up. I eventually realised that each Icon Mode corresponds to each of the method/function in here.

![isLocked Listing](/images/posts/img2icon/isLocked-listing.png)

Above, I highlighted two things. With **purple** color, at the window title, there is total number of filtered function (equals to 43). The second one, highlighted in **yellow** is function size. 

If you are wondering why the function size is different, it's pretty simple. The functions with size `8` are **unlocked** icons, while the size `11` are the **locked** icons.

The function size is different because of instructions. See the snippet below for explanation.

```
# For unlocked icons
100005815 48 89 e5        MOV        RBP,RSP
100005818 31 c0           XOR        EAX,EAX 	; xoring EAX/EAX returns 0

# For locked icons
100004455 48 89 e5        MOV        RBP,RSP
100004458 b8 01 00        MOV        EAX,0x1 	; moving 1 to EAX
```

In the end, the pseudo-code of the function may look like this (plain C):

```
int isLocked()
{
  return 1; 	// or 0 for unlocked icons
}
``` 

Now, of course we could go through each function and patch MOV instruction to XOR via EAX, but  doing that for all 43 icon modes seems pretty tedious. We can in fact patch instructions for those icons who actually seems interesting to us, since each `isLocked` method is called via Object Instance (ie. `SFImageTemplateSD::isLocked`, `SFImageTemplateMiniDisc::isLocke`) but that doesn't seem 1337, does it?

![Patching One-By-One](/images/posts/img2icon/Patching-obo.png)

Therefore, **Ghidra Scripts**.

## Ghidra Scripting

There are two options when we come to scripting. We can take the offset of each function named `isLocked`, and calculate `return` instruction (Bash, Ruby, Python). This direct patching is popular among Sublime Text tutorials. This time, we will use Ghidra.

**Ghidra Scripts** allows you to use underlying Ghidra API to automate some tasks in easier manner. It is quite powerful when it comes to malware researching and large input feedback. There are some extensions which allows you to write Ghidra Scripts in Python, but this time we will use official documented stuff, developed in plain Java.

Anytime in Ghidra, you can use `Help` menu button and then click `Ghidra API Help`. Ghidra documentation is awesome and very well documented even for begginers. Also, Ghidra comes with various default Scripts which you can view by clicking `Window` and then `Script Manager`.

![Script Manager](/images/posts/img2icon/script-manager.png)

You can run any script by clicking the Run Script button. Studying those will help you move forward, or give you clues anytime you came up to unknown problem.

### Writing the script

> The Ghidra Script Manager allows for rapid development of extended Ghidra functionality. Unlike conventional Ghidra plugins that require a full IDE for development, Ghidra scripts can be developed right inside of Ghidra while it is running. You can interactively change your script and immediately re-run it.

Lets create a new script. Select `FunctionID` from the Script Manager sidebar. Click on the `New Script` button (marked with purple), and select Java as preferred language.

![Create New Script](/images/posts/img2icon/create-new-script.png) 

We will give our script the shiny new name: `FindPatchIsLocked.java`. Ghidra spits our new editor window and autofill necessary imports and libraries.

Lets fix our `run()` method which will give us MD5 sum of the current program in use. Remember that `run()` function is mandatory for any Ghidra Script.

```
...
    public void run() throws Exception {
		println("Current Program MD5 Sum: " + currentProgram.getExecutableMD5());
    }
```

If we run the script, the `Console` window will yield correct output:

```
Successfully compiled: FindPatchIsLocked.java
FindPatchIsLocked.java> Running...
FindPatchIsLocked.java> Current Program MD5 Sum: f9a4cb81546dffa2f8d58c79d804e70f
FindPatchIsLocked.java> Finished!
```

Now, we will write our new method for finding `isLocked` function. This method will accept `Program` which will be our `currentProgram`, and `String` as argument. The later will be used as to pass a function name. 

```
...

    private void findFunction(Program program, String name) {
    	// Define FunctionManager
		FunctionManager functionManager = program.getFunctionManager();
		FunctionIterator functions = functionManager.getFunctions(true);

		// Iterate over all functions and find one which equals to `name`
		for (Function function : functions) {
		    if (function.getName().equals(name)) {
			println("Function " + name + " found!");
		    }
		}
    }
```

Now fix the `run()` method to call this function.


```
...
    public void run() throws Exception {
		println("Current Program MD5 Sum: " + currentProgram.getExecutableMD5());
		findFunction(currentProgram, "isLocked");
    }
```

The running of this script will yield positive results in the Console window.

![Console Window after Executing Script](/images/posts/img2icon/console-isLocked.png)

That seems quite easy doesn't it? And it works! You can always reference to Ghidra API and default scripts for further details. For example, we can find `Function` model on the [API Docs](http://ghidra.re/ghidra_docs/api/ghidra/program/model/listing/Function.html) and see what methods are supported.

Lets look at the simple `isLocked` function in Dissasemble view. This one returns `(bool)True`, meaning it's locked.

```
int __stdcall isLocked(void)
	bool 	RAX:8          <RETURN>
SFImageTemplateMiniDisc::isLocked               XREF[1]:     10025f540(*)  

10004c500 55              PUSH       RBP
10004c501 48 89 e5        MOV        RBP,RSP
10004c504 b8 01 00        MOV        EAX,0x1
		  00 00
10004c509 5d              POP        RBP
10004c50a c3              RET
```

What we need from a `*.function` enumeration is `EntryPoint` & `Return` value. This way we can compare if function is return `0/1` depending if it's locked or not. Also, based on EntryPoint, we can define the offset of request regression, either `MOV` or `XOR`. Since `EntryPoint` returns [Address](http://ghidra.re/ghidra_docs/api/ghidra/program/model/address/Address.html), we can use method `4x on .next()` or call `add()` which accepts `displacement` as a paremeter. From the [documentation](http://ghidra.re/ghidra_docs/api/ghidra/program/model/address/Address.html#add(long)):

```Address	add​(long displacement)   Creates a new address (possibly in a new space) by adding the displacement to this address.```

Lets `.add()` offset of value `4` (number of instructions) to get correct instruction which either `MOV` or `XOR` the retval. 

```
    private void findFunction(Program program, String name) {
		...
		for (Function function : functions) {
		    if (function.getName().equals(name)) {
				...
				Address offset = function.getEntryPoint().add(4);
				println(offset.toString());		
```

Now that we got our offset address we need to patch, we need two things.
  
One is `getInstructionAt()` method which spits Address instruction. We will use `Assemblers` ([API](http://ghidra.re/ghidra_docs/api/ghidra/app/plugin/assembler/package-summary.html)) that offers methods for `Patching` and fixing instruction of correct offset address.

With a bit of refactoring, our current `findFunction` method looks like this:

```
    private void findFunction(Program program, String name) {
		FunctionManager functionManager = program.getFunctionManager();
		FunctionIterator functions = functionManager.getFunctions(true);
		int i = 0;
		for (Function function : functions) {
		    if (function.getName().equals(name)) {
				i++;
				
				Address offset = function.getEntryPoint().add(4);	
				Instruction ins = getInstructionAt(offset);

				String log = i + ": Function " + name +
					" found at: " + function.getEntryPoint() + "! " +
					"Offset: " + offset.toString() + " * " + ins.toString(); 
				
				println(log);
		    }
		}
    }
```  

When we run our script from script manager, we will get correct output in the console which displays few things: `isLocked()` function Address, an offset of the instruction block which returns `0` or `1`, and the instruction at the offset. As you can see, two types of instructions are possible, both XOR and MOV, depending on retval. **Blue** selection represent locked modes, while **green** one are available for free.

![getInstructionAt Running](/images/posts/img2icon/instruction-offset.png)

While we at it, lets work on our `patchInstruction` method. Write a new function named `patchInstruction` which will accept offset address as an input. Also import necessary modules into your script. This method needs to implement `Exception` as per documentation, as given Address may not be available in the `currentProgram`.

```
import ghidra.app.plugin.assembler.Assembler;
import ghidra.app.plugin.assembler.Assemblers;

...

	private void patchInstruction(Address atOffset) throws Exception {

	}
```

In this method, first we will obtain the Assembler bound for current program. You can check above documentation for detailed class references and API. The documentation states:

```static Assembler	getAssembler​(Program program)	Get an assembler for the given program.```

This method will return `Assembler` [interface](http://ghidra.re/ghidra_docs/api/ghidra/app/plugin/assembler/Assembler.html) of a given `Program`. Checking the documentation again, we have `assemble` method used in [SleighAssembler](http://ghidra.re/ghidra_docs/api/ghidra/app/plugin/assembler/sleigh/SleighAssembler.html) implementation which accepts Address and instruction block (either array of strings, or newline-separated instructions). We will use this method to patch our code.

```InstructionBlock	assemble​(Address at, java.lang.String... assembly)	Assemble a sequence of instructions and place them at the given address.```

In the end, our `patchInstruction` method will do two things:

* **Get Assembler of the Program**
* **Assemble fixed instruction on the offset**
	- this will patch instruction from `MOV EAX, 0x1` to `MOV EAX, 0x0`

Lets first check our ASM code on difference of `isLocked` function, both which retval is 1 and 0.

```
# => isLocked, 0
       int __stdcall isLocked(void)
             bool        RAX:8          <RETURN>
                             SF*::isLocked              XREF[1]:     1002517b0(*)  
       100003b2f 55              PUSH       RBP
       100003b30 48 89 e5        MOV        RBP,RSP
       100003b33 31 c0           XOR        EAX,EAX
       100003b35 5d              POP        RBP
       100003b36 c3              RET


# => isLocked, 1
       int __stdcall isLocked(void)
             bool        RAX:8          <RETURN>
                             SF*::isLocked                    XREF[1]:     100264608(*)  
       10006583a 55              PUSH       RBP
       10006583b 48 89 e5        MOV        RBP,RSP
       10006583e b8 01 00        MOV        EAX,0x1
                 00 00
       100065843 5d              POP        RBP
       100065844 c3              RET
```

As you can see, the function `isLocked` which returns value `1` (**Locked**) has a few padding bytes. The difference is 3 bytes (`31 c0` >> `* 00 00 00`). The `MOV EAX, 1` requires 5 bytes. `XOR EAX, EAX` requires just 2 bytes (`xor opcode(1) + operand(1) = 2`). This means we shall not edit `XOR` instructions as there would be overlapping in bytes padding.


We can now create `Assembler` instance named `asm` and patch the opcodes to reflect above instruction. We will use `asm.assemble` method to change opcode on the given instruction. Our `patchInstruction` now looks like this:

```
    private void patchInstruction(Address atOffset) throws Exception {
        try {
            Assembler asm = Assemblers.getAssembler(currentProgram);
            asm.assemble(atOffset, "MOV EAX, 0x0");
        } catch (Exception e) {
            println("Unable to patch at offset: " + atOffset + " with err: " + e.toString());
        }
```

We need to fix our `findFunction()` method to skip `XOR` opcode in the iteration. This way, we will avoid overlapping XOR offsets with MOV instructions, as those Address already affects Icon modes (**Unlocked**).

```
    private void findFunction(Program program, String name) {
		...
		for (Function function : functions) {
		    if (function.getName().equals(name)) {
				
				// check if instruction is MOV
				Boolean isMovOp = ins.toString().contains("MOV");
				

				try {
					// only patch instructions with MOV opcode
					if (isMovOp == true) {
						patchInstruction(offset);
					}
		...
```

Finally, edit your logging info to affect the changes. The final code looks like this.

```
//This script finds isLocked function and patch the retval to 0.
//@author Halis Duraki
//@category FunctionID.Custom
//@keybinding 
//@menupath 
//@toolbar 

import ghidra.app.script.GhidraScript;
import ghidra.program.model.util.*;
import ghidra.program.model.reloc.*;
import ghidra.program.model.data.*;
import ghidra.program.model.block.*;
import ghidra.program.model.symbol.*;
import ghidra.program.model.scalar.*;
import ghidra.program.model.mem.*;
import ghidra.program.model.listing.*;
import ghidra.program.model.lang.*;
import ghidra.program.model.pcode.*;
import ghidra.program.model.address.*;

import ghidra.app.plugin.assembler.Assembler;
import ghidra.app.plugin.assembler.Assemblers;

public class FindPatchIsLocked extends GhidraScript {

    public void run() throws Exception {
		println("Current Program MD5 Sum: " + currentProgram.getExecutableMD5());
		findFunction(currentProgram, "isLocked");
    }

    private void findFunction(Program program, String name) {
		FunctionManager functionManager = program.getFunctionManager();
		FunctionIterator functions = functionManager.getFunctions(true);
		
		int i = 0; // function index counter

		for (Function function : functions) {
		    if (function.getName().equals(name)) {
				i++;
				
				Address offset = function.getEntryPoint().add(4);	
				Instruction ins = getInstructionAt(offset);

				// check if instruction is MOV
				Boolean isMovOp = ins.toString().contains("MOV");
				

				try {
					if (isMovOp == true) {
						patchInstruction(offset);
					}
				} catch (Exception e) {
					println("Error: Something happend while calling patchInstruction ...");
				}


				Instruction patchedIns = getInstructionAt(offset);
				
				String log = i + ": Function " + name +
					" found at: " + function.getEntryPoint() + "! " +
					"Offset: " + offset.toString() + " * " + 
					ins.toString() + " >> " + patchedIns.toString() + 
					" patch: " + isMovOp.toString(); 
				
				println(log);
		    }
		}
    }

    private void patchInstruction(Address atOffset) throws Exception {
		try {
			Assembler asm = Assemblers.getAssembler(currentProgram);
			asm.assemble(atOffset, "MOV EAX, 0x0");
		} catch (Exception e) {
			println("Unable to patch at offset: " + atOffset + " with err: " + e.toString());
		}
    }
}
```

All you have to do is execute the script, and wait until completion. The script will automagically patch only those instructions for which `isLocked` function returns `1`.  
  
You have to admit Ghidra is truly a *Reverse Engineering* **Framework**. In the image below, I highlighted function address with **Blue**, offset of `XOR/MOV` Address with **Yellow**, and Green for information if instruction is `patched` or not.

![Running And Patching](/images/posts/img2icon/running-patching.png)

Double-clicking on any Offset Address (in Console) will automatically send your cursor to given instruction; this way we can check if our script correctly patched the code. Lets have a look at Offset `0x10007c715` (last in Console). As you can see, the instruction was properly reversed.

```
...
       10007c711 55              PUSH       RBP
       10007c712 48 89 e5        MOV        RBP,RSP
       10007c715 b8 00 00        MOV        EAX,0x0
                 00 00
       10007c71a 5d              POP        RBP
       10007c71b c3              RET
```

All you have to do is build binary and codesign it. You may do so by checking [end of my last post](https://duraki.github.io/posts/o/20200214-sketch.app-patch-in-ghidra.html) about patching Sketch for Unlimited Trial. Here is the end result:

![Image2Icon.App After Patching](/images/posts/img2icon/patched-and-working.png)

For further resource, check out the references I've written at the end of the post which can help you understand more about Ghidra Scripting.

Hope you like it! Always available for help on my [Twitter](https://twitter.com/0xduraki).

---

References:

* https://github.com/ghidraninja/ghidra_scripts
* https://github.com/ghidraninja/ghidra_scripts/wiki/Python-Scripting-Cheat-Sheet
* https://ghidra.re/courses/GhidraClass/Intermediate/Scripting_withNotes.html#Scripting.html