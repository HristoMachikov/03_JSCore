function attachEvents() {

    $('#submit').on('click', submitMassege);
    $('#refresh').on('click', reloadPage);
    const baseUrl = "https://messenger-eb070.firebaseio.com/";
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
            url: baseUrl,
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
    console.log("hi")
}