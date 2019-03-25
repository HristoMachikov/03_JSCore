(function () {

    //$('#btnLoad').on('click', loadPhones);
    //$('#btnCreate').on('click', createPhone);

    function loadPhones() {
        let $phonebook = $('#phonebook');
      //  $phonebook.empty();
        let url = "https://phonebook-nakov.firebaseio.com/phonebook";

        $.ajax = ({
            method: 'GET',
            url: url +".json",
            success: (data)=> console.log(data),
            error: displayError
        })
        //console.log("Load")

        function displayPhones(req) {
            console.log(req)
            req.forEach(repo => {
                $phonebook.append(createLiElem(repo.html_url, repo.full_name))
            });
        }

        function displayError(err) {
            if (err.readyState == 4 && err.status >= 400 && err.status < 500) {
                $phonebook.append($(`<li>Error</li>`))
                // $repos.append($(`<li>${err.responseText}</li>`))
            }
        }

        function createLiElem( url, name) {
            let $li = $("<li>");
           // $li.id = id;
            let $a = $(`<a href='${url}'>${name}</a>`);
            $li.append($a);
            return $li;
        }
    }

    function createPhone() {
        console.log("Create")
    }

})();