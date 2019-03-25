function attachEvents() {
    const baseUrl = "https://baas.kinvey.com/";
    let appKey = "kid_SklUzDLu4";
    let authoToken = "";
    const authoHeader = {
        "Authorization": `Kinvey ${authoToken}`,
        "Conthent-type": application.json
    }

    function submitMassege() {
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();
        let message = {
            author,
            content,
            timestamp
        }
        $.ajax = ({
            url: baseUrl + "appdata/" + appKey + appdata,
            method: "POST",
            data: JSON.stringify(message),
            success: logRes
        })

        function logRes(res) {
            console.log(res)
        }
    }

    function reloadPage() {
        $.ajax = ({
            url: baseUrl,
            method: "GET",
            success: loadMassege
        })
    }
    function loadMassege(data) {
        let allMasseges = "";
        for (let mess of Object.values(data)) {
            allMasseges += `${mess.author}: ${mess.content}\n`;
        }
        $('#messages').text(allMasseges);
    }
}