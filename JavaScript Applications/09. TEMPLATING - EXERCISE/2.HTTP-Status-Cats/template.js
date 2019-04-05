$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        //get template
        let template = await $.ajax({
            url: './catTemplate.html'
        });
        //compail template - call back function
        let templateHtml = Handlebars.compile(template);
        //Create context
        let cats = window.cats;
        let context = { cats };
        //Add context
        $("#allCats").append(templateHtml(context))
    }

})