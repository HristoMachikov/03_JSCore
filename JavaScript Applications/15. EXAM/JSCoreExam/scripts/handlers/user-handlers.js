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

    if (!username || username.length < 3) {
        notifications.showError("The username should be at least 3 characters long!")
        return;
    }
    if (!password || password.length < 6) {
        notifications.showError("The password should be at least 6 characters long!")
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
        notifications.handleError(err);
    })
}

handlers.registerUser = function (ctx) {
    let { username, password, rePassword } = ctx.params;

    if (!username || username.length < 3) {
        notifications.showError("The username should be at least 3 characters long!")
        return;
    }
    if (!password || password.length < 6) {
        notifications.showError("The password should be at least 6 characters long!")
        return;
    }
    if (password !== rePassword) {
        notifications.showError('The repeat password should be equal to the password!');
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