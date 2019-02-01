function solve() {
  let keyWord = document.getElementById('str').value;
  let text = document.getElementById('text').value;
  let resultElem = document.getElementById('result');

  let pattern = /(east|north).*?([\d]{2})[^,]*?,[^,]*?([\d]{6})/ig;
  let massPatt = RegExp(`${keyWord}(.+?)${keyWord}`, "g");
  let east;
  let north;
  let message;
  let execArr;
  while ((execArr = pattern.exec(text)) !== null) {
    let currDirection = execArr[1].toLowerCase();
    if (currDirection === "east") {
      east = `${execArr[2]}.${execArr[3]} E`;
    } else if (currDirection === "north") {
      north = `${execArr[2]}.${execArr[3]} N`;
    }
  };

  let currMass;
  if ((currMass = massPatt.exec(text)) !== null) {
    message = `Message: ${currMass[1]}`;
  }

  appendToResultElem(north);
  appendToResultElem(east);
  appendToResultElem(message);

  function appendToResultElem(elem) {
    let p = document.createElement('p');
    p.textContent = elem;
    resultElem.appendChild(p);
  }

  // // Exercese solution
  // // let str = "Pesho 23";
  // // let [name, age] = str.split(' ');

  // let regex = /(east|north)[\s\S]*?([\d]{2})[^,]*?,[^,]*?([\d]{6})/gi;
  // let east = "";
  // let north = "";
  // let m;
  // while ((m = regex.exec(text)) !== null) {
  //   if (m[1].toUpperCase() === "NORTH") {
  //     north = `${m[2]}.${m[3]} N`;
  //   } else if (m[1].toUpperCase() === "EAST") {
  //     east = `${m[2]}.${m[3]} E`;
  //   }
  // };

  // let regExp = new RegExp(`${keyWord}(.*?)${keyWord}`, "g");
  // let message = regExp.exec(text)[1];
  // appendToParent(north);
  // appendToParent(east);
  // appendToParent(message);

  // function appendToParent(text) {
  //   let p = document.createElement('p');
  //   p.textContent = text;
  //   resultElem.appendChild(p);
  // };
}