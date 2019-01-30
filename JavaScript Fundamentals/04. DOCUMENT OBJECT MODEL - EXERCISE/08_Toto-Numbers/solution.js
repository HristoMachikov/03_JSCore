function solve() {
	let inputArrNumb = [];
	let btn = document.querySelector('#exercise button');
	btn.addEventListener('click', totoNumber);
	function totoNumber(event) {
		let inputArrElem = document.querySelector('#exercise input');
		let inputArrValue = inputArrElem.value;
		inputArrNumb = inputArrValue.split(' ');
		let checkedArrNumb = [];
		let check = true;
		let allNumbersElem = document.getElementById('allNumbers');
		if (inputArrNumb.length > 6 || inputArrNumb.length < 6) {
			check = false;
		}
		inputArrNumb.forEach(elem => {
			if (+elem < 49 && +elem > 0) {
				checkedArrNumb.push(elem);
			}
		});
		if (checkedArrNumb.length === 6 && check) {
			for (let i = 1; i <= 49; i++) {
				let newDivElem = document.createElement('div');
				newDivElem.setAttribute("class", "numbers");
				allNumbersElem.appendChild(newDivElem);
				let currNumbElem = allNumbersElem.children[i - 1];
				currNumbElem.textContent = i;
				if (checkedArrNumb.includes(i.toString())) {
					currNumbElem.style.backgroundColor = "orange";
				}
			}
			btn.setAttribute("disabled", true);
			inputArrElem.setAttribute("disabled", true);
		};
	};
};