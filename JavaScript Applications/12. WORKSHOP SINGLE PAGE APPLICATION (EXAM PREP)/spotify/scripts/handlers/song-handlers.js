handlers.getSong = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

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
            ctx.redirect('#/allSongs');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getAllSongs = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let result = await kinvey.get('appdata', 'songs?query={}&sort={"listened": -1}', 'kinvey');
    //?query={}&sort={"listened": -1}
    result.forEach(song => song.isCreator = song._acl.creator === sessionStorage.getItem('userId'))
    ctx.songs = result;

    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs",
        song: "../templates/songPartial.hbs"
    }).then(function () {
        this.partial('../templates/showAllSongs.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.getMySongs = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem('userId');
    let result = await kinvey.get('appdata', `songs?query={"_acl.creator":"${userId}"}`, 'kinvey');
    // let result = await kinvey.get('appdata', `songs`, 'kinvey');
    // let mysongs = result.filter(song => song._acl.creator === userId);
    result.forEach(song => song.isCreator = song._acl.creator === userId);
    ctx.songs = result;

    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs",
        song: "../templates/songPartial.hbs"
    }).then(function () {
        this.partial('../templates/showMySongs.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.removeSong = function (ctx) {
    let songId = ctx.params.id;
    songService.remove(songId).then(function (res) {
        notifications.showSuccess('Song removed successfully!');
        ctx.redirect('#/allSongs');
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.listenSong = async function (ctx) {
    let songId = ctx.params.id;
    let result = await kinvey.get('appdata', `songs/${songId}`, 'kinvey')
    let updateListened = +result.listened + 1;
    result.listened = updateListened;
    songService.listen(songId, result);
    notifications.showSuccess(`You just listened ${result.title}`);
    this.redirect('#/allSongs');
}

handlers.likeSong = async function (ctx) {
    let songId = ctx.params.id;
    let result = await kinvey.get('appdata', `songs/${songId}`, 'kinvey')
    let updateLikes = +result.likes + 1;
    result.likes = updateLikes;
    songService.like(songId, result);
    notifications.showSuccess('Liked!');
    this.redirect('#/allSongs');
}