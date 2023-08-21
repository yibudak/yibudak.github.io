---
layout: post
title: "Sombrero CTF Write-Up"
published: true
date:	2020-06-30 03:00:00
categories: [Reversing]
tags : CTF
image:
  path: /post_resources/sombrero/sombreroassembly.png
  height: 1600
  width: 900
  alt: Reversing iOS Malware
---
Hey folks, in this write-up we'll solve CTF named Sombrero, let's get started!

Here's our challenge:

![CTF Description](/post_resources/sombrero/description.png)

### Static Analysis

Sombrero is 16 KB malware and has hashed name. To speed up the solution I'll change its name to sombrero.

![Change file name](/post_resources/sombrero/changename.png)

then I upload the file on VirusTotal for basic and first analysis.

![VirusTotal static analysis](/post_resources/sombrero/virustotal.png)

VirusTotal says the file is compiled for OSX on ARM architecture. This could be super basic analysis, but we got the useful information about our challenge, with this info I decided that sombrero is an iOS malware. My road map would be like that;

1. Reversing the malware to assembly instructions with proper disassembler.
1. Creating a malware with known listen IP address and port, then disassemble it as we did before for sombrero.
1. Comparing the assembly instructions of both malware's.

### Reversing

After I decided my road map, let's dig into it. firstly I'm using IDA as disassembler because of its simplicity.

![IDA Reversing the source code](/post_resources/sombrero/ida.png)

But as we can see at above IDA couldn't handle to disassemble the malware. It seems like we need to find a disassembler that works for ARM architecture, I'm switching to objdump. That would be enough for this mission but in order to use it as ARM disassembler we have to install GNU ToolChain for ARM packages with following commands as shown below.

![APT install for Kali](/post_resources/sombrero/installpackages.png)

After that let's disassemble Sombrero. 

![Objdump usage](/post_resources/sombrero/objdump.png)

So far so good… Now let's dig into messy part of this challenge. We need to find similar payload with trial and error method so metasploit would help us about that. I'm listing payloads with "show payloads" command and searching the proper malware that fits sombrero's characteristic.


![Creating the payload](/post_resources/sombrero/payload.png)

Creating my own malware…

![Metasploit creating malware](/post_resources/sombrero/msfconsole.png)

There is one thing important here. I need to know my payload's listen IP in hex format, so I'll find it in assembly instructions.

192.168.55.55 > C0 A8 37 37 but don't forget to reverse it because of memory structure: `3737a8c0`

I named my payload as "sample" and now I got two disassembled malware.

![Compare between to malware](/post_resources/sombrero/compare.png)

Attention to size, we are lucky! Now we need to find IP address in instructions and do comparison between two malwares.

sampleAssembly:

![Assembly codes of malware](/post_resources/sombrero/sampleassembly.png)

sombreroAssembly:

![Another assembly codes of malware](/post_resources/sombrero/sombreroassembly.png)

Ta daa!!

We found the IP address in instructions, now all we need to do convert it into decimal.

`0d01a8c0 > 192.168.1.13`

Here's the flag:

`FLAG{192.168.1.13}`

It seems like we could find the flag just searching "192.168" as "a8c0" but we had to be sure about IP address.

Peace out!

yibudak
