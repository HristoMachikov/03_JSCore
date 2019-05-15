$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.get("#/home", function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');
            this.hasTeam = false;
            let teamId = sessionStorage.getItem('teamId');
            if (teamId !== "undefined" && teamId) {
                this.hasTeam = true;
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

            this.hasNoTeam = true;
            let teamId = sessionStorage.getItem('teamId');
            if (teamId !== "undefined" && teamId) {
                this.hasNoTeam = false;
            }

            teamsService.loadTeams()
                .then(function (res) {
                    ctx.teams = res;
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
            let { name, comment } = ctx.params;
            let teamId;
            if (name.trim() && comment.trim()) {
                teamsService.createTeam(name, comment)
                    .then(function (res) {
                        sessionStorage.setItem("teamId", res._id)
                        auth.showInfo("Successfully created new team!")
                        teamId = res._id;
                        let id = sessionStorage.getItem("userId");
                        let username = sessionStorage.getItem("username");
                        requester.update('user', id, 'kinvey', { username, teamId })
                        that.redirect('#/home')
                    })
                    .catch(function (err) {
                        auth.handleError(err)
                    })
            } else {
                auth.showError('You have empty input fields!')
            }
        })

        this.get('#/catalog/(:teamId)?', async function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');

            ctx.teamId = ctx.params.teamId.slice(1);
            try {
                let res = await teamsService.loadTeamDetails(ctx.teamId);
                ctx.name = res.name;
                ctx.comment = res.comment;
                let creator = res._acl.creator;
                ctx.isAuthor = false;
                let teamId = sessionStorage.getItem('teamId');

                if (creator === sessionStorage.getItem('userId') && teamId === res._id) {
                    ctx.isAuthor = true;
                }

                if (teamId && teamId !== 'undefined') {
                    ctx.isOnTeam = true;
                }

                ctx.isTeamMember = false;
                if (teamId === res._id) {
                    ctx.isTeamMember = true;
                }

                let response = await teamsService.getMembers(res._id)
                ctx.members = response;
                ctx.oneMemberTeam = false;
                if (ctx.isAuthor && response.length === 1) {
                    ctx.oneMemberTeam = true;
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
            } catch (err) {
                auth.showError(err)
            }
        })

        this.get("#/edit/:teamId", function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');
            ctx.teamId = ctx.params.teamId.slice(1);
            teamsService.loadTeamDetails(ctx.teamId)
                .then(function (res) {
                    ctx.name = res.name;
                    ctx.comment = res.comment;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    })
                        .then(function () {
                            this.partial("./templates/edit/editPage.hbs")
                        })
                })
                .catch(function (err) {
                    auth.showError(err)
                })
        })

        this.post("#/edit/:teamId", function (ctx) {
            ctx.loggedIn = !!sessionStorage.getItem('authtoken');
            ctx.username = sessionStorage.getItem('username');
            ctx.teamId = ctx.params.teamId.slice(1);
            teamsService.edit(ctx.teamId, ctx.params.name, ctx.params.comment)
                .then(function (res) {
                    auth.showInfo(`Successfully edited team data!`)
                    ctx.redirect('#/home')
                })
                .catch(function (err) {
                    auth.showError(err)
                })
        })

        this.get('#/join/:teamId', function (ctx) {
            ctx.teamId = ctx.params.teamId.slice(1);
            teamsService.joinTeam(ctx.teamId)
                .then(function (res) {
                    sessionStorage.setItem("teamId", ctx.teamId)
                    auth.showInfo(`Successfully joined to the team!`)
                    ctx.redirect('#/home')
                })
                .catch(function (err) {
                    auth.handleError(err)
                })
        })

        this.get('#/remove/:teamId', function (ctx) {
            ctx.teamId = ctx.params.teamId.slice(1);
            teamsService.removeTeam(ctx.teamId)
                .then(function (res) {
                    teamsService.leaveTeam()
                        .then(function (response) {
                            sessionStorage.setItem("teamId", "undefined")
                            auth.showInfo(`Successfully removed your one member team!`)
                            ctx.redirect('#/home')
                        })
                        .catch(function (err) {
                            auth.handleError(err)
                        })
                })
                .catch(function (err) {
                    auth.handleError(err)
                })
        })

        this.get("#/leave", function (ctx) {
            teamsService.leaveTeam()
                .then(function (res) {
                    sessionStorage.setItem("teamId", "undefined")
                    auth.showInfo(`Successfully leaved the team!`)
                    ctx.redirect('#/home')
                })
                .catch(function (err) {
                    auth.handleError(err)
                })
        })

    });

    app.run("#/home");
});