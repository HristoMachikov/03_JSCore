function solution() {
	let $addGiftBtn = $('#fields button');
	// $('#fields button').on("click", addGift);

	// function addGift() {
		let $toyType = $("#toyType");
		let $toyPrice = $("#toyPrice");
		let $toyDescription = $('#toyDescription');
		if ($toyType.val()
			&& $toyPrice.val()
			&& $toyDescription.val()
			//&& $toyDescription.val().length >= 50
			&& +$toyPrice.val() > 0
			//&& +$toyPrice.val() % +$toyPrice.val() == 0
			&& typeof $toyDescription.val() == "string") {
			$('#christmasGiftShop').append(`
				<div class="gift">
					<img src="gift.png">
					<h2>${$toyType.val()}</h2>
					<p>${$toyDescription.val()}</p>
					<button>Buy it for $${$toyPrice.val()}</button>
				</div>
			`)
			$('#christmasGiftShop').children().last().find('button').on('click', buyGift);
			$toyType.val("");
			$toyPrice.val("");
			$toyDescription.val("");
		}
	// }

	function buyGift(event) {
		$(event.target).parent().remove();
	}
}