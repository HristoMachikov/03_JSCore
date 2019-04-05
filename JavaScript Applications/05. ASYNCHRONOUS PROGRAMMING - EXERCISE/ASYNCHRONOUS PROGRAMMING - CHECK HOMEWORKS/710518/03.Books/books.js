const baseUrl = "https://baas.kinvey.com/appdata/kid_H1_77AJYN/Books";

function attachEvents() {
    loadBooks();
    $("button#addBtn").click(addBook);
}

function loadBooks() {
    $("ul#books").empty();
    $.ajax({
        method: "GET",
        url: baseUrl,
        headers: {
            "Authorization": "Basic " + btoa("guest:guest")
        },
        success: loadBooksOnSuccess
    });

    function loadBooksOnSuccess(data) {
        let books = $("ul#books");
        data.map(book => {
            let liElement = $(`<li>${book.author} - ${book.title}, ISBN: ${book.isbn}</li>`);
            let updateButton = $("<button>Update</button>");
            updateButton.click(() => {
                liElement.empty();
                liElement.append($('<label>Author</label>' +
                    `<input type="text" id="newAuthor" value="${book.author}"/>` +
                    '<label>Title</label>' +
                    `<input type="text" id="newTitle" value="${book.title}"/>` +
                    '<label>ISBN</label>' +
                    `<input type="text" id="newIsbn" value="${book.isbn}"/>`
                ));
                let confirmButton = $('<button id="addBtn">Confirm</button>');
                confirmButton.click(() => {
                    let newAuthor = $("#newAuthor").val();
                    let newTitle = $("#newTitle").val();
                    let newISBN = $("#newIsbn").val();

                    let newBook = {
                        author: newAuthor,
                        title: newTitle,
                        isbn: newISBN
                    };

                    $.ajax({
                        method: "PUT",
                        url: baseUrl + "/" + book._id,
                        headers: {
                            "Authorization": "Basic " + btoa("guest:guest"),
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(newBook)
                    }).then(loadBooks);
                });
                liElement.append(confirmButton);
            });
            let deleteButton = $("<button>Delete</button>");
            deleteButton.click(() => {
                $.ajax({
                    method: "DELETE",
                    url: baseUrl + "/" + book._id,
                    headers: {
                        "Authorization": "Basic " + btoa("guest:guest"),
                        "Content-Type": "application/json"
                    }
                }).then(loadBooks);
            });
            liElement.append(updateButton);
            liElement.append(deleteButton);
            books.append(liElement);
        });
    }
}

function addBook() {
    let author = $("#author").val();
    $("#author").val("");
    let title = $("#title").val();
    $("#title").val("");
    let isbn = $("#isbn").val();
    $("#isbn").val("");

    let newBook = {
        author,
        title,
        isbn
    };

    $.ajax({
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa("guest:guest"),
            "Content-Type": "application/json"
        },
        url: baseUrl,
        data: JSON.stringify(newBook)
    }).then(
        loadBooks
    );
}