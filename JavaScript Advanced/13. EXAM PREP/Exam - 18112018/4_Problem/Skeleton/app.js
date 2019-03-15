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

	let profit = 0;
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
				let currPrice = +offer.children[0].textContent.split(': ')[1];
				let currType = offer.children[1].textContent.split(': ')[1];
				let currCommPercent = +offer.children[2].textContent.split(': ')[1];

				let currCommision = currPrice * currCommPercent / 100;

				if (currType === $familyApartmentType.val()
					&& (currCommision + currPrice) <= +$familyBudget.val()) {
					let $currDiv = createHomeElem($familyName.val());
					$(offer).replaceWith($currDiv);
					profit += 2 * currCommision;
					$profit.text(`Agency profit: ${profit} lv.`);
					$message.text("Enjoy your new home! :))");
					break;
				} else {
					$message.text("We were unable to find you a home, so sorry :(");
				}
			}

		} else {
			$message.text("We were unable to find you a home, so sorry :(");
		}

		$familyBudget.val("");
		$familyApartmentType.val("");
		$familyName.val("");
	}

	function moveOut(event) {
		let holeElem = event.target.parentNode;
		let familyName = holeElem.children[0].textContent;
		$message.text(`They had found cockroaches in ${familyName}\'s apartment`);
		holeElem.parentNode.removeChild(holeElem);
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

	function createHomeElem(family) {
		let $div = $("<div>");
		$div.addClass("apartment");
		$div.attr('style', "border: 2px solid red;");
		let $pOne = $(`<p>${family}</p>`);
		let $pTwo = $('<p>live here now</p>');
		let $btn = $('<button>MoveOut</button>');
		$btn.on('click', moveOut);
		$div.append($pOne).append($pTwo).append($btn);
		return $div;
	}

}

            /*<div class="apartment">
                <p>Rent: 500</p>
                <p>Type: two rooms</p>
                <p>Commission: 20</p>
            </div>
            <div class="apartment">
                <p>Rent: 300</p>
                <p>Type: single room</p>
                <p>Commission: 10</p>
            </div>
            <div class="apartment">
                <p>Rent: 600</p>
                <p>Type: three rooms</p>
                <p>Commission: 10</p>
            </div>*/