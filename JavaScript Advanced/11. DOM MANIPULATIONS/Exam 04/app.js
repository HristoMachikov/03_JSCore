function dart() {
	const colorMapping = {
		firstLayer: 0,
		secondLayer: 1,
		thirdLayer: 2,
		fourthLayer: 3,
		fifthLayer: 4,
		sixthLayer: 5
	}
	let maxScore = 100;
	let isHome = true;
	$('#playBoard').on('click', 'div', onPlatBoardClick)

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
		let selectorOne = "";
		let selectorTwo = "";
		isHome ? selectorOne = '#Home' : selectorOne = '#Away'
		isHome ? selectorTwo = '#Away' : selectorTwo = '#Home'

		let $pointsElem = $(selectorOne).children().eq(0);
		$pointsElem.text((i, t) => Number(t) + score);

		//switch turns
		$('#turns').children().eq(0).text(`Turn on ${selectorTwo.replace("#", "")}`);
		$('#turns').children().eq(1).text(`Next is ${selectorOne.replace("#", "")}`);

		let currentPoints = Number($pointsElem.text())
		if (currentPoints >= maxScore) {
			//set coloring
			if (isHome) {
				$(selectorOne).children().eq(1).css({ backgroundColor: "green" })
				$(selectorTwo).children().eq(1).css({ backgroundColor: "red" })
			}
			//Remove events
			$('#playBoard').off('click', onPlatBoardClick)
		}
		isHome = !isHome;
	}
}