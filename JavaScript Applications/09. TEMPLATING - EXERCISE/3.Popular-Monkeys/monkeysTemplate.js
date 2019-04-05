$(() => {
    loadMonkeys();

    async function loadMonkeys() {
        let allMonkeysHtml = await $.ajax({
            url: "./mainTemplate.html"
        })
        let monkeyHtml = await $.ajax({
            url: "./partialTemplate.html"
        });

        let allMonkeysTemplate = Handlebars.compile(allMonkeysHtml);
        let monkeyTemplate = Handlebars.compile(monkeyHtml);
        Handlebars.registerPartial('monkey', monkeyHtml);

        let context = { monkeys };
        $('body').html(allMonkeysTemplate(context))
    }
})

function showInfo(id) {
    $(`#${id}`).toggle();
}