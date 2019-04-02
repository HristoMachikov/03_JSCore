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

    let currId = "";
    let currTotalPrice = 0;
    let currQuantity = 0;
    let currName = "";
    let currDateTime = "";

    $('#getVenues').on('click', getVenues)

    async function getVenues() {
        $("#venue-info").empty();
        let venues = $('#venueDate').val();
        if (venues) {
            try {
                let response = await $.ajax({
                    method: "POST",
                    url: baseUrl + "rpc/" + appKey + "/" + endPoint + "/" + `calendar?query=${venues}`,
                    //?query={"calendar":"${venues}"} - DO NOT WORK?
                    //calendar?query=${venues}
                    headers
                })
               
                for (const id of response) {
                    try {
                        let venue = await $.ajax({
                            method: "GET",
                            url: baseUrl + "appdata/" + appKey + "/venues/" + `${id}`,
                            headers
                        })

                        let $div = $(`<div class="venue" id="${venue._id}"></div>`);
                        let $span = $(`<span class="venue-name"></span>`);
                        let $btn = $(`<input class="info" type="button" value="More info">${venue.name}</input>`);
                        let $divNext = `
                            <div class="venue-details" style="display: none;">
                                <table>
                                <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                                <tr>
                                    <td class="venue-price">${venue.price} lv</td>
                                    <td><select class="quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    </select></td>
                                    <td><input class="purchase" type="button" value="Purchase"></td>
                                </tr>
                                </table>
                                <span class="head">Venue description:</span>
                                <p class="description">${venue.description}</p>
                                <p class="description">Starting time: ${venue.startingHour}</p>
                            </div>
                        `;
                        $btn.on("click", showInfo);
                        $span.append($btn);
                        $div.append($span).append($divNext);
                        $("#venue-info").append($div);
                        let $input = $(`#${venue._id} input[value="Purchase"]`);

                        $input.on('click', buyTickets)

                    } catch (error) {
                        console.log(error)
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

   async function showInfo(event) {
        $('.venue-details').css('display', 'none')
        $(event.target).parent().parent().find('div').css('display', 'block')
    }

    function buyTickets(event) {
        let $parent = $(event.target).parent().parent().parent().parent().parent().parent();
        let price = +$parent.find(`.venue-price`).text().split(' ')[0];

        currQuantity = +$parent.find(`select option:selected`).text();
        currName = $parent.find('.venue-name').text();
        currId = $parent.attr("id");
        currTotalPrice = currQuantity * price;
        currDateTime = $parent.find('p').last().text().split(': ')[1];

        let $span = $('<span class="head">Confirm purchase</span>');
        let $div = $(`<div class="purchase-info"> </div>`);
        let $span1 = $(`<span>${currName}</span>`);
        let $span2 = $(`<span>${currQuantity} x ${price}</span>`);
        let $span3 = $(`<span>Total: ${currTotalPrice} lv</span>`);
        let $input = $('<input type="button" value="Confirm"></input>');
        $input.on('click', confirm);
        $($div).append($span1).append($span2).append($span3).append($input);

        let $venueInfo = $parent.parent();
        $venueInfo.empty();
        $venueInfo.append($span).append($div);
    }

    async function confirm() {
        let response = await $.ajax({
            method: "POST",
            url: baseUrl + "rpc/" + appKey + "/" + endPoint + "/" + `purchase?venue=${currId}&qty=${currQuantity} `,
            headers
        })

        let node = document.createTextNode(`You may print this page as your ticket`);
        let div = `
            <br>
            <div class="ticket">
                <div class="left">
                    <span class="head">Venuemaster</span>
                    <span class="venue-name">${currName}</span>
                    <span class="bl">${currDateTime}</span>
                    <br>
                    <span class="bl">Admit ${currQuantity}</span>
                    <span class="bl">${currTotalPrice} lv</span>
                </div>
                <div class="right">
                    <span>Venue code</span>
                    <br>
                    <span>${currId}</span>
                    <span class="head">Venuemaster</span>
                </div>
            </div>
        `;
  
        $("#venue-info").empty();
        $("#venue-info").append(node).append(div);
    }

}