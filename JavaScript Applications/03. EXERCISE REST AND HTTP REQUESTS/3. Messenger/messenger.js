function attachEvents() {
    $('#submit').on('click', sendMess);
    $('#refresh').on('click', refreshMess);

    const baseUrl = "https://messenger-eb070.firebaseio.com/messeges.json";

    function sendMess() {
        let author = $('#author').val();
        let content = $('#content').val();
        let timestamp = Date.now();
        let messege = { author, content, timestamp };

        $.ajax({
            method: 'POST',
            url: baseUrl,
            data: JSON.stringify(messege),
            success: (data)=>console.log(data)
        });

    }

    function refreshMess() {
        $.ajax({
            method: 'GET',
            url: baseUrl,
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