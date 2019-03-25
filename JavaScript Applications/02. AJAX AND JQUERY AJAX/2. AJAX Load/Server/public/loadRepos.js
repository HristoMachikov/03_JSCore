function loadRepos() {
    let $username = $("#username");
    let $repos = $("#repos");
    $repos.empty();
    let url = "https://api.github.com/users/" + $username.val() + "/repos";
    $.ajax({
        method: 'GET',
        url,
        success: displayRepo,
        error: displayError
    })

    function displayRepo(req) {
        req.forEach(repo => {
            $repos.append(createLiElem(repo.html_url, repo.full_name))
        });
    }

    function displayError(err) {
        if (err.readyState == 4 && err.status >= 400 && err.status < 500) {
            $repos.append($(`<li>Error</li>`))
            // $repos.append($(`<li>${err.responseText}</li>`))
        }
    }

    function createLiElem(url, name) {
        let $li = $("<li>");
        let $a = $(`<a href='${url}'>${name}</a>`);
        $li.append($a);
        return $li;
    }

}