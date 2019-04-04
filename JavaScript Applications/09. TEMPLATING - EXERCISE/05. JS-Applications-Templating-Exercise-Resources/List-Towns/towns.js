function attachEvents() {
    $('#btnLoadTowns').on('click', getTowns)

    function getTowns() {
        $('#root').empty()
        let towns = $('#towns').val().split(', ');

        //get template
        let template = $('#towns-template').html();
        //compail template - call back function
        let templateHtml = Handlebars.compile(template);
        //Create context
        let context = { towns };
        //Add context
        $('#root').append(templateHtml(context));

        $('#towns').val("")
    }
}