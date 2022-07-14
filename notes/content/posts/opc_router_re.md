---
title: "OPCRouter Research"
---

## OPC-Router.com Exploitation and Vulnearbility Research 

Supported Platforms:

- **OPC-Router 4.18** (named: `**OPCRouter-4.18.5005.126.exe**`)
    - Windows Server 2016 & 2012 R2
    - Windows 10 (also IoT) & 8.1
- **OPC-Router 4.18** (named: `**OPCRouter-4.18.5005.126 (Windows 7).exe**`)
    - Windows Server 2012 R1 & 2008 R2
    - Windows 8.0 & 7

### What is OPC

OLE for Process Control (OPC) is a set of standard interfaces based upon Microsoft's OLE/COM technology. The application of the OPC standard interface makes possible interoperability between automation/control applications, field systems/devices etc.

**ELI5:** OPC is a "standard" used to share data in ICS between PC's and:

- Enterprise Application, User Interfaces, Transport Layer, PLC & Devices

Usually, all vendors implements their own PLC Data Sharing Protocol which creates a large inconsistency and implementation in SCADA'd environment. OPC Foundation published an OPC standard for Automation Industry Organization and Industrial Control Systems.

### OPC Standards

**OPC** offers a standard to Software Interface, decopupled from HMI/SCADA which is a great advantage. It comes usually in two parts:

- **OPC Server -** Exposes PLC memory address and label them as **Tags. Tags** are friendly name that maps to memory register in the PLC. Decouples the **OPC Client** from underlying DPMR.
- **OPC Client -** Used to connect to OPC Server and read respectable tags.
- **OPC Data Access (OPC DA) -** Browse infra for available OPC Servers. Browse OPC Server for tags and data. Can read/write Tags in a single call. Can subscribe to Tags for firing events in case of value(s) change. Blocking call therefore suspectable to DoS attack. Can lookup locations based on Cache or Device.
- **OPC Unified Architecture (OPC UA) -** This is new standard that will replace, modernize and enhance all the functionality of the existing OPC defined interfaces. OPC UA is described in a layered set of specifications broken into Parts. Basically, an "updated" OPC Standard.
- **OPC Data Exchange (OPC DX) -** Substandard/proto of OPC Standard.

**Other terminology:** 

- **HMI -** Human Machine Interface
- **SCADA -** Supervisory Control & Data Acquisition
- **DDE -** Dynamic Data Exchange
- **PLC -** Programmable Logic Controller
- **DCS -** Distributed Control System – purposes as a PLC, but highly optimized for process control, i.e. chemicals, oil/gas, food/beverage, pharmaceutical
- **RTU** - Remote Terminal Unit – traditionally proprietary hardware – as today PLCs can be used for RTU's
- **Register** – a memory location in a PLC or DCS. To some a register is a 16 bit word of data
- **Tag**, or **Item** **–** a single unit of data – can be digital or analog values, or even arry
- **DCOM -** Basically a protocol on top of Microsoft's **COM** for RPC (Remote Procedure Call), offers communication between **COM**-based applications *over the network.*

### OPC Reverse Engineering

All downloaded installations, the OPCRouter and OPCServer (KEPServerEX) from the download page visible are put for further reuse into `./Installations` directory.

The OPC Router connects systems vertically and horizontally, from sensors and controls to ERP and the cloud, from printers and scales to MES, SCADA or LIMS.

**Vendor**

```
### inray Industriesoftware GmbH

Holstenstraße 40, 25560 Schenefeld, Germany
Phone: [+49 4892-89008-0](tel:+49 4892-89008-0)
Email: [info@inray.de](mailto:info@inray.de)
Web: [inray.de](https://www.inray.de/)
```

**DOWNLOAD LINKS**:

- [Demo Link](https://produkte.inray.de/OPC_Router?code=C9A928AC&utm_source=sendinblue&utm_campaign=OPC_Router_DOI_Confirmed__DemoLink_EN&utm_medium=email#)
- [Undirect Link](https://produkte.inray.de/OPC_Router/Download?code=C9A928AC)

After installation, double-click the "OPC Router Configuration" from the Windows Desktop. This will open a OPC Router GUI for configuration.

Prior to exploring, we need to setup the lab as per the manual:

- **Requires**
    - Accessible OPC Server to communicate with PLCs (OPC DA 4.0, UA, XML) - **see below**
    - Accessible Database Server (MS SQL, Oracle, MySQL and all others via ODBC. MS Access and writing/reading XML files supported as well)
        - for Oracle, you need additional Oracle instant client (ODAC)
    - SAP plug-in supports SAP systems 4.0b or newer

### Enabling extensive LOG files in OCP Router

- Open OPC Router Configuration from the Desktop Shortcut
- Click **Extras** → **Settings** from the Menu Bar
- Scroll to bottom of the Settings Pane/Tab
- **Check** all checkboxes in `Log Output`

### Starting OPC Router Service(s)

- Open OPC Router Configuration from the Desktop Shortcut
- Click **Service** → **Start** from the Menu Bar
- Now you can open for example: `C:\OPCRouter4\LogDir\OPCRouterService_15.txt` for detailed log output of a started service

### Observations

By default, a connection string is visible in OCP Router **Config** Logfile from above Profiling:
    
```jsx
    `15.05.21 21:44:34.574[Trace:DacPac] SqlConstantConnection: SERVER=(localdb)\.\OPCRouter4;DATABASE=OPCRouterConfig;Trusted_Connection=Yes;APP=OPC-Router;Pooling=false;Connect Timeout=30`
    `15.05.21 21:44:36.554[Trace:StorageManager] SqlConstantConnection: SERVER=(localdb)\.\OPCRouter4;DATABASE=OPCRouterConfig;Trusted_Connection=Yes;APP=OPC-Router;Pooling=false;Connect Timeout=30`
    `15.05.21 21:44:36.639[Trace:StorageManager] SqlConstantConnection: SERVER=(localdb)\.\OPCRouter4;Trusted_Connection=Yes;APP=OPC-Router;Pooling=false;Connect Timeout=30`
    `15.05.21 21:44:37.092[Trace:StorageManager] SqlConstantConnection: SERVER=(localdb)\.\OPCRouter4;DATABASE=OPCRouterLongTimeStorage;Trusted_Connection=Yes;APP=OPC-Router;Pooling=false;Connect Timeout=30`
```

The application, when having started services running, have this information disclosed in **State** → **Service Status** → **Dashboard**. For example, see `logs/Dashboard.xml` on example:

```
OPC Router 4 Service is starting at 15/05/2021 20:23:42
Starting RedundancyServerManager. Listening on port 49954
...
```

There are number of *.exe under OPC Router Installation Directory, as seen below:

```
# => SQLLocalDB\inray.Data.SqlLocalDB.Service.exe
PS C:\OPCRouter4> C:\OPCRouter4\SQLLocalDB\inray.Data.SqlLocalDB.Service.exe
02:39:14 Arguments are invalid!
02:39:14
inray.data.sqllocaldb.service.exe - inray.Data.LocalDB.Service - (c) Copyright by inray Industriesoftware

Usage: inray.data.sqllocaldb.service.exe -n <arg> [-i -u]

Available commands:
-------------------
-n, --InstanceName   The Name of the instance
-i, --install        install the service
-u, --uninstall      uninstall the service

02:39:14 <Enter> to continue...

# => It was also observed that the file *.config consists of XML key/val attributes
# => holding the Database settings
PS C:\OPCRouter4> more C:\OPCRouter4\SQLLocalDB\inray.Data.SqlLocalDB.Service.exe.config | grep InitialDatabase -C 10
....
  <DatabaseConfiguration>
    <InitialDatabases>
      <Database Name="OPCRouterConfig" BackupFile="Backup\OPCRouterConfig.bak"/>
          <Database Name="OPCRouterShortTimeStorage" BackupFile="Backup\OPCRouterShortTimeStorage.bak"/>
          <Database Name="OPCRouterLongTimeStorage" BackupFile="Backup\OPCRouterLongTimeStorage.bak"/>
          <Database Name="OPCRouterRuntime" BackupFile="Backup\OPCRouterRuntime.bak"/>
    </InitialDatabases>
  </DatabaseConfiguration>
</configuration>

# => Later, it was discovered that intensive Log Files were also discovered in that subdirectory, as shown:
PS C:\OPCRouter4\SQLLocalDB\LogDir> ls

    Directory: C:\OPCRouter4\SQLLocalDB\LogDir


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----      15. 5. 2021.     23:59         256287 LoggerBase_15.txt
-a----      16. 5. 2021.     02:44         286907 LoggerBase_16.txt

# => @see logs/LoggerBase_16.txt for example 

# => When using Process Explorer, there is a process (service) created and running 
# => that shows the above utility running:

# => Process Explorer shows running this service as:
C:\OPCRouter4\SQLLocalDB\inray.Data.SqlLocalDB.Service.exe -s -n "OPCRouter4"

# => To kill/debug server, you need to open Microsoft Windows 
# => Control Panel and disable the Service

# => A registry editor shows this path for the above service
#    Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\OPCRouter4-LocalDB

# => Disable service using below window from "Services" (Control Panel), and then
# => we can symlink this database for further exploration

# => MINGW64:/c/
Test Account@DESKTOP-RONDJPT MINGW64 /c
$ ln -fs /c/OPCRouter4/ "//vmware-host/Shared Folders/InstallDir"

# => Now resume the service via exe path shown in 'Services'
```

To debug the above server, I used approach described here:

* [Reference](https://bordplate.no/blog/en/post/debugging-a-windows-service)

```
# => Run Windows Terminal with Admin Privs, and then:

# Use gflags.exe to map Image File as a Service
PS C:\Program Files (x86)\Windows Kits\10\Debuggers\x64> .\gflags.exe
... set as in below image and click Apply -> Launch ...
## Image: C:\OPCRouter4\SQLLocalDB\inray.Data.SqlLocalDB.Service.exe -s -n "OPCRouter4"
## Debugger: C:\Program Files (x86)\Windows Kits\10\Debuggers\x64\windbg.exe -server tcp:port=5005 -c "g"

# Use WinDbg to connect to host
PS C:\Program Files (x86)\Windows Kits\10\Debuggers\x64> .\windbg.exe --remote tcp:Port=5005,Server=127.0.0.1
# ... or attach via PID (that is, gflags.exe PID)
```

Additional directory & files exists through the app lifecycle. For example, using API Monitor + SysMon we gathered these additional queries by the application, specifically in the directory C:\ProgramData\inray as well as %appdata%\Local\inray_industriesoftware_G:

```
# => Discovering more bin/lib(s)
PS C:\ProgramData\inray\AppSettings> more .\OPCRouter4\OPCRouter4.settings
  ...
  </Password>
  <RuntimeCatalog>OPCRouterRuntime</RuntimeCatalog>
  <Port>1433</Port>
  <ConnectionTimeout>30</ConnectionTimeout>
  <ConfigCatalog>OPCRouterConfig</ConfigCatalog>
  <IntegratedSecurity>True</IntegratedSecurity>
  <DatabaseServer>(localdb)\.\OPCRouter4</DatabaseServer>

# => I copied this data in ~/Program Data/ directory of this project
# => @see: OPCRouter_OPC-Server@AR\ProgramData\inray

---

# => Likewise, in %appdata% directory, a user.config files are hidding
PS C:\Users\Test Account\AppData\Local\inray_Industriesoftware_G> ls


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----      16. 5. 2021.     08:08                inray.Tool.DacPacDeploy.e_Url_wdxasxd1lwq2m54joacwxw1hqc3mijhx
d-----      15. 5. 2021.     21:44                OPCRouterConfig.exe_StrongName_jw3q4nghqgrybwap5koxvkruxpapvd5j

# => I copied this data in ~/AppData_Local/ directory of this project
# => @see: OPCRouter_OPC-Server@AR\AppData_Local\inray_Industriesoftware_G
```

During the File Monitor and File System analysis, I discovered a **hidden** (ie. Isolated Storage) identity being accessed from the Application:

Use this for reference:

```
# => ./filemon
...
identity.dat	Read Write ReadAttributes Synchronize	SUCCESS	4	5,89	0.0.0.0			C:\Users\Test Account\AppData\Local\IsolatedStorage\hfyw1qvw.lyh\bfyk5gc3.2tn\StrongName.q23pcsbq0aqsyq1ss2yaivhiqs3zep4o\identity.dat
...

# => I made a backup of this directory for further research
# => @see: OPCRouter_OPC-Server@AR\AppData_Local\isolatedStorage\StrongName.q23pcsbq0aqsyq1ss2yaivhiqs3zep4o
```

All instances of database service(s) are visible in the next directory:

`C:\Windows\ServiceProfiles\OPCRouter4-LocalDB\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\OPCRouter4`

Additionally, using RegEdit.exe you can point to the next path and see observables used for Token Invocations:

```
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server Local DB\Shared Instances\OPCRouter4
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\inray Industriesoftware GmbH\OPC-Router
```

### Deobfuscation

```
C:\tools\de4dot-net45\de4dot.exe -r c:\input -ru -ro c:\output # => decompile with autodetection from stdin to stdout
C:\tools\de4dot-net45\de4dot.exe -d -r C:\OPCRouter4\ -ru -ro C:\OPCRouter4-De\ # => detection only, skips unsupported obfuscators due to -ru 
C:\tools\de4dot-net45\de4dot-x64.exe -f C:\OPCRouter4\OPCRouterConfig.exe -o C:\OPCRouter4-De\OPCRouterConfig.exe -p dr3 # => uses .net reactor which works
C:\tools\de4dot-net45\de4dot.exe -r C:\OPCRouter4\ -ru -ro C:\OPCRouter4-De-netr3\ -p dr3 # => not supported (recursive + specify cryptor)
```

## OPC Server

As per OPC Router documentation, an OPC Server is required for data aggregation from Process Network layer.

```
Do you need an OPC Server?
 
If you also require an OPC Server for your project, we recommend the 
Kepware OPC Server:

* https://www.kepware.com/en-us/products/kepserverex/

The Kepware OPC Server provides more than 160 communication drivers
and can therefore be used for connecting many different
control systems and IoT devices.
```

**References:**
* [Demo Download](https://s3.amazonaws.com/downloads.kepware.com/dl/KEPServerEX-6.10.623.0.exe?AWSAccessKeyId=AKIAJHQP3GS35B5Q7KYQ&Expires=1621113297&Signature=GRmDCLHeUbi8Ueq55FL%2FfHp3oiI%3D)
* [Install Guide](https://www.kepware.com/support/resource-library/installation-guide.pdf)
* [Documentation / Manuals](https://www.kepware.com/products/kepserverex/documents/kepserverex-manual.pdf)

Another option for OPC Server is to use MatrikonPC's version available as a free/shareware on their website. I saw this paper being used in a Lab environment when reading "`Penetration Testing of OPC as Part of Process Control Systems" doi:10.1007/978-3-540-69293-5_22`

- [Download Link](https://www.matrikonopc.com/downloads/index.aspx)

**Resources:**

* http://alvarestech.com/temp/smar/2019/OPC%20and%20DCOM%20-%205%20things%20you%20need%20to%20know%20-%20Windows%2010.pdf
* https://github.com/Engineering-Research-and-Development/opc-ua-car-server
* https://www.matrikonopc.com/resources/dictionary.aspx

**OPC Test:**

- [Cisco Notes](http://www.cisco.com/en/US/products/sw/custcosw/ps1001/products_tech_note09186a00800acafa.shtml)

**Other Tools:**

- binwalk
- Frida
- uniextractor
- pegasus for windbg
- dependecywalker
- fribratus
