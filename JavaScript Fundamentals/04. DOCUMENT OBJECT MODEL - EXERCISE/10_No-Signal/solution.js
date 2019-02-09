function solve() {
	let divElem = document.getElementById("exercise").children[0];
	let x = getRandomArbitrary(1, 81);
	let y = getRandomArbitrary(1, 45);
	divElem.style.position = "relative";
	divElem.style.top = 5 * y + 'px';
	divElem.style.left = 5 * x + 'px';

	setTimeout(function () {
		solve()
	}, 2000);
	function getRandomArbitrary(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
} 