handlers.getHome = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
    ctx.firstName = sessionStorage.getItem('firstName');
    ctx.lastName = sessionStorage.getItem('lastName');

    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/home.hbs')
    }).catch(function (err) {
        notifications.handleError(err);
    });
}