const handlers = {};

$(() => {
    const app = Sammy("#site-content", function () {
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

    });

    app.run('#/');
});