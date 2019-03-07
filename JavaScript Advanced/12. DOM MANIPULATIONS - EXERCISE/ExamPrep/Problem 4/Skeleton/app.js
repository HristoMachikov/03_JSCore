function realEstateAgency() {
	$("button[name='regOffer']").on("click", regOffer)
	$("button[name='findOffer']").on("click", findOffer)
	let $message = $('#message')
	let $building = $('#building')

	function regOffer() {
		let $rentInput = $('input[name="apartmentRent"]');
		let $type = $('input[name="apartmentType"]');
		let $commissionInput = $('input[name="agencyCommission"]');
		let $building = $('#building');

		let isNumbers = (+$rentInput.val() && +$commissionInput.val()
			&& +$commissionInput.val() >= 0 && +$commissionInput.val() <= 100)
		let isEmpty = ($type.val() && $type.val().indexOf(':') === -1)
		if (isNumbers && isEmpty) {
			let $div = createHtmlElem('div', '', 'apartment')
			let $rent = createHtmlElem('p', `Rent:${$rentInput.val()}`)
			let $apartment = createHtmlElem('p', `Type:${$apartment.val()}`)
			let $commission = createHtmlElem('p', `Commission:${$type.val()}`)

			$div.append($rent).append($apartment).append($commission)
			$building.append($div)
		} else {
			$message.text("Your offer registration went wrong, try again.")
		}
		$rentInput.val('')
		$type.val('')
		$commissionInput.val('')


	}

	function findOffer() {
		let $familyBudget = $('input[name="familyBudget"]')
		let $familyApartmentType = $('input[name="familyApartmentType"]')
		let $familName = $('input[name="familyName"]')

		let budget = +$familyBudget.val();
		let isTheBudgetOk = !isNaN(budget) && budget > 0
		let isNotEmpty = $familyApartmentType.val() && $familName.val()

		if (isTheBudgetOk && isNotEmpty) {
			let $totalAgencyProfit = $('#roof h1')
			let amHomeLess = true;
			//Array.from($('. apartment')).forEach((apartment) => {
			for (let apartment of Array.from($('. apartment'))) {
				let $type = $(apartment).children().eq(1);
				let type = $type.text().split(': ')[1]

				if ($familyApartmentType.val() == type) {
					let $rent = $(apartment).children().eq(0);
					let rent = $rent.text().split(': ')[1];

					let $commision = $(apartment).children().eq(2);
					let commision = $commision.text().split(': ')[1];
					let c = (+rent * +commision) / 100;
					let needMoney = (+rent) + c


					if (($familyBudget.val() >= needMoney)) {
						$rent.text(`${$familName.val()}`)
						$type.text('live here now')
						$commision.remove();
						let $button = createHtmlElem('button', 'MoveOut')
						$button.on('click', function () {
							$(apartment).remove()
							$message.text(`The had found ${$familName.val()}\'s apartment`)

						})
						$(apartment).append($button)
						$(apartment).css('border', '2px solid red')

						$message.text('Enjoy your new home! :))')
						amHomeLess = false;
						let currAgCommision = +$totalAgencyProfit.text().split(' ')[2];
						let updateComision = currAgCommision.text() + 2 * c;
						$totalAgencyProfit.text(`Agency profit: ${updateComision} lv.`)

					}
					if (amHomeLess) {
						break;
						$message.text('We were unable to find you a home, so sorry :(')
					}
				}

			}
		} else {

		}

	}
	function createHtmlElem(type, text, className) {
		let element = $(`<${type}>${text}</${type}>`)
		if (text) {
			element.text(text)
		}
		if (className) {
			element.addClass(className);
		}
		return element;
	}
}