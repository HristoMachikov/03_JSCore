function dart() {
	let obj = {
		"firstLayer": 0,
		"secondLayer": 1,
		"thirdLayer": 2,
		"fourthLayer": 3,
		"fifthLayer": 4,
		"sixthLayer": 5
	}
	let isHome = true;
	let maxPoint = 100;

	let $leyers = $('#playBoard div');
	$leyers.on('click', getScore);

	function getScore(event) {
		let currLayer = event.target.id;
		event.stopPropagation();

		let currPoints = $('tbody tr').eq(obj[currLayer]).children().eq(1).text().split(' ')[0]

		let selectorOne
		let selectorTwo
		isHome === true ? selectorOne = "Home" : selectorOne = "Away";
		isHome === true ? selectorTwo = "Away" : selectorTwo = "Home";

		let $currPlayer = $(`#${selectorOne}`);
		let $currPlayerScore = $currPlayer.children().eq(0);
		$currPlayerScore.text(`${+$currPlayerScore.text() + +currPoints}`)

		$('#turns').children().eq(0).text(`Turn on ${selectorTwo}`)
		$('#turns').children().eq(1).text(`Next is ${selectorOne}`)

		if (+$currPlayerScore.text() >= 100) {
			$(`#${selectorOne}`).children().eq(1).css('background-color', 'green')
			$(`#${selectorTwo}`).children().eq(1).css('background-color', 'red')

			$leyers.off('click', getScore)
		}
	
		isHome = !isHome;
	}
}