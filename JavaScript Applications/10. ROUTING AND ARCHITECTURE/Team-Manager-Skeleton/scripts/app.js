$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.get("#/home", function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');
            this.hasTeam = sessionStorage.getItem('teamId') !== "undefined";
            if (this.hasTeam) {
                this.teamId = sessionStorage.getItem('teamId');
            }

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

        this.get("#/logout", function (ctx) {
            // let that = this;
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Successfull logout!")
                    ctx.redirect("#/home")
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

        this.get("#/catalog", function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');
            let userId = sessionStorage.getItem('userId');
            this.hasNoTeam = sessionStorage.getItem('teamId') === "undefined";

            teamsService.loadTeams()
                .then(function (res) {
                    ctx.teams = res;
                    // let hasNoTeam = res.filter(x => x._acl.creator === userId)[0]
                    // console.log(hasNoTeam)
                    console.log(res)
                    return ctx;
                })
                .then(function (ctx) {
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    })
                        .then(function () {
                            this.partial("./templates/catalog/teamCatalog.hbs")
                        })
                })
                .catch(err => console.log(err))
        })

        this.get("#/create", function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            })
                .then(function () {
                    this.partial("./templates/create/createPage.hbs")
                })
        })

        this.post("#/create", function (ctx) {
            let that = this;
            console.log(ctx)
            let { name, comment } = ctx.params;
            teamsService.createTeam(name, comment)
                .then(function (res) {
                    console.log(res)
                    //auth.saveSession(res)
                    sessionStorage.setItem("teamId", res._id)
                    auth.showInfo("Successfully created new team!")
                    that.redirect('#/home')
                })
                .catch(function (err) {
                    auth.handleError(err)
                })
        })

        this.get('#/catalog/:teamId', async function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');
            //let teamId = ctx.params.currTeamId
            ctx.teamId = ctx.params.teamId.slice(1);
            console.log(ctx.teamId)
            let res = await teamsService.loadTeamDetails(ctx.teamId);
            console.log(res)
            ctx.name = res.name;
            ctx.comment = res.comment;
            let creator = res._acl.creator;
            ctx.isAuthor = false;
            if (creator === sessionStorage.getItem('userId')) {
                ctx.isAuthor = true;
                ctx.isOnTeam = true;
            }
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                teamControls: 'templates/catalog/teamControls.hbs',
                teamMember: 'templates/catalog/teamMember.hbs'
            })
                .then(function () {
                    this.partial("./templates/catalog/details.hbs")
                })
        })


        this.get('#/join/:teamId', async function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');
            //let teamId = ctx.params.currTeamId
            ctx.teamId = ctx.params.teamId.slice(1);
            console.log(ctx.teamId)
            let res = await teamsService.loadTeamDetails(ctx.teamId);
            console.log(res)
            ctx.name = res.name;
            ctx.comment = res.comment;
            let creator = res._acl.creator;
            ctx.isAuthor = false;
            if (creator === sessionStorage.getItem('userId')) {
                ctx.isAuthor = true;
                ctx.isOnTeam = true;
            }
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                teamControls: 'templates/catalog/teamControls.hbs',
                teamMember: 'templates/catalog/teamMember.hbs'
            })
                .then(function () {
                    this.partial("./templates/catalog/details.hbs")
                })
        })

    });

    app.run("#/home");
});