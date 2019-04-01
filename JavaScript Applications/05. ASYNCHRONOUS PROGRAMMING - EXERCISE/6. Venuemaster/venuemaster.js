function attachEvents() {

    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_BJ_Ke8hZg";
    const endPoint = "custom";
    const baseUser = "guest";
    const basePass = "pass";
    const authoBase64 = btoa(baseUser + ":" + basePass);
    const headers = {
        "Authorization": `Basic ${authoBase64}`,
        "Content-Type": "application/json"
    }

    $('#getVenues').on('click', getVenues)

    function getVenues() {
        let venues = $('#venueDate').val();
        let response = $.ajax({
            method: "POST",
            url: baseUrl + "rpc/" + appKey + "/" + endPoint + "/" + `calendar?query=${venues} `,
            // ?query={"calendar":"${venues}"}
            headers
        })
        // for(const key in response){
            console.log(response)
        // }
        
    }



}
