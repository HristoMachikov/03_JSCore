function addItem() {
    let $newItemText = $('#newItemText');
    let $newItemValue = $('#newItemValue');
    let newItemText = $newItemText.val();
    let newItemValue = $newItemValue.val();

    let $select = $('#menu');
    let $option = $(`<option value="${newItemValue}">${newItemText}</option>`);
    $select.append($option);

    $newItemText.val("");
    $newItemValue.val("");
}