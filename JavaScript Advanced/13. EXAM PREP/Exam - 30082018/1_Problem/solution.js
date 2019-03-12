function addDestination() {
    let $destination = $('.inputData');
    let $city = $destination.eq(0);
    let $country = $destination.eq(1);
    let $season = $('#seasons option:selected');
    let isEmpty = $city.val() && $country.val();
    let $destinationsList = $('#destinationsList');

    if (isEmpty) {
        let $tr = $('<tr>');
        let $tdDest = $(`<td>${$city.val()}, ${$country.val()}</td>`);
        let $tdSeas = $(`<td>${$season.text()}</td>`);
        $tr.append($tdDest).append($tdSeas);
        $destinationsList.append($tr);
        let $countSeason = $(`#${$season.val()}`);
        $countSeason.val(+$countSeason.val() + 1);
    }
    $city.val("");
    $country.val("");
}