function attachEvents() {
    let $title = $('#post-title');
    let $body = $('#post-body');
    let $comments = $('#post-comments');
    let $posts = $('#posts');

    let appKey = "kid_SyQmaDt_V";
    let authToken = "bd846f07-a6f9-433f-b0d2-ffe9bc75770b.MEOZCLz9xWMzVB7Ub7UsdDGBapwgX5+P728l8Emqfds=";
    let baseUrl = "https://baas.kinvey.com/appdata/kid_SyQmaDt_V/posts";


    const authHeaders = {
        "Authorization": `Kinvey ${authToken}`,
        "Content-Type": "application/json"
    }
    $('#btnLoadPosts').on('click', () => {
        $.get({
            url: baseUrl,
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
        let $currPost = $posts.find(':selected');
        
        $.get({
            url: baseUrl + '/' + `${$currPost.val()}`,
            headers: authHeaders
        })
            .then((singlePost) => {
                $title.text(`${singlePost.title}`);
                $body.text(`${singlePost.body}`);
            })
            .catch(err => {
                console.log(err);
            })
    })

}