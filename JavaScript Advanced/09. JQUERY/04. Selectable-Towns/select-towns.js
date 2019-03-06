function attachEvents() {
	$('#items li').on('click', selectTown)
	$('#showTownsButton').on('click', showTowns)

	function selectTown(event) {
		let $clickedTown = $(event.target)
		if ($clickedTown.css('background-color') == "rgb(221, 221, 221)") {
			$clickedTown.css('background-color', 'transparent');
			$clickedTown.removeAttr('data-selected')
		} else {
			$clickedTown.css('background-color', '#DDD')
			$clickedTown.attr('data-selected', true)
		}
	}

	function showTowns() {
		let output = $("[data-selected]").toArray().map(x => x.textContent).join(', ')
		$('#selectedTowns').text(output)
	}
}