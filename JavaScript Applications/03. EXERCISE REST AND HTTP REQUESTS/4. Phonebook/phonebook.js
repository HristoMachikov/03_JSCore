function attachEvents() {

    $('#btnLoad').click(loadPhones);
    $('#btnCreate').on('click', createPhone);

    let baseUrl = "https://phonebook-8ce7e.firebaseio.com/phonebook";
    let $phonebook = $('#phonebook');

    function loadPhones() {

        $phonebook.empty();
        $.ajax({
            method: 'GET',
            url: baseUrl + ".json",
            success: displayPhones,
            error: displayError
        })
    }

    function displayPhones(req) {
        for (let [key, value] of Object.entries(req)) {
            $phonebook.append(createLiElem(key, value.person, value.phone))
        }
    }

    function displayError(err) {

        if (err.readyState == 4 && err.status >= 400 && err.status < 500) {
            $phonebook.append($(`<li>Error</li>`))
        }
    }


    function createLiElem(id, person, phone) {
        let $li = $(`<li>${person}: ${phone}</li>`);
        let $btnDel = $(`<button id="${id}">Delete</button>`)
        $btnDel.on('click', deleteContact)
        $li.append($btnDel);
        return $li;
    }

    function deleteContact(event) {
        let currId = event.target.id;
        $.ajax({
            method: "DELETE",
            url: baseUrl + "/" + currId + ".json",
            success: deleteContactSuccess,
            error: (data) => console.log(data)
        })

    }
    function deleteContactSuccess() {
        loadPhones();
    }

    function createPhone() {
        let $newPerson = $('#person');
        let $newPhone = $('#phone');

        let newContact = {
            "person": $newPerson.val(),
            "phone": $newPhone.val()
        }
        $.ajax({
            method: "POST",
            url: baseUrl + ".json",
            data: JSON.stringify(newContact),
            success: createPhoneSuccess
        })
        $newPerson.val("");
        $newPhone.val("");
    }

    function createPhoneSuccess() {
        loadPhones();
    }
}