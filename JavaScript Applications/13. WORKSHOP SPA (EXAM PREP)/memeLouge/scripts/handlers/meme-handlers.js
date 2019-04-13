handlers.allMemes = async function (ctx) {
    try {
        ctx.isAuth = userService.isAuth();
        ctx.username = sessionStorage.getItem('username');
        let res = await memeService.getAllMemes();
        res.forEach(meme => meme.isCreator = meme._acl.creator === sessionStorage.getItem('userId'));
        ctx.memes = res;
        ctx.loadPartials({
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs",
            meme: "../templates/meme/singleMeme.hbs"
        }).then(function () {
            this.partial("../templates/meme/meme-feed.hbs")
        })
    } catch (err) {
        notifications.handleError(err)
        ctx.redirect('#/');
    }

}


handlers.getMemeDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let id = ctx.params.id
    try {
        let res = await memeService.getMeme(id);
        let {title, description, imageUrl, creator} = res[0];
        let userCreator = res[0]._acl.creator;
        ctx.userCreator = userCreator;
        ctx.title = title;
        ctx.description = description;
        ctx.imageUrl = imageUrl;
        ctx.creator = creator;
        ctx._id = id;
        ctx.isCreator = userCreator === sessionStorage.getItem('userId');
        ctx.loadPartials({
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs"
        }).then(function () {
            this.partial("../templates/meme/meme-details.hbs")
        })
    } catch (err) {
        notifications.showError(err)
    }
}

handlers.getUserDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem('userId');
    let isCreator = ctx.params.userId === userId;
    ctx.isCreator = isCreator;
    if (isCreator) {
        ctx.currUsername = ctx.username;
        ctx.email = sessionStorage.getItem('email');
        ctx.avatarUrl = sessionStorage.getItem('avatarUrl');
        ctx.userId = userId;
    } else {
        userService.getUser(ctx.params.userId)
            .then(function (res) {
                ctx.currUsername = res.username;
                ctx.email = res.email;
                ctx.avatarUrl = res.avatarUrl;
            })
            .catch(function (err) {
                notifications.handleError(err);
                ctx.redirect('#/home');
            })
    }
    let res = await memeService.getUserMeme(ctx.params.userId)
    // .then(function (res) {
    let isCurrCreator = ctx.isCreator;
    res.forEach(meme => meme.isCurrCreator = isCurrCreator);
    ctx.memes = res;
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs",
        meme: "../templates/meme/meme.hbs"
    })
        .then(function () {
            this.partial("../templates/user-profile.hbs")
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
    // })
    // .catch(function (err) {
    //     notifications.handleError(err);
    // })
}

handlers.getCreateMeme = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../templates/meme/create-meme.hbs')
    }).catch(function (err) {
        notifications.handleError(err);
        ctx.redirect('#/home');
    })
}

handlers.createMeme = function (ctx) {
    let {title, description, imageUrl} = ctx.params;
    if (!title || title.length > 33) {
        notifications.showError('The title length must not exceed 33 characters!');
        return;
    }
    if (description.length < 30 || description.length > 450) {
        notifications.showError('The description length must not exceed 450 characters and should be at least 30!');
        return;
    }
    //if(/^http/.test(imageUrl))
    if (!imageUrl.startsWith("http")) {
        notifications.showError('Link url should always start with "http".');
        return;
    }
    if (!title || !description || !imageUrl) {
        notifications.showError('You have empty input field!');
        return;
    }

    let data = { title, description, imageUrl };
    // let data = { ...ctx.params };
    data.creator = sessionStorage.getItem('username');
    memeService.createMeme(data)
        .then(function (res) {
            notifications.showSuccess('meme created.');
            ctx.redirect('#/home')
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getEditMeme = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    memeService.getMeme(ctx.params.id)
        .then(function (res) {
            let { title, description, imageUrl, _id } = res[0];
            ctx.title = title;
            ctx.description = description;
            ctx.imageUrl = imageUrl;
            ctx._id = _id;
            ctx.loadPartials({
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs'
            }).then(function () {
                this.partial('../templates/meme/edit-meme.hbs')
            }).catch(function (err) {
                notifications.handleError(err);
                ctx.redirect('#/home');
            })
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.editMeme = function (ctx) {
    let {title, description, imageUrl} = ctx.params;
    if (!title || title.length > 33) {
        notifications.showError('The title length must not exceed 33 characters!');
        return;
    }
    if (description.length < 30 || description.length > 450) {
        notifications.showError('The description length must not exceed 450 characters and should be at least 30!');
        return;
    }
    //if(/^http/.test(imageUrl))
    if (!imageUrl.startsWith("http")) {
        notifications.showError('Link url should always start with "http".');
        return;
    }
    if (!title || !description || !imageUrl) {
        notifications.showError('You have empty input field!');
        return;
    }

    let data = { title, description, imageUrl };
    // let data = { ...ctx.params };
    data.creator = sessionStorage.getItem('username');
    let id = ctx.params.id;
    memeService.editMeme(id, data)
        .then(function (res) {
            notifications.showSuccess(`Meme ${title} updated.`);
            ctx.redirect('#/home')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.removeMeme = function (ctx) {
    memeService.removeMeme(ctx.params.id)
        .then(function (res) {
            notifications.showSuccess(`Meme deleted.`);
            ctx.redirect('#/home')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}