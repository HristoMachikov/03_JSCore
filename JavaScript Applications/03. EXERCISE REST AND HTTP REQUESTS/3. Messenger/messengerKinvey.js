function attachEvents() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_SklUzDLu4";
    const authToken = "5d3a6a46-492d-4ef8-9692-e769f0c8bbbd.PfSOBza08TWjJPGh2XmXWJ2FBf6G18kn0q26KBszM6I=";
    const appdata = "/messages";
    const authHeaders = {
        "Authorization": `Kinvey ${authToken}`,
        "Content-Type": "application/json"
    }

    $('#submit').on('click', sendMess);
    $('#refresh').on('click', refreshMess);

    function sendMess() {
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();
        let messege = { author, content, timestamp };

        $.ajax({
            method: 'POST',
            url: baseUrl + "appdata/" + appKey + appdata,
            data: JSON.stringify(messege),
            headers: authHeaders,
            success: (data) => console.log(data)
        });

    }

    function refreshMess() {
        $.ajax({
            method: 'GET',
            url: baseUrl + "appdata/" + appKey + appdata,
            headers: authHeaders,
            success: refreshData
        });
    }

    function refreshData(data) {
        let output = "";
        for (const obj of Object.values(data)) {
            output += `${obj.author}: ${obj.content}\n`;
        }
        $('#messages').text(output.trim());
    }
}