function attachEvents() {
    let $title = $('#post-title');
    let $body = $('#post-body');
    let $comments = $('#post-comments');
    let $posts = $('#posts');

    const appKey = "kid_SyQmaDt_V";
    const appSecret = "bd994394508f404cb9114064a6ccac24";
    const kinveyUser = "guest";
    const kinveyPass = "guest";
    const base64auth = btoa(`${kinveyUser}:${kinveyPass}`);
    const baseUrl = "https://baas.kinvey.com/appdata/kid_SyQmaDt_V/";
    const authHeaders = {
        "Authorization": `Basic ${base64auth}`,
        "Content-Type": "application/json"
    }
    // const authToken = "bd846f07-a6f9-433f-b0d2-ffe9bc75770b.MEOZCLz9xWMzVB7Ub7UsdDGBapwgX5+P728l8Emqfds=";
    // const authHeaders = {
    //     "Authorization": `Kinvey ${authToken}`,
    //     "Content-Type": "application/json"
    // }

    $('#btnLoadPosts').on('click', () => {
        $.get({
            url: baseUrl + "posts",
            headers: authHeaders,
        })
            .then((allPosts) => {
                allPosts.forEach(post => {
                    $posts.append(`<option value="${post._id}">${post.title}</option>`)
                });
            })
            .catch(err => {
                console.log(err);
            })
    })

    $('#btnViewPost').on('click', () => {
        let postId = $posts.find(':selected').val();

        let postRequest = $.get({
            url: baseUrl + "posts" + '/' + `${postId}`,
            headers: authHeaders
        });

        let postCommentsRequest = $.get({
            url: baseUrl + `comments/?query={"post_id":"${postId}"}`,
            headers: authHeaders
        });
        Promise.all([postRequest, postCommentsRequest])
            .then(([post, postComments]) => {
                $title.text(`${post.title}`);
                $body.text(`${post.body}`);
                $comments.empty();
                postComments.forEach(post => {
                    $comments.append(`<li>${post.text}</li>`)
                });
            })
            .catch(err => {
                console.log(err);
            })
    })

}