---
title: PriviaHub CTF Sombrero Write-Up
published: true
---
hey folks, in this write-up we'll solve CTF named Sombrero in PriviaHub, let's get started!

here's our challenge:

![image](post_resources/sombrero/description.png){:.postimg}

# [](#header-3)static analysis

sombrero is 16 kb malware and has hashed name. to speed up the solution i'll change its name to sombrero.

![image](post_resources/sombrero/changename.png){:.postimg}

then i upload the file on virustotal for basic and first analysis.

![image](post_resources/sombrero/virustotal.png){:.postimg}

virustotal says the file is compiled for OSX on ARM architecture. this could be super basic analysis but we got the useful information about our challenge, with this info i decided that sombrero is an iOS malware. my road map would be like that;

1. reversing the malware to assembly instructions with proper disassembler.
1. creating a malware with known listen IP address and port, then disassemble it as we did before for sombrero.
1. comparing the assembly instructions of both malwares.

# [](#header-3)reversing

after i decided my road map, let's dig into it. firstly i'm using IDA as disassembler because of its simplicity.

![image](post_resources/sombrero/ida.png){:.postimg}

but as we can see at above IDA couldn't handle to disassemble the malware. it seems like we need to find a disassembler that works for ARM architecture, i'm switching to objdump. that would be enough for this mission but in order to use it as ARM disassembler we have to install GNU ToolChain for ARM packages with following commands as shown below.

![image](post_resources/sombrero/installpackages.png){:.postimg}

after that let's disassemble sombrero. 

![image](post_resources/sombrero/objdump.png){:.postimg}

so far so good… now let's dig into messy part of this challenge. we need to find similar payload with trial and error method so metasploit would help us about that. i'm listing paylods with "show payloads" command and searching the proper malware that fits sombrero's characteristic.


![image](post_resources/sombrero/payload.png){:.postimg}

creating my own malware…

![image](post_resources/sombrero/msfconsole.png){:.postimg}

there is one thing important here. i need to know my payload's listen IP in hex format so i'll find it in assembly instructions.

192.168.55.55 > C0 A8 37 37 but don't forget to reverse it because of memory structure: `3737a8c0`

i named my payload as "sample" and now i got two disassembled malware.

![image](post_resources/sombrero/compare.png){:.postimg}

attention to size, we are lucky! now we need to find IP address in instructions and do comparison between two malwares.

sampleAssembly:

![image](post_resources/sombrero/sampleassembly.png){:.postimg}

sombreroAssembly:

![image](post_resources/sombrero/sombreroassembly.png){:.postimg}

Ta daa!!

we found the IP address in instructions, now all we need to do convert it into decimal.

`0d01a8c0 > 192.168.1.13`

here's the flag:

`PRIVIAHUB{192.168.1.13}`

it seems like we could find the flag just searching "192.168" as "a8c0" but we had to be sure about IP address.

peace out!

yibudak