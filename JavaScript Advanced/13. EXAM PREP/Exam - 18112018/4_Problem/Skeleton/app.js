function realEstateAgency() {

	let $apartmentRent = $('input[name="apartmentRent"]');
	let $apartmentType = $('input[name="apartmentType"]');
	let $agencyCommission = $('input[name="agencyCommission"]');

	let $building = $('#building');
	let $message = $('#message');
	let $btnRegOffer = $('button[name="regOffer"]');
	$btnRegOffer.on('click', regOffer);

	let $familyBudget = $('input[name="familyBudget"]');
	let $familyApartmentType = $('input[name="familyApartmentType"]');
	let $familyName = $('input[name="familyName"]');

	let $profit = $('#roof h1');
	let $btnFindOffer = $('button[name="findOffer"]');
	$btnFindOffer.on('click', findOffer);

	function regOffer() {
		if ($apartmentRent.val() > 0 && typeof +$apartmentRent.val() === "number"
			&& $agencyCommission.val() >= 0 && $agencyCommission.val() <= 100 && typeof +$agencyCommission.val() === "number"
			&& $apartmentType.val() && !($apartmentType.val()).includes(':')) {
			$message.text("Your offer was created successfully.");
			let $newDiv = createRegElem($apartmentRent.val(), $apartmentType.val(), $agencyCommission.val());
			$building.append($newDiv)

		} else {
			$message.text("Your offer registration went wrong, try again.");
		}
		$apartmentRent.val("");
		$apartmentType.val("");
		$agencyCommission.val("");
	}

	function findOffer() {

		if ($familyBudget.val() > 0 && typeof +$familyBudget.val() === "number"
			&& $familyApartmentType.val() && $familyName.val()) {
			let searchInArr = Array.from($('#building').find('div'));
			for (const offer of searchInArr) {
				//console.log(offer)
				let currPrice = +offer.children[0].textContent.split(': ')[1];
				let currType = offer.children[1].textContent.split(': ')[1];
				let currComm = +offer.children[2].textContent.split(': ')[1];
				// console.log(currPrice)
				// console.log(currType)
				// console.log(currComm)
				if (currType === $familyApartmentType.val()) {
					//console.log(offer)
				}
			}
			//console.log(searchInArr);
		}

		$familyBudget.val("");
		$familyApartmentType.val("");
		$familyName.val("");

	}

	function createRegElem(rent, type, commission) {
		let $div = $('<div>');
		$div.addClass("apartment");
		let $pOne = $(`<p>Rent: ${rent}</p>`);
		let $pTwo = $(`<p>Type: ${type}</p>`);
		let $pThree = $(`<p>Commission: ${commission}</p>`);
		$div.append($pOne).append($pTwo).append($pThree);
		return $div;
	}

}