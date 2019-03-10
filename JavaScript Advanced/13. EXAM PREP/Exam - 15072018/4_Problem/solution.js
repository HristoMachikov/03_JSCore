function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    let $product = $(".custom-select");
    let $price = $('#price');
    let $quantity = $('#quantity');
    let $btn = $('#submit');
    let $display = $('.display');
    let $capacity = $('#capacity');
    let $sum = $('#sum');

    $product.on('input', function () {
        let isEmpty = $product.val() === "";
        $btn.attr("disabled", isEmpty);
    })

    $btn.on('click', addProduct);
    function addProduct() {
        let currCapacity = Number($capacity.val()) + Number($quantity.val());
        if (+currCapacity <= 150) {
            let $li = $(`<li>Product: ${$product.val()} Price: ${$price.val()} Quantity: ${$quantity.val()}</li>`);
            $display.append($li);
            $capacity.val(currCapacity)
            $sum.val(+$sum.val() + +$price.val());
        }
        reset();
        if (+currCapacity >= 150) {
            $capacity.val('full')
            $capacity.addClass("fullCapacity");
            $product.attr("disabled", true);
            $price.attr("disabled", true);
            $quantity.attr("disabled", true);
            $btn.attr("disabled", true);
        }

    }

    function reset() {
        $product.val('');
        $price.val('1');
        $quantity.val('1');
        $btn.attr("disabled", true)
    }
}