const handlers = {};

$(() => {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");
        //home page routes
        this.get('/index.html', handlers.getHome);
        //this.get('#/home', handlers.getHome);
        this.get('/', handlers.getHome);

        //users routes
        this.get("#/register", handlers.getRegister);
        this.get("#/login", handlers.getLogin);

        this.post("#/register", handlers.registerUser);
        this.post("#/login", handlers.loginUser);
        this.get("#/logout", handlers.logoutUser);
        //appdata routes

        this.get('#/home', handlers.allMemes);
        this.get('#/memeDetails/:id', handlers.getMemeDetails);
        this.get('#/userProfil/:userId', handlers.getUserDetails);

        this.get('#/createMeme', handlers.getCreateMeme);
        this.post('#/createMeme', handlers.createMeme);

        this.get('#/edit/:id', handlers.getEditMeme);
        this.post('#/edit/:id', handlers.editMeme);

        this.get('#/remove/:id', handlers.removeMeme);
        this.get('#/removeUser/:id', handlers.removeUser);

    });

    app.run('#/');
});