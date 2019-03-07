function solution() {
	let $christmasGiftShop = $('#christmasGiftShop');
	let $toyType = $('#toyType')
	let $toyPrice = $('#toyPrice')
	let $toyDescription = $('#toyDescription')
	if ($toyType.val() && Number($toyPrice.val()) && $toyDescription.val()) {
		let $div = $('<div>');
		$div.addClass('gift')
		let $img = $('<img>');
		$img.attr('src', 'gift.png')
		let $h2 = $('<h2>');
		$h2.text($toyType.val())
		let $p = $('<p>');
		$p.text($toyDescription.val())
		let $btn = $('<button>')
		$btn.text(`Buy it for $${$toyPrice.val()}`)
		$div.append($img)
		$div.append($h2)
		$div.append($p)
		$div.append($btn)
		$christmasGiftShop.append($div)
		$btn.on('click', hideGift)
		$toyType.val("")
		$toyPrice.val("")
		$toyDescription.val("")
	}

	function hideGift(e) {
		$(e.target).parent().remove();
	}




































	// let show = $('#christmasGiftShop')
	// //$('button').on('click', giftShop);

	// //function giftShop() {
	// let typeElem = ('#toyType');
	// let priceElem = ('#toyPrice')
	// let descriptionElem = ('#toyDescription');
	// if (typeElem.val() && !isNaN(+priceElem.val()) && descriptionElem.val()) {
	// 	let div = $('<div>');
	// 	div.addClass('gift');

	// 	let img = $('<img>');
	// 	img.attr('src', 'gift.png');

	// 	let h2 = $('<h2>')
	// 	h2.text(typeElem.val())


	// 	let p = $('<p>')
	// 	p.text(descriptionElem.val());

	// 	let btn = $('<button>')
	// 	btn.text(`Buy it for $${priceElem.val()}`)
	// 	btn.on('click', () => div.remove());

	// 	div.append(img).append(h2).append(p).append(btn)
	// 	show.append(div)

	// }

	// typeElem.val("");
	// priceElem.val("");
	// descriptionElem.val("");

	// //}
}