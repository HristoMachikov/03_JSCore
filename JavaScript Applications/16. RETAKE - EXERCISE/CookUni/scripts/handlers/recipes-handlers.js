handlers.allRecipes = async function (ctx) {
    try {
        ctx.isAuth = userService.isAuth();
        ctx.username = sessionStorage.getItem('username');
        ctx.userId = sessionStorage.getItem('userId');
        ctx.firstName = sessionStorage.getItem('firstName');
        ctx.lastName = sessionStorage.getItem('lastName');
        
        let res = await recipeService.getAllRecipes();
        // let res = await recipeService.getUserRecipe(ctx.userId)
        ctx.isNotEmpty = true;
        ctx.recipes = [];
        if (res.length > 0) {
            ctx.recipes = res;
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                recipe: "../templates/recipes/singleRecipe.hbs"
            }).then(function () {
                this.partial("../templates/recipes/all-recipes.hbs")
            })
        } else {
            ctx.isNotEmpty = false;
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                empty: "../templates/recipes/recipeNotFound.hbs"
            }).then(function () {
                this.partial("../templates/recipes/all-recipes.hbs")
            })
        }
    } catch (err) {
        notifications.handleError(err)
        ctx.redirect('#/');
    }
}

handlers.getUserDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
    ctx.firstName = sessionStorage.getItem('firstName');
    ctx.lastName = sessionStorage.getItem('lastName');

    let res = await recipeService.getUserRecipe(ctx.params.userId)
    ctx.recipes = res;
    ctx.recipesCount = res.length;
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs",
        recipe: "../templates/recipes/singleRecipe.hbs"
    })
        .then(function () {
            this.partial("../templates/recipes/user-profile.hbs")
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getRecipeDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
    ctx.firstName = sessionStorage.getItem('firstName');
    ctx.lastName = sessionStorage.getItem('lastName');

    let id = ctx.params.id
    try {
        let res = await recipeService.getRecipe(id);
        let {meal, ingredients, prepMethod, description, foodImageURL, likesCounter } = res[0];
        let userCreator = res[0]._acl.creator;
        ctx.meal = meal;
        ctx.description = description;
        ctx.foodImageURL = foodImageURL;
        ctx.prepMethod = prepMethod;
        ctx.ingredients = ingredients;
        ctx.likesCounter = likesCounter;
        ctx._id = id;
        ctx.isCreator = userCreator === sessionStorage.getItem('userId');
        ctx.loadPartials({
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs"
        }).then(function () {
            this.partial("../templates/recipes/recipe-details.hbs")
        })
    } catch (err) {
        notifications.showError(err)
    }
}

handlers.getLikeRecipe = function (ctx) {
    let id = ctx.params.id;
    recipeService.getRecipe(id)
        .then(function (res) {
            let data = { ...res[0] };
            let currCount = +data.likesCounter;
            data.likesCounter = currCount + 1;
            recipeService.editRecipe(id, data)
                .then(function () {
                    notifications.showSuccess("You liked that recipe.");
                    ctx.redirect('#/home');
                }).catch(function () {
                    notifications.handleError(err);
                })
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getCreateRecipe = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.userId = sessionStorage.getItem('userId');
    ctx.username = sessionStorage.getItem('username');
    ctx.firstName = sessionStorage.getItem('firstName');
    ctx.lastName = sessionStorage.getItem('lastName');

    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../templates/recipes/create-recipe.hbs')
    }).catch(function (err) {
        notifications.handleError(err);
        ctx.redirect('#/home');
    })
}

handlers.createRecipe = function (ctx) {
    let {meal, ingredients, prepMethod, description, foodImageURL, category} = ctx.params;
    let data = { ...ctx.params };
    data.likesCounter = 0;
    let allCategoryImageURL = [
        "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
        "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
        "https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
        "https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
        "https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
    ];

    data.categoryImageURL = allCategoryImageURL[0];

    if (meal.length < 4) {
        notifications.showError('The recipe meal should be at least 4 characters long.');
        return;
    }
    if (!ingredients.includes(',')) {
        notifications.showError('The recipe ingredients should be at least 2 number.');
        return;
    }
    if (prepMethod.length < 10) {
        notifications.showError('The preparation method should be at least 10 characters long.');
        return;
    }
    if (description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.');
        return;
    }
    if (foodImageURL.startsWith("http://") || foodImageURL.startsWith("https://")) {
    } else {
        notifications.showError('The food image URL should start with "http://" or "https://".');
        return;
    }

    if (!meal || !ingredients || !description || !foodImageURL || !prepMethod) {
        notifications.showError('You have empty input field!');
        return;
    }

    recipeService.createRecipe(data)
        .then(function (res) {
            notifications.showSuccess('Recipe shared successfully!');
            ctx.redirect('#/home')
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getEditRecipe = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.userId = sessionStorage.getItem('userId');
    ctx.username = sessionStorage.getItem('username');
    ctx.firstName = sessionStorage.getItem('firstName');
    ctx.lastName = sessionStorage.getItem('lastName');

    recipeService.getRecipe(ctx.params.id)
        .then(function (res) {
            let { meal, ingredients, prepMethod, description, foodImageURL, likesCounter, _id, categoryImageURL } = res[0];
            ctx.meal = meal;
            ctx.description = description;
            ctx.foodImageURL = foodImageURL;
            ctx.ingredients = ingredients;
            ctx.prepMethod = prepMethod;
            ctx.likesCounter = likesCounter;
            ctx.categoryImageURL = categoryImageURL;
            ctx._id = _id;
            ctx.loadPartials({
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs'
            }).then(function () {
                this.partial('../templates/recipes/edit-recipe.hbs')
            }).catch(function (err) {
                notifications.handleError(err);
                ctx.redirect('#/home');
            })
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.editRecipe = function (ctx) {
    let {meal, ingredients, prepMethod, description, foodImageURL, category, likesCounter, categoryImageURL} = ctx.params;

    if (meal.length < 4) {
        notifications.showError('The recipe meal should be at least 4 characters long.');
        return;
    }
    if (!ingredients.includes(',')) {
        notifications.showError('The recipe ingredients should be at least 2 number.');
        return;
    }
    if (prepMethod.length < 10) {
        notifications.showError('The preparation method should be at least 10 characters long.');
        return;
    }
    if (description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.');
        return;
    }
    if (foodImageURL.startsWith("http://") || foodImageURL.startsWith("https://")) {
    } else {
        notifications.showError('The food image URL should start with "http://" or "https://".');
        return;
    }

    if (!meal || !ingredients || !description || !foodImageURL || !prepMethod) {
        notifications.showError('You have empty input field!');
        return;
    }

    let data = { meal, ingredients, prepMethod, description, foodImageURL, category, likesCounter, categoryImageURL };
    let id = ctx.params.id;
    recipeService.editRecipe(id, data)
        .then(function (res) {
            notifications.showSuccess('Recipe edited successfully.');
            ctx.redirect('#/home')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.removeRecipe = function (ctx) {
    recipeService.removeRecipe(ctx.params.id)
        .then(function (res) {
            notifications.showSuccess('Your recipe was archived.');
            ctx.redirect('#/home')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}