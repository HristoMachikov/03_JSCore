const handlers = {};

$(() => {
    const app = Sammy("#main", function () {
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

        this.get("#/myListings", handlers.myListings);
        this.get("#/allListings", handlers.allListings);
        this.get("#/details/:id", handlers.getDetails);

        this.get("#/remove/:id", handlers.getRemoveListing);

        this.get("#/create", handlers.getCreateListing);
        this.post("#/create", handlers.createListing);

        this.get("#/edit/:id", handlers.getEditListing);
        this.post("#/edit/:id", handlers.editListing);

    });

    app.run('#/');
});