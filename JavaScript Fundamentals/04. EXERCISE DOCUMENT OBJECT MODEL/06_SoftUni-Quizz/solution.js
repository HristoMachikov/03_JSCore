function solve() {
	let resultArr = [];
	let currAnswer = "";
	let rightAnswer = ["2013", "Pesho", "Nakov"]
	let couter = 0;
	let parentElem = document.getElementById("exercise");
	let arrRadio = Array.from(document.querySelectorAll('input[type="radio"]'));
	let arrBtn = Array.from(document.getElementsByTagName("button"));
	let resultElem = document.getElementById("result");
	arrRadio.forEach(function (element) {
		element.addEventListener('click', yourAnswer);
		function yourAnswer(event) {
			currAnswer = event.target.value;
		};
	});
	arrBtn.forEach(function (element) {
		element.addEventListener('click', nextLevel);
		function nextLevel(event) {
			let nameOfBtn = event.target.textContent;
			if (nameOfBtn == "Next question" && currAnswer != "") {
				resultArr.push(currAnswer);
				currAnswer = "";
				couter += 1;
				//parentElem.children[couter].removeAttribute("class");
				parentElem.children[couter].style.display = 'block';
				
			} else if (nameOfBtn == "Get the results" && currAnswer != "") {
				resultArr.push(currAnswer);
				currAnswer = "";
				let resultNumb = 0;
				for (let i = 0; i < rightAnswer.length; i++) {
					if (resultArr[i] == rightAnswer[i]) {
						resultNumb += 1;
					};
				};
				if (resultNumb == 3) {
					resultElem.textContent = "You are recognized as top SoftUni fan!";
				} else if (resultNumb < 3) {
					resultElem.textContent = `You have ${resultNumb} right answers`;
				};
			};
		};
	});
};