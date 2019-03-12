function makeReservation(container) {
    let $fullName = $('#fullName');
    let $email = $('#email');
    let $phoneNumber = $('#phoneNumber');
    let $address = $('#address');
    let $postalCode = $('#postalCode');

    let $infoPreview = $('#infoPreview');
    let $container = $(container);
    let $wrapper = $('#wrapper');

    $('#submit').on('click', previewInfo);
    $('#edit').on('click', editInfo);
    $('#continue').on('click', continueInfo);

    function previewInfo() {
        if ($fullName.val() && $email.val()) {
            let $liName = $(`<li>Name: ${$fullName.val()}</li>`);
            let $liMail = $(`<li>E-mail: ${$email.val()}</li>`);
            let $liPho = $(`<li>Phone: ${$phoneNumber.val()}</li>`);
            let $liAdd = $(`<li>Address: ${$address.val()}</li>`);
            let $liPos = $(`<li>Postal Code: ${$postalCode.val()}</li>`);
            $infoPreview.append($liName).append($liMail).append($liPho).append($liAdd).append($liPos);
            $('#submit').attr('disabled', true);
            $('#edit').attr('disabled', false);
            $('#continue').attr('disabled', false);
        }
        reset();
    }

    function editInfo() {
        $fullName.val($infoPreview.children().eq(0).text().split(': ')[1]);
        $email.val($infoPreview.children().eq(1).text().split(': ')[1]);
        $phoneNumber.val($infoPreview.children().eq(2).text().split(': ')[1]);
        $address.val($infoPreview.children().eq(3).text().split(': ')[1]);
        $postalCode.val($infoPreview.children().eq(4).text().split(': ')[1]);
        $infoPreview.empty();
        $('#submit').attr('disabled', false);
        $('#edit').attr('disabled', true);
        $('#continue').attr('disabled', true);
    }

    function continueInfo() {
        $('#submit').attr('disabled', true);
        $('#edit').attr('disabled', true);
        $('#continue').attr('disabled', true);

        let $select = $('<select>');
        $select.attr({ id: "paymentOptions", class: "custom-select" });
        $select.on('change', extraDetails);
        let $optOne = $('<option selected disabled hidden>Choose</option>');
        let $optTwo = $('<option value="creditCard">Credit Card</option>');
        let $optThree = $('<option value="bankTransfer">Bank Transfer</option>');
        $select.append($optOne).append($optTwo).append($optThree);
        let $div = $('<div id="extraDetails"></div>');
        $container.append($('<h2>Payment details</h2>'));
        $container.append($select).append($div);
    }
    function extraDetails(event) {
        //let howToPay = event.target.options[event.target.selectedIndex].value;
        let $howToPay = $(event.target).find(':selected');
        let $extraDetails = $('#extraDetails');
        $extraDetails.empty();
        switch ($howToPay.val()) {
            case "creditCard":
                $extraDetails.append(createDiv("Card Number")).append($('<br>'));
                $extraDetails.append(createDiv("Expiration Date")).append($('<br>'));
                $extraDetails.append(createDiv("Security Numbers")).append($('<br>'));
                break;
            case "bankTransfer":
                let p = document.createElement('p');
                let firstTextNodeElem = document.createTextNode('You have 48 hours to transfer the amount to:');
                let secondTextNodeElem = document.createTextNode('IBAN: GR96 0810 0010 0000 0123 4567 890');
                let br = document.createElement('br');
                p.appendChild(firstTextNodeElem);
                p.appendChild(br);
                p.appendChild(secondTextNodeElem);
                $extraDetails.append($(p));
                break;
            default:
                break;
        }
        let $btn = $('<button id="checkOut">Check Out</button>');
        $btn.on('click', finishReservation);
        $extraDetails.append($btn);
    }

    function finishReservation() {
        $wrapper.empty();
        $wrapper.append($('<h4>Thank you for your reservation!</h4>'))
    }

    function createDiv(name) {
        let $div = $(`<div class="inputLabel">${name}<input></div><br>`);
        return $div;
    }

    function reset() {
        $fullName.val("");
        $email.val("");
        $phoneNumber.val("");
        $address.val("");
        $postalCode.val("");
    }

}