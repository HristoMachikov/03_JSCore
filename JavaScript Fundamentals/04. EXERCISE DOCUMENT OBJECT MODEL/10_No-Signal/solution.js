function solve() {
	let divElem = document.getElementById("exercise").children[0];
	let widthNumb = getRandomArbitrary(1, 81);
	let heightNumb = getRandomArbitrary(1, 45);
	divElem.style.width = "81%";
	divElem.style.height = "45vh";
	// 	divElem.style.width = `${widthNumb}%`;
	// divElem.style.height = `${heightNumb}vh`;
	setTimeout(function () {
		//solve()
	}, 2000);
	function getRandomArbitrary(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
}