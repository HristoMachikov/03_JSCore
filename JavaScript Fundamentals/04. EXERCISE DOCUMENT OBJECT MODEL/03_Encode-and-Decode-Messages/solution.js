function solve() {
	let btnArray = Array.from(document.getElementsByTagName('button'));
	btnArray.forEach(function (btn) {
		btn.addEventListener('click', doSometing);
		function doSometing(elem) {
			let currentBtnElem = elem.target
			let currentParentElem = currentBtnElem.parentNode;
			let currMassageElem = currentParentElem.children[1];
			let decodeStr = "";
			let encodeStr = "";
			if (currentBtnElem.textContent == "Encode and send it") {
				currMassageElem.value.split('').forEach(element => {
					let deCurrChar = element.charCodeAt(0) + 1;
					decodeStr += String.fromCharCode(deCurrChar);
				});

				btnArray[1].parentNode.children[1].value = decodeStr;
				currMassageElem.value = "";
			} else if (currentBtnElem.textContent == "Decode and read it") {
				currMassageElem.value.split('').forEach(elem => {
					let enCurrChar = elem.charCodeAt(0) - 1;
					encodeStr += String.fromCharCode(enCurrChar);
				});
				btnArray[1].parentNode.children[1].value = encodeStr;
			}
		}
	});
};