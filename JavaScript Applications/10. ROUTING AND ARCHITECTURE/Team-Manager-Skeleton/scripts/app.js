$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.get("#/home", function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');
            this.hasTeam = !!sessionStorage.getItem('hasTeam');
            this.teamId = !!sessionStorage.getItem('teamId');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function (context) {
                    this.partial("./templates/home/home.hbs")
                })
        })

        this.get("#/about", function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            })
                .then(function (context) {
                    this.partial("./templates/about/about.hbs")
                })
        })

        this.get("#/login", function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            })
                .then(function (context) {
                    this.partial("./templates/login/loginPage.hbs")
                })
        })

        this.get("#/register", function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            })
                .then(function (context) {
                    this.partial("./templates/register/registerPage.hbs")
                })
        })

        this.get("#/logout", function () {
            let that = this;
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Successfull logout!")
                    that.redirect("#/home")
                })
        })

        this.post("#/register", function (e) {
            let that = this;
            let { username, password, repeatPassword } = e.params;

            auth.register(username, password, repeatPassword)
                .then(function (res) {
                    auth.saveSession(res)
                    auth.showInfo("Successfully registered!")
                    that.redirect('#/home')
                })
                .catch(function (err) {
                    auth.handleError(err)
                })
        })

        this.post("#/login", function (e) {
            let that = this;
            let { username, password } = e.params;

            auth.login(username, password)
                .then(function (res) {
                    auth.saveSession(res)
                    auth.showInfo("Logined Successfully!")
                    that.redirect('#/home')
                })
                .catch(function (err) {
                    auth.handleError(err)
                })
        })



    });

    app.run("#/home");
});