---
title: "ECU Foundations"
---

## ECU

- Electronic Control Unit the "ECU"
- Doing calculations or apply rules in the vehicle system
	- Calculation example of ECU
	- Meassure "Speed (km/h)"
	- ECU would "calculate": 
			- **speed (km/h) = wheel (rpm) x 3.6**
- Apply a tiny part of logic
	- If speed is above 5km/h, then lock the doors
- ECUs are wired to sensors, mothers, and other actuators
- One ECU can be used for different vehicles
- They use microcontroller (have memory/storage unlike microprocessor)
- Uses embedded software, via special hardware that converts electrical signal to numbers (and vice-versa), collectively IO (input/output)
- Uses networking hardware, via in-vehicle networks (like CANBus)

## ECU Software

**Layers**
- Control functions that ECU runs are referred to as "application software", (ie window control, etc.) (ASW)
- Network connections of IO of ECU are managed via "basic software" (like an operating system layer) (BSW)
- Runtime environment "RTE" glues both Network and Control functions, takes output from ASW to BSW
- To update ECU software, we can use UDS and Flash Bootloader a special piece of ECU that updates the firmware


## Diagnostis

- OBD protocol (On Board Diagnostics)
- Use OBD to diagnose ECU's
- Use [XCP and Callibration](./ecu-calibration) to Diagnose ECU


## HCP (New era of ECU's)

- There is new generation of ECU called high-performance computing platform (HCP)
