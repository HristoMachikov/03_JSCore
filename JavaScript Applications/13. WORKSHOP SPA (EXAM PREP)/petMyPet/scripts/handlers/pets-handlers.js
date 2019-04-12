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

        let sortedRes = res
            .filter(pet => pet._acl.creator !== sessionStorage.getItem('userId'))
            .sort((a, b) => b.likes - a.likes);
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

handlers.detailsMyPet = function (ctx) {
    let petId = ctx.params.petId;
    petsService.getDetailsMyPet(petId)
        .then(function (res) {
            ctx.name = res[0].name
            ctx.description = res[0].description
            ctx.imageURL = res[0].imageURL
            ctx.category = res[0].category
            ctx.likes = res[0].likes
            ctx._id = res[0]._id
            ctx.partial('../templates/pets/detailsMyPet.hbs')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.editMyPet = function (ctx) {
    let id = ctx.params.petId;
    petsService.getDetailsMyPet(id)
        .then(function (res) {
            let data = res[0];
            data.description = ctx.params.description
            petsService.postDetailsMyPet(id, data)
                .then(function () {
                    notifications.showSuccess('Updated successfully!')
                    ctx.redirect('#/home');
                })
        })
}

handlers.getDeletePet = function (ctx) {
    let petId = ctx.params.petId;
    petsService.getDetailsMyPet(petId)
        .then(function (res) {
            ctx.name = res[0].name
            ctx.description = res[0].description
            ctx.imageURL = res[0].imageURL
            ctx.category = res[0].category
            ctx.likes = res[0].likes
            ctx._id = res[0]._id
            ctx.partial('../templates/pets/deletePet.hbs')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.deletePet = function (ctx) {
    let id = ctx.params.petId;
    petsService.deleteMyPet(id)
        .then(function (res) {
            notifications.showSuccess('Pet removed successfully!');
            ctx.redirect('#/dashboard');
        })
}

handlers.detailsOtherPet = function (ctx) {
    let petId = ctx.params.petId;
    petsService.getDetailsMyPet(petId)
        .then(function (res) {
            ctx.name = res[0].name
            ctx.description = res[0].description
            ctx.imageURL = res[0].imageURL
            ctx.category = res[0].category
            ctx.likes = res[0].likes
            ctx._id = res[0]._id
            ctx.partial('../templates/pets/detailsOtherPet.hbs')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.likeOtherPet = function (ctx) {
    let id = ctx.params.petId;
    petsService.getDetailsMyPet(id)
        .then(function (res) {
            let data = res[0];
            let newLiks = +data.likes + 1;
            data.likes = newLiks;
            petsService.postDetailsMyPet(id, data)
                .then(function () {
                    notifications.showSuccess('Liked successfully!')
                    ctx.redirect('#/dashboard');
                })
                .catch(function (err) {
                    notifications.handleError(err);
                })
        })
}