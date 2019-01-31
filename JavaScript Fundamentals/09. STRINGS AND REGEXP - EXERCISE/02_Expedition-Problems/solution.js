function solve() {
  let keyWord = document.getElementById('str').value;
  let text = document.getElementById('text').value;
  let resultElem = document.getElementById('result');

  // let str = "Pesho 23";
  // let [name, age] = str.split(' ');

  let regex = /(east|north)[\s\S]*?([\d]{2})[^,]*?,[^,]*?([\d]{6})/gi;

  let east = "";
  let north = "";
  let m;
  while ((m = regex.exec(text) !== null)) {
    if (m[1].toUpperCase() === "NORTH") {
      north = `${m[2]}.${m[3]} N`;
    } else if (m[2].toUpperCase() === "EAST") {
      east = `${m[2]}.${m[3]} E`;
    }
  }

  let regExp = new RegExp(`${keyWord}(.*?)${keyWord}`, "g");
  let message = regExp.exec(text)[1];

  appendToParent(east);
  appendToParent(north)
  appendToParent(message);

  function appendToParent(text) {
    let p = document.createElement('p');
    p.textContent = text;
    resultElem.appendChild(p);
  }
}