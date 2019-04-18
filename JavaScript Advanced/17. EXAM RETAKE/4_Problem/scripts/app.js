const result = (() => {
    $('#create-offers').css("display", "none");
    $('#usernameContainer button').on('click', loginOrLogout);
    $('#create-offer-Btn').on('click', createOffer);
    function loginOrLogout(event) {
        event.preventDefault();
        let $action = $(event.target);
        let $userName = $('#username');

        switch ($action.text()) {
            case "Login":

                if ($('#username').val().length >= 4 && $('#username').val().length <= 10) {
                    $action.text("Logout")
                    $('#create-offers').css("display", "block");
                    $userName.val(`Hello, ${$userName.val()}!`);
                    $('#username').addClass('border-0 bg-light')
                    $('#username').attr('disabled', true);
                    $('#notification').text('');
                    $('#offers-container>div').css('display', "block")
                } else {
                    $('#notification').text('The username length should be between 4 and 10 characters.');
                }
                break;

            case "Logout":
                $('#offers-container>div').slice(3).css('display', "none")
                $('#notification').text('');
                $userName.val('');
                $action.text("Login")
                $('#username').removeClass(['border-0 bg-light'])
                $('#company').val("");
                $('#offerName').val("");
                $('#description').val("");
                $('#username').attr('disabled', false)
                $('#create-offers').css("display", "none");
                break;
            default:
                break;
        }
    }

    function createOffer(event) {
        event.preventDefault();
        let $offerName = $('#offerName');
        let $company = $('#company');
        let $description = $('#description');
        if ($offerName.val() && $company.val() && $description.val()) {
            let elem = $(`
            <div class="col-3">
                <div class="card text-white bg-dark mb-3 pb-3" style="max-width: 18rem;">
                    <div class="card-header">${$offerName.val()}</div>
                    <div class="card-body">
                        <h5 class="card-title">${$company.val()}</h5>
                        <p class="card-text">${$description.val()}</p>
                    </div>
                </div>
            </div>
`)
            $('#offers-container').append(elem);
        }
        $offerName.val("");
        $company.val("");
        $description.val("");
    }

})();