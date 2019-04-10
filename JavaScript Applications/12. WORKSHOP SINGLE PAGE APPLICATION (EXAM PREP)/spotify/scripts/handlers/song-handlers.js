handlers.getSong = function (ctx) {
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/song.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.createSong = function (ctx) {
    //IF
    let { title, artist, imageURL } = ctx.params;
    songService.create(title, artist, imageURL)
        .then(function (res) {
            notifications.showSuccess('You created new song successfully');
            ctx.redirect('#/home');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}