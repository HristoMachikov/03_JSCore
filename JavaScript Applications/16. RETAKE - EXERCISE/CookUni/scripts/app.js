const handlers = {};

$(() => {
    const app = Sammy("#rooter", function () {
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
        this.get('#/home', handlers.allRecipes);
        this.get('#/details/:id', handlers.getRecipeDetails);
        this.get('#/userProfile/:userId', handlers.getUserDetails);

        this.get('#/create', handlers.getCreateRecipe);
        this.post('#/create', handlers.createRecipe);

        this.get('#/edit/:id', handlers.getEditRecipe);
        this.post('#/edit/:id', handlers.editRecipe);

        this.get('#/remove/:id', handlers.removeRecipe);
        
        this.get('#/like/:id', handlers.getLikeRecipe);
    });

    app.run('#/');
});