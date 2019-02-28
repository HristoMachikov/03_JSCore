function increment(selector) {
    let parent = $(`${selector}`);

    (function createElement() {
        let textArea = $('<textarea>');
        textArea.addClass('counter');
        textArea.val(0);
        textArea.attr('disabled', true)

        let incrementBtn = $('<button>');
        incrementBtn.addClass('btn')
        incrementBtn.attr("id", 'incrementBtn')
        incrementBtn.text('Increment')

        incrementBtn.on('click', function () {
            let currValue = $('.counter').val();
            taxtarea(val(currValue + 1));
        })


        let addBtn = $('<button>')
        addBtn.addClass('btn')
        addBtn.attr('id', 'addBtn')
        addBtn.text('Add')

        addBtn.on('click', function () {
            let li = $('<li>');
            li.text($('.counter').val())
            $('.result').append(li);
        })


        let ul = $('<ul>')
        ul.addClass('ul')

        appendElement([textArea, incrementBtn, addBtn, ul])
    })();

    function appendElement(element) {
        element.foreach((elem) => {
            parent.append(elem)
        })
    }
}
