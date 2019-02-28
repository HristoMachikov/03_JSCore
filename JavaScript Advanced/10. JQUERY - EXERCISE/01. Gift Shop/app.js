function solution() {
	let show = $('#christmasGiftShop')
	//$('button').on('click', giftShop);

	//function giftShop() {
	let typeElem = ('#toyType');
	let priceElem = ('#toyPrice')
	let descriptionElem = ('#toyDescription');
	if (typeElem.val() && !isNaN(+priceElem.val()) && descriptionElem.val()) {
		let div = $('<div>');
		div.addClass('gift');

		let img = $('<img>');
		img.attr('src', 'gift.png');

		let h2 = $('<h2>')
		h2.text(typeElem.val())


		let p = $('<p>')
		p.text(descriptionElem.val());

		let btn = $('<button>')
		btn.text(`Buy it for $${priceElem.val()}`)
		btn.on('click', () => div.remove());

		div.append(img).append(h2).append(p).append(btn)
		show.append(div)

	}

	typeElem.val("");
	priceElem.val("");
	descriptionElem.val("");

	//}
}