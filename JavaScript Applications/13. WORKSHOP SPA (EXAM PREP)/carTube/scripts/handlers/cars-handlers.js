handlers.myListings = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    carsService.getMyListings(ctx.username)
        .then(function (res) {
            ctx.cars = res;
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                car: "../templates/cars/myListing.hbs"
            }).then(function () {
                this.partial('../templates/cars/my-listings.hbs')
            }).catch(function (err) {
                notifications.handleError(err);
            });

        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.allListings = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    try {
        let res = await carsService.getAllListings()
        res.forEach(car => car.isCreator = car.seller === ctx.username);
        console.log(res)
        ctx.cars = res;
        ctx.loadPartials({
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs",
            car: "../templates/cars/listing.hbs"
        }).then(function () {
            this.partial('../templates/cars/all-listings.hbs')
        }).catch(function (err) {
            notifications.handleError(err);
        });
    } catch (err) {
        notifications.handleError(err);
        ctx.redirect('#/home')
    };
}

handlers.getDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    carsService.getDetails(ctx.params.id)
        .then(function (res) {
            let {title, imageUrl, brand, model, year, fuelType, price, description, _id, seller} = res[0];
            ctx.title = title;
            ctx.imageUrl = imageUrl;
            ctx.brand = brand;
            ctx.model = model;
            ctx.year = year;
            ctx.fuelType = fuelType;
            ctx.price = price;
            ctx.description = description;
            ctx._id = _id;
            ctx.isCreator = seller === ctx.username;
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs"
            }).then(function () {
                this.partial('../templates/cars/listing-details.hbs')
            }).catch(function (err) {
                notifications.handleError(err);
            });

        })
        .catch(function (err) {
            notifications.handleError(err);
        });
}

handlers.getRemoveListing = function (ctx) {
    carsService.removeListing(ctx.params.id)
        .then(function (res) {
            notifications.showSuccess('Listing deleted.');
            ctx.redirect('#/allListings');
        }).catch(function (err) {
            notifications.handleError(err);
        });
}

handlers.getCreateListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    }).then(function () {
        this.partial('../templates/cars/create-listing.hbs')
    }).catch(function (err) {
        notifications.handleError(err);
    });
}

handlers.createListing = function (ctx) {
    let data = { ...ctx.params }; ///
    data.seller = sessionStorage.getItem('username');
    let {title, imageUrl, brand, model, year, fuelType, price, description} = data;

    if (model.length > 11 || fuelType.length > 11 || brand.length > 11) {
        notifications.showError('The brand, fuelType and model length must not exceed 11 characters!');
        return;
    }
    if (+price > 1000000) {
        notifications.showError('The maximum price is 1000000$');
        return;
    }
    if (model.length < 4) {
        notifications.showError('The model length should be at least 4 characters!');
        return;
    }
    if (year.length !== 4) {
        notifications.showError('The year must be only 4 chars long!');
        return;
    }
    if (title.length > 33) {
        notifications.showError('The title length must not exceed 33 characters!');
        return;
    }
    if (description.length < 30 || description.length > 450) {
        notifications.showError('The description length must not exceed 450 characters and should be at least 30!');
        return;
    }
    //if(/^http/.test(imageUrl))
    if (!imageUrl.startsWith("http")) {
        notifications.showError('Link url should always start with "http".');
        return;
    }
    if (!title || !description || !imageUrl || !year || !model || !price) {
        notifications.showError('You have empty input field!');
        return;
    }

    carsService.createListing(data)
        .then(function () {
            notifications.showSuccess('listing created.');
            ctx.redirect('#/allListings');
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getEditListing = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    carsService.getDetails(ctx.params.id)
        .then(function (res) {
            //ctx._id = ctx.params.id;
            let {title, imageUrl, brand, model, year, fuelType, price, description, _id, seller} = res[0];
            ctx.title = title;
            ctx.imageUrl = imageUrl;
            ctx.brand = brand;
            ctx.model = model;
            ctx.year = year;
            ctx.fuelType = fuelType;
            ctx.price = price;
            ctx.description = description;
            ctx._id = _id;

            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs"
            }).then(function () {
                this.partial('../templates/cars/edit-listing.hbs')
            }).catch(function (err) {
                notifications.handleError(err);
            });

        }).catch(function (err) {
            notifications.handleError(err);
        });
}

handlers.editListing = function (ctx) {
    let data = { ...ctx.params };
    data.seller = sessionStorage.getItem('username');
    let id = data._id;
    carsService.editListing(id, data)
        .then(function (res) {
            notifications.showSuccess(`Listing ${data.title} updated.`);
            ctx.redirect('#/allListings');
        }).catch(function (err) {
            notifications.handleError(err);
        });
}