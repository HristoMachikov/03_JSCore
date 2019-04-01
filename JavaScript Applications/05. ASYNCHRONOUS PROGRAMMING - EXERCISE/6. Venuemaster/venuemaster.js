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
    let currQuantity = 0;

    //  $(".purchase").on('click', purchase)
    $('#getVenues').on('click', getVenues)

    async function getVenues() {
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

    function showInfo(event) {
        $(event.target).parent().parent().find('div').css('display', 'block')
    }

    function buyTickets(event) {
        let $parent = $(event.target).parent().parent().parent().parent().parent().parent();
        let quantity = +$parent.find(`select option:selected`).text()
        let price = +$parent.find(`.venue-price`).text().split(' ')[0];
        let name = $parent.find('.venue-name').text();

        currId = $parent.id;
        currQuantity = quantity;

        let $span = $('<span class="head">Confirm purchase</span>');
        let $div = $(`<div class="purchase-info"> </div>`);
        let $span1 = $(`<span>${name}</span>`);
        let $span2 = $(`<span>${quantity} x ${price}</span>`);
        let $span3 = $(`<span>Total: ${quantity * price} lv</span>`);
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
        $("#venue-info").empty();
        let info = document.getElementById("venue-info");
        let node = document.createTextNode("You may print this page as your ticket");
        let p = document.createElement("p");
        p.appendChild(node);
        info.appendChild(p);
        console.log(response)
        console.log(response.html)
        let $div = response.html;
        $("#venue-info").append($div);
        //info.appendChild(response.html);
        //$("#venue-info").append($(p));
    }

}
