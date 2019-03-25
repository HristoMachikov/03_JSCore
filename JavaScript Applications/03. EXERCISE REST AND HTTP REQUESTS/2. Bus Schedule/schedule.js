function solve() {

    const baseUrl = "https://judgetests.firebaseio.com/schedule/";
    let isCheck = false;

    let $info = $('.info');
    let $depart = $('#depart');
    let $arrive = $('#arrive');
    let stopId = 'depot';
    let currStop = "";

    function depart() {
        $depart.attr('disabled', isCheck)
        $arrive.attr('disabled', !isCheck)
        $.ajax({
            url: baseUrl + stopId + '.json',
            method: 'GET',
            success: stoppedBus,
            error: () => $info.text(`Error`)
        })

        function stoppedBus(data) {
            currStop = data.name;
            stopId = data.next;
            $info.text(`Next stop ${currStop}`);
        }

    }

    function arrive() {
        $depart.attr('disabled', !isCheck)
        $arrive.attr('disabled', isCheck)
        $info.text(`Arriving at ${currStop}`)
    }

    isCheck = !isCheck;
    return {
        depart,
        arrive
    };
}