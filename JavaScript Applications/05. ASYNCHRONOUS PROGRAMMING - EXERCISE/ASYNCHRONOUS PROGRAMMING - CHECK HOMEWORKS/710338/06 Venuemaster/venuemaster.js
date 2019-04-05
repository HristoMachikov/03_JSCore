function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appId = 'kid_BJ_Ke8hZg';
    const username = 'guest';
    const password = 'pass';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }

    $('#getVenues').on('click', getVenues);

    async function getVenues() {
        let venueDate = $('#venueDate').val();
        try {
            let venues = await $.ajax({
                url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${venueDate}`,
                method: 'POST',
                headers
            })
            loadVenues(venues);
        } catch (err) {
            console.log(err)
        }
    }

    async function loadVenues(venues) {
        for (let venue of venues) {
            let singleVenue = await $.ajax({
                url: baseUrl + `appdata/kid_BJ_Ke8hZg/venues/${venue}`,
                method: 'GET',
                headers
            })

            $('#venue-info').append(`
            <div class="venue" id="${singleVenue._id}">
                <span class="venue-name"><input class="info" type="button" value="More info">${singleVenue.name}</span>
                <div class="venue-details" style="display: none;">
                    <table>
                        <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                        <tr>
                            <td class="venue-price">${singleVenue.price} lv</td>
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
                    <p class="description">${singleVenue.description}</p>
                    <p class="description">Starting time: ${singleVenue.startingHour}</p>
                </div>
            </div>
            `)
        }
        $('.venue-name input').on('click', moreInfo);
        $('input.purchase').on('click', purchaseClick);
    }

    function moreInfo() {
        $('.venue-details').slideUp();
        $(this).parent().siblings('.venue-details').slideDown();
    }

    function purchaseClick() {
        let price = $(this).parent().parent().find('.venue-price').text().split(' lv')[0];
        let qty = $(this).parent().parent().find('.quantity').val();
        let id = $(this).parent().parent().parent().parent().parent().parent().attr('id');
        let name = $(this).parent().parent().parent().parent().parent().parent().find('.venue-name').text();
        
        $('#venue-info').empty().append(`
        <span class="head">Confirm purchase</span>
        <div class="purchase-info">
            <span>${name}</span>
            <span>${qty} x ${price}</span>
            <span>Total: ${qty * price} lv</span>
            <input type="button" value="Confirm">
        </div>
        `);

        $('.purchase-info input').click(function() {
            confirmPurchase(id, qty)
        })
    }

    async function confirmPurchase(id, qty) {
        try {
            let purchased = await $.ajax({
                url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${qty} `,
                method: 'POST',
                headers
            });

            $('#venue-info').text('You may print this page as your ticket');
            console.log(purchased)
            $('#venue-info').append(purchased.html);
            
        } catch (err) {
            console.log(err)
        }
    }
}