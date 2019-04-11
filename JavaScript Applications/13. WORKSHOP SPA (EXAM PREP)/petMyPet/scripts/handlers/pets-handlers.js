handlers.getDashboard = async function (ctx) {
    let res = await petsService.getDashboard()

    let otherPets = res.filter(pet => pet._acl.creator !== sessionStorage.getItem('userId'));
    ctx.otherPets = otherPets;
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        otherPet: "../templates/pets/otherPet.hbs"
    }).then(function () {
        this.partial('../templates/pets/dashboard.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.getCategory = async function (ctx) {

    let category = ctx.params.category;
    let categoriesArr = ["Cat", "Dog", "Parrot", "Reptile", "Other"];
    if (categoriesArr.includes(category)) {
        let res = await petsService.getCategory(category)

        let sortedRes = res.sort((a, b) => b.likes - a.likes);
        ctx.otherPets = sortedRes;
        ctx.isMyPets = ctx.path.includes('myPets');
        ctx.isAuth = userService.isAuth();

        ctx.loadPartials({
            header: "../templates/common/header.hbs",
            otherPet: "../templates/pets/otherPet.hbs"
        }).then(function () {
            this.partial('../templates/pets/dashboard.hbs')
        }).catch(function (err) {
            console.log(err)
        })
    }
}

handlers.getCreate = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/pets/create.hbs')
    }).catch(function (err) {
        console.log(err)
    })
}

handlers.create = function (ctx) {
    console.log(ctx.patams)
    petsService.create({ ...ctx.params, likes: 0 })
        .then(function () {
            notifications.showSuccess('Pet created.');
            ctx.redirect('#/home');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getMyPets = function (ctx) {
    let id = sessionStorage.getItem('userId');
    petsService.getMyPets(id)
        .then(function (res) {
            ctx.myPets = res;
            ctx.isAuth = userService.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                myPet: "../templates/pets/myPet.hbs"
            }).then(function () {
                this.partial('../templates/pets/showMyPets.hbs')
            }).catch(function (err) {
                console.log(err)
            })
        })

}