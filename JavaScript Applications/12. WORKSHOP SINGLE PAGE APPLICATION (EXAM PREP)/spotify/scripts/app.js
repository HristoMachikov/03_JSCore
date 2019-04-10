const handlers = {};

$(() => {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");
        //home page routes
        this.get('/index.html', handlers.getHome);
        this.get('#/home', handlers.getHome);
        this.get('/', handlers.getHome);

        //users routes
        this.get("#/register", handlers.getRegister);
        this.get("#/login", handlers.getLogin);

        this.post("#/register", handlers.registerUser);
        this.post("#/login", handlers.loginUser);
        this.get("#/logout", handlers.logoutUser);
        //appdata routes
        //song routes
        this.get("#/create",handlers.getSong);
        this.post("#/create",handlers.createSong);
        this.get("#/allSongs", handlers.getAllSongs)
        this.get("#/mySongs", handlers.getMySongs)
        this.get('#/remove/:id', handlers.removeSong)
        this.get('#/listen/:id', handlers.listenSong)
        this.get('#/like/:id', handlers.likeSong)
    
    });

    app.run('#/');
});