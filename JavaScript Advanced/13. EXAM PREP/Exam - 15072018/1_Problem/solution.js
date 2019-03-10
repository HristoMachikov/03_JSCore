function addSticker() {
    let $title = $('.title');
    let $content = $('.content');
    let $ul = $('#sticker-list');
    if ($title.val() && $content.val()) {
        let $li = $('<li class="note-content"></li>');
        let $a = $('<a class="button">x</a>');
        let $h2 = $(`<h2>${$title.val()}</h2>`);
        let $p = $(`<p>${$content.val()}</p>`);
        $li.append($a).append($h2).append('<hr></hr>').append($p);
        $ul.append($li);
        $li.children().eq(0).on('click', (e) => $(e.target).parent().remove())
    }
    $title.val('');
    $content.val('');
}