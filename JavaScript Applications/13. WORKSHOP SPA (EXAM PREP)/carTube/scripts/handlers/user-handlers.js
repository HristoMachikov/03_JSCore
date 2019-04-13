handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/login.hbs')
    }).catch(function (err) {
        notifications.handleError(err);
    })
}

handlers.loginUser = function (ctx) {
    let { username, password } = ctx.params;
    if (!/^[a-z]{3,}$/ig.test(username)) {
        notifications.showError('A username should be at least 3 characters long and should contain only english alphabet letters!');
        return;
    }
    if (!/^[a-z0-9]{6,}$/ig.test(password)) {
        notifications.showError('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits!');
        return;
    }
    userService.login(username, password)
        .then(function (res) {
            userService.saveSession(res);
            notifications.showSuccess('Login successful.');
            ctx.redirect('#/allListings');
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
        notifications.handleError(err);
    })
}

handlers.registerUser = function (ctx) {
    let { username, password, repeatPass } = ctx.params;

    if (!/^[a-z]{3,}$/ig.test(username)) {
        notifications.showError('A username should be at least 3 characters long and should contain only english alphabet letters!');
        return;
    }
    if (!/^[a-z0-9]{6,}$/ig.test(password)) {
        notifications.showError('A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits!');
        return;
    }
    if (password !== repeatPass) {
        notifications.showError('Password have to be same like Repeat Password!');
        return;
    }

    userService.register(username, password)
        .then(function (res) {
            userService.saveSession(res);
            notifications.showSuccess('User registration successful.')
            ctx.redirect('#/allListings');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.logoutUser = function (ctx) {
    userService.logout()
        .then(function () {
            sessionStorage.clear();
            notifications.showSuccess('Logout successful.');
            ctx.redirect('#/');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}