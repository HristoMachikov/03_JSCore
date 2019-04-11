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
    let { username, password } = ctx.params;
    if (!username || username.length < 3) {
        notifications.showError("Username must be at least 3 symbols")
        return;
    }
    if (!password || password.length < 6) {
        notifications.showError("Password must be at least 6 symbols")
        return;
    }
    userService.login(username, password)
        .then(function (res) {
            userService.saveSession(res);
            notifications.showSuccess('Login successful.');
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
    let { username, password } = ctx.params;
    if (!username || username.length < 3) {
        notifications.showError("Username must be at least 3 symbols")
        return;
    }
    if (!password || password.length < 6) {
        notifications.showError("Password must be at least 6 symbols")
        return;
    }
    userService.register(username, password)
        .then(function (res) {
            userService.saveSession(res);
            notifications.showSuccess('User registration successful.')
            ctx.redirect('#/home');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.logoutUser = function (ctx) {
    userService.logout()
        .then(function () {
            sessionStorage.clear();
            notifications.showSuccess('Logout successful.');
            ctx.redirect('#/home');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}