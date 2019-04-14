const handlers = {};

$(() => {
    const app = Sammy("#root", function () {
        this.use("Handlebars", "hbs");
        //home page routes
        this.get('/index.html', handlers.getHome);
        this.get('/', handlers.getHome);

        //users routes
        this.get("#/register", handlers.getRegister);
        this.get("#/login", handlers.getLogin);

        this.post("#/register", handlers.registerUser);
        this.post("#/login", handlers.loginUser);
        this.get("#/logout", handlers.logoutUser);

        //appdata routes
        this.get('#/home', handlers.allEvents);
        this.get('#/details/:id', handlers.getEventDetails);
        this.get('#/userProfile/:userId', handlers.getUserDetails);

        this.get('#/create', handlers.getCreateEvent);
        this.post('#/create', handlers.createEvent);

        this.get('#/edit/:id', handlers.getEditEvent);
        this.post('#/edit/:id', handlers.editEvent);

        this.get('#/remove/:id', handlers.removeEvent);
        
        this.get('#/join/:id', handlers.getJoinEvent);
    });

    app.run('#/');
});