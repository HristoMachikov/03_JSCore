function dart() {
	let maxScore = 100;

	const colorMapping = {
		firstLayer: 0,
		secondLayer: 1,
		thirdLayer: 2,
		fourthLayer: 3,
		fifthLayer: 4,
		sixthLayer: 5
	}
	let isHome = true;

	$('#playBoard').on('click', 'div', onPlatBoardClick)
	//$('#playBoard div').on('click', platBoard)
	// function platBoard(e){
	// 	console.log(e.target.id)
	// 	e.stopPropagation();
	// }

	function onPlatBoardClick(e) {
		
		let points = getScore(e.target.id)
		applyScore(points)
		e.stopPropagation();
	}

	function getScore(id) {
		return +$('#scoreBoard')
			.find('tbody tr')
			.eq(colorMapping[id])
			.children()
			.eq(1)
			.text()
			.split(' ')[0];
	}

	function applyScore(score) {
		let selector = "";
		isHome ? selector = '#Home' : selector = '#Away'
		let $pointsElem;


		$pointsElem = $(selector).children().eq(0);
		$pointsElem.text((i, t) => Number(t) + score);

		//switch turns
		$('turns').children().eq(0).insertBefore()///////////

		let currentPoints = Number($pointsElem.text())
		if ($pointsElem >= maxScore) {
			//set coloring
			if (isHome) {
				$('#Home').children().eq(1).css({ backgroundColor: "green" })
				$('#Away').children().eq(1).css({ backgroundColor: "red" })
			} else {
				$('#Home').children().eq(1).css({ backgroundColor: "red" })
				$('#Away').children().eq(1).css({ backgroundColor: "green" })
			}


			//Remove events
			$('#playBoard').off('click')
		}

		isHome = !isHome;
	}


}