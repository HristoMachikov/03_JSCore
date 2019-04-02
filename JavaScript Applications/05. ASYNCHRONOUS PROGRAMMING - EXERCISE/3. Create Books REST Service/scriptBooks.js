function solve() {

    const baseUrl = "https://baas.kinvey.com/appdata/";
    const appKey = "kid_B1J5N3gF4";
    const endPoint = "books";
    const baseUser = "guest";
    const basePass = "guest";
    const authoBase64 = btoa(baseUser + ":" + basePass);
    const headers = {
        "Authorization": `Basic ${authoBase64}`,
        "Content-Type": "application/json"
    }

    let currTitle = "";
    let currBookId = "";
    let currTags = "";
    let currTagIndex = "";

    $('#listBooks').on('click', listBooks)
    $('#books').find('button[value="create"]').on("click", createBook)
    $('#books').find('button[value="edit"]').on("click", editBook)
    $('#books').find('button[value="delete"]').on("click", deleteBook)

    async function showInTheInput(event) {
        event.stopPropagation()
        let currElem = event.target.tagName;
        if (currElem === "UL") {
            currTitle = event.target.textContent;
            currBookId = event.target.id;

            try {
                let request = await $.ajax({
                    method: "GET",
                    url: baseUrl + appKey + "/" + endPoint + "/" + currBookId,
                    headers
                })

                $('#title').val(`${request.title}`)
                $('#author').val(`${request.author}`)
                $('#isbn').val(`${request.isbn}`)

                $('#books').find('li').remove();
                let $currUl = $(`#${request._id}`)
                currTags = request.tags;
                currTags.forEach(tag => {
                    let $li = $(`<li>${tag}</li>`);
                    $li.on('click', showInTheInput)
                    $currUl.append($li);
                });
                $('#tag').val("")
                $('#tag').css("display", "block");
                $('#books label[for="tag"]').css("display", "block");

            } catch (error) {
                console.log(error)
            }

        } else if (currElem === "LI") {
            $('#tag').css("display", "block");
            $('#books label[for="tag"]').css("display", "block");

            let currTag = event.target.textContent;
            currTags = currTags.map(x => "" + x);
            currTagIndex = currTags.indexOf(currTag);
            $('#tag').val(`${currTag}`)
        }
    }

    async function listBooks() {
        try {
            $('#books').find('ul').remove();
            $('#tag').css("display", "none");
            $('#books label[for="tag"]').css("display", "none");

            let request = await $.ajax({
                method: "GET",
                url: baseUrl + appKey + "/" + endPoint,
                headers
            })
            request.forEach(function (obj) {
                let $ul = $(`
                    <ul id="${obj._id}">${obj.title}</ul>
                `);
                $ul.on('click', showInTheInput)
               // $('#books').append($ul);
                $ul.insertBefore('#books label[for="title"]')
            });
        } catch (error) {
            console.log(error)
        }
    }

    async function createBook() {

        let title = $('#title').val();
        let author = $('#author').val();
        let isbn = $('#isbn').val();
        let tag = $('#tag').val();

        if (tag) {
            currTags.push(tag);
            $('#tag').val("");
            editBook()
        } else {
            let currObj = { title, author, isbn, "tags": [] }
            try {
                let response = await $.ajax({
                    method: "POST",
                    url: baseUrl + appKey + "/" + endPoint,
                    headers,
                    data: JSON.stringify(currObj)
                })
                resetBooks()
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function editBook() {
        let title = $('#title').val();
        let author = $('#author').val();
        let isbn = $('#isbn').val();
        let tag = $('#tag').val();
        if (tag) {
            currTags[currTagIndex] = tag;
        }
        if (title && author && isbn) {
            let currObj = { title, author, isbn, "tags": currTags }

            try {
                let response = await $.ajax({
                    method: "PUT",
                    url: baseUrl + appKey + "/" + endPoint + '/' + currBookId,
                    headers,
                    data: JSON.stringify(currObj)
                })
                resetBooks()
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function deleteBook() {
        let tag = $('#tag').val();
        if (tag) {
            currTags = currTags.filter(x => x !== tag)
            $('#tag').val("");
            editBook()
        } else {
            try {
                let response = await $.ajax({
                    method: "DELETE",
                    url: baseUrl + appKey + "/" + endPoint + '/' + currBookId,
                    headers
                })
                resetBooks()
            } catch (error) {
                console.log(error)
            }
        }
    }

    function resetBooks() {
        listBooks();
        $('#books input').val("")
        currBookId = "";
    }

}