function solve() {
  let inputArr = JSON.parse(document.getElementById('arr').value);
  let resultElem = document.getElementById('result');
  let pElem = document.createElement('p');
  let invalidDataPara = pElem.cloneNode();
  invalidDataPara.textContent = 'Invalid Data';
  let dashElem = document.pElem.cloneNode();
  dashElem.textContent = '---';

  let pattern = /^([A-Z][a-z]* [A-Z][a-z]*) (\+359 \d \d{3} \d{3}|\+359-\d-\d{3}-\d{3}) ([a-z0-9]+@[a-z]+\.[a-z]{2,3})$/g
  inputArr.forEach(element => {
    let match = pattern.exec(element)
    if (match) {
      let validElem = pElem.cloneNode();
      validElem.textContent = `Name: ${match[1]}`;
      resultElem.appendChild(validElem);

      insertValidElem(`Name: ${match[1]}`);
      insertValidElem(`Phone Number: ${match[2]}`);
      insertValidElem(`Email: ${match[3]}`);

    } else {
      resultElem.appendChild(invalidDataPara.cloneNode(true));
    }
    //.forEach(match)
    resultElem.appendChild(dashElem.cloneNode(true));
  })
  function insertValidElem(text) {
    let validElem = pElem.cloneNode();
    validElem.textContent = text;
    resultElem.appendChild(validElem);
  }
}

