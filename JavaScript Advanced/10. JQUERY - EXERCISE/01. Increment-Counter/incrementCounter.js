function increment(selector) {
    let parent = $(selector);

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
        textArea.val(Number(currValue) + 1);
    })

    let addBtn = $('<button>')
    addBtn.addClass('btn')
    addBtn.attr('id', 'addBtn')
    addBtn.text('Add')
    addBtn.on('click', function () {
        let li = $('<li>');
        li.text($('.counter').val())
        $('.results').append(li);
    })

    let ul = $('<ul>')
    ul.addClass('results')

    appendElement([textArea, incrementBtn, addBtn, ul])
   
    function appendElement(elementsArr) {
        elementsArr.forEach((elem) => {
            parent.append(elem)
        })
    }
}