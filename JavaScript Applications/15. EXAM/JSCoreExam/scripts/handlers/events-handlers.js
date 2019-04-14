handlers.allEvents = async function (ctx) {
    try {
        ctx.isAuth = userService.isAuth();
        ctx.username = sessionStorage.getItem('username');
        ctx.userId = sessionStorage.getItem('userId');
        
        let res = await eventService.getAllEvents();
        ctx.isNotEmpty = true;
        ctx.events = [];
        if (res.length > 0) {
            ctx.events = res;
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                event: "../templates/events/singleEvent.hbs"
            }).then(function () {
                this.partial("../templates/events/all-events.hbs")
            })
        } else {
            ctx.isNotEmpty = false;
            ctx.loadPartials({
                header: "../templates/common/header.hbs",
                footer: "../templates/common/footer.hbs",
                empty: "../templates/events/eventNotFound.hbs"
            }).then(function () {
                this.partial("../templates/events/all-events.hbs")
            })
        }
    } catch (err) {
        notifications.handleError(err)
        ctx.redirect('#/');
    }
}

handlers.getEventDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
    let id = ctx.params.id
    try {
        let res = await eventService.getEvent(id);
        let {name, dateTime, description, organizer, imageURL, peopleInterestedIn} = res[0];
        let userCreator = res[0]._acl.creator;
        ctx.name = name;
        ctx.description = description;
        ctx.imageURL = imageURL;
        ctx.organizer = organizer;
        ctx.dateTime = dateTime;
        ctx.peopleInterestedIn = peopleInterestedIn;
        ctx._id = id;
        ctx.isCreator = userCreator === sessionStorage.getItem('userId');
        ctx.loadPartials({
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs"
        }).then(function () {
            this.partial("../templates/events/event-details.hbs")
        })
    } catch (err) {
        notifications.showError(err)
    }
}

handlers.getUserDetails = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
    let res = await eventService.getUserEvent(ctx.params.userId)
    ctx.events = res;
    ctx.eventsCount = res.length;
    ctx.loadPartials({
        header: "../templates/common/header.hbs",
        footer: "../templates/common/footer.hbs"
    })
        .then(function () {
            this.partial("../templates/events/user-profile.hbs")
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getJoinEvent = function (ctx) {
    let id = ctx.params.id;
    eventService.getEvent(id)
        .then(function (res) {
            let data = { ...res[0] };
            let currCount = +data.peopleInterestedIn;
            data.peopleInterestedIn = currCount + 1;
            eventService.editEvent(id, data)
                .then(function () {
                    notifications.showSuccess("You join the event successfully.");
                    ctx.redirect('#/home');
                }).catch(function () {
                    notifications.handleError(err);
                })
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getCreateEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
    }).then(function () {
        this.partial('../templates/events/create-event.hbs')
    }).catch(function (err) {
        notifications.handleError(err);
        ctx.redirect('#/home');
    })
}

handlers.createEvent = function (ctx) {
    let {name, dateTime, description, imageURL} = ctx.params;
    let data = { ...ctx.params };
    data.organizer = sessionStorage.getItem('username')
    data.peopleInterestedIn = 0;

    if (name.length < 6) {
        notifications.showError('The event name should be at least 6 characters long.');
        return;
    }
    if (description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.');
        return;
    }
    if (imageURL.startsWith("http://") || imageURL.startsWith("https://")) {
    } else {
        notifications.showError('The image should start with "http://" or "https://".');
        return;
    }

    if (!name || !description || !imageURL || !dateTime) {
        notifications.showError('You have empty input field!');
        return;
    }
    //dateTime validate

    eventService.createEvent(data)
        .then(function (res) {
            notifications.showSuccess('Event created successfully.');
            ctx.redirect('#/home')
        }).catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.getEditEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    eventService.getEvent(ctx.params.id)
        .then(function (res) {
            let { name, dateTime, description, organizer, imageURL, peopleInterestedIn, _id } = res[0];
            ctx.name = name;
            ctx.description = description;
            ctx.imageURL = imageURL;
            ctx.organizer = organizer;
            ctx.dateTime = dateTime;
            ctx.peopleInterestedIn = peopleInterestedIn;
            ctx._id = _id;
            ctx.loadPartials({
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs'
            }).then(function () {
                this.partial('../templates/events/edit-event.hbs')
            }).catch(function (err) {
                notifications.handleError(err);
                ctx.redirect('#/home');
            })
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.editEvent = function (ctx) {
    let {name, dateTime, description, organizer, imageURL, peopleInterestedIn} = ctx.params;

    if (name.length < 6) {
        notifications.showError('The event name should be at least 6 characters long.');
        return;
    }
    if (description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.');
        return;
    }
    if (imageURL.startsWith("http://") || imageURL.startsWith("https://")) {
    } else {
        notifications.showError('The image should start with "http://" or "https://".');
        return;
    }
    if (!name || !description || !imageURL || !dateTime) {
        notifications.showError('You have empty input field!');
        return;
    }
    //dateTime validate

    let data = { name, dateTime, description, organizer, imageURL, peopleInterestedIn };
    let id = ctx.params.id;
    eventService.editEvent(id, data)
        .then(function (res) {
            notifications.showSuccess('Event edited successfully.');
            ctx.redirect('#/home')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}

handlers.removeEvent = function (ctx) {
    eventService.removeEvent(ctx.params.id)
        .then(function (res) {
            notifications.showSuccess(`Event closed successfully.`);
            ctx.redirect('#/home')
        })
        .catch(function (err) {
            notifications.handleError(err);
        })
}