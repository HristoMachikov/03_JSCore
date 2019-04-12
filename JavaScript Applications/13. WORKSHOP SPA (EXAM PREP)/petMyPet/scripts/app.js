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
        this.get('#/dashboard', handlers.getDashboard)
        this.get('#/dashboard/:category', handlers.getCategory)
        this.get('#/create', handlers.getCreate)
        this.post('#/create', handlers.create)
        this.get('#/myPets', handlers.getMyPets)

        this.get('#/detailsMyPet/:petId', handlers.detailsMyPet)
        this.post('#/detailsMyPet/:petId', handlers.editMyPet)
        this.get('#/deletePet/:petId', handlers.getDeletePet)
        this.post('#/deletePet/:petId', handlers.deletePet)

        this.get('#/detailsOtherPet/:petId', handlers.detailsOtherPet)
        this.get('#/like/:petId', handlers.likeOtherPet)
    });

    app.run('#/');
});