---
title: "Automotive Hacking"
---

- Link [ECUs](/ecu-foundations) to avoid wires (weight, size, cost)
- Network Protocols allow ECUs to share information quickly and precisely ([Ethernet](/ethernet-specifications) & [CANFD/CAN](/canfd-specifications))
- Networks used between ECUs are based on Serial Communications
	- Serial means that items of information are sent via a single stream of communication
- Speed of communication is measured in number of bits sent per second (bps)
- CAN (Controller Area Network) bus was developed to meet needs of up to 1 million bits per second (1Mbps)
- LIN (Local Interconnect Network) introduced to give a lower cost, lower speed altenative (~20 kbps)
- FlexRay was developed for more fault-tolerant, higher speed (10Mbps) network
- Ethernet (100Mbps) for videos and advanced driver assistance systems (new vehicles)

Special ECU are used called "gateways" to interconnect different network protocols (CAN + LIN, or Ethernet + FlexRay etc.)

## Vehicle Diagnostics

- [ECUs](/ecu-foundations) provide diangostis services
- OBD standardises requests and responses related to diagnostics
- ISO 14229-1 (UDS) Standard
	- Defines structures and content of how data is interpreted
- Read Fault Memory in the form of Diagnostic Trouble Codes from the ECU (detect faults)
