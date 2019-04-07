$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', "hbs")
        this.get('#/index.html', () => {
            this.swap('<h2>Index 1</h2>');
        })
        this.route("get", "#/products/:productId", function (context) {
            //console.log(context)
            this.swap(`<h2>${context.params.productId}</h2>`);
        })

        this.post('#/login', (context) => {
            console.log(context.path);
            console.log(location.pathname);
            console.log(context)
            console.log(context.params.user);
            console.log(context.params.pass);
        });

        this.get('#/hello/(:name)?', function (context) {
            this.title = "Hello!";
            this.name = context.params.name;
            this.partial("greeting.hbs");
        })

        this.get('#/mainPage/(:name)?', function (context) {
            this.title = "Hello!";
            this.title2 = "My friend!";
            this.name = context.params.name;
            this.loadPartials({
                firstPartial: './first.hbs',
                secondPartial: './second.hbs'
                // thirdPartial: 'path-to/third.hbs'
            }).then(function (context) {
                //Here "context" is the last partial template
                console.log(context);
                this.partial('pageTemplate.hbs');
            });
        })

        this.notFound = function (e) {
            console.log(e)
        }
    })

    app.run('#/')
});

