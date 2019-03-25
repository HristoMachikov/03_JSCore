function getInfo() {

    const baseUrl = "https://judgetests.firebaseio.com/businfo/";
   
    let stopId = $('#stopId').val();
    let $stopName = $('#stopName');
    let $buses = $('#buses');
    $buses.text("");
   
    $.ajax({
        url: baseUrl + stopId + ".json",
        method: 'GET',
        success: getStop,
        error: errorStop
    })

    function getStop(data) {
        $stopName.text(data.name)
        for (let [key, value] of Object.entries(data.buses)) {
            $buses.append(`<li>Bus ${key} arrives in ${value} minutes</li>`)
        }
    }

    function errorStop() {
        $stopName.text("Error")
    }
    $('#stopId').val("");
}