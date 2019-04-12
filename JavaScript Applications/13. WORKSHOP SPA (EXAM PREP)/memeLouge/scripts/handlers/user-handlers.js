handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/login.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.loginUser = function (ctx) {
    //IF
    let { username, password } = ctx.params;
    userService.login(username, password)
        .then(function (res) {
            userService.saveSession(res);
            notifications.showSuccess('You are successfully logged in');
            ctx.redirect('#/home');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getRegister = function (ctx) {
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/register.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.registerUser = function (ctx) {
    let { username, password, repeatPass } = ctx.params;
    //elseIf
    if (password === repeatPass) {
        userService.register(username, password)
            .then(function (res) {
                userService.saveSession(res);
                notifications.showSuccess('You have successfull registration')
                ctx.redirect('#/home');
            }).catch(function (err) {
                notifications.handleError(err);
            })
    } else {
        notifications.showError('Password have to be same like Repeat Password!');
    }
}

handlers.logoutUser = function (ctx) {
    userService.logout()
        .then(function () {
            sessionStorage.clear();
            notifications.showSuccess('You have successfull logout');
            ctx.redirect('#/');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}