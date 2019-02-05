function solve() {

  document.getElementsByTagName('button')[0].addEventListener('click', () => {
    let furnitueList = JSON.parse(document.getElementsByTagName('textarea')[0].value);

    for (let furniture of furnitueList) {
      let div = document.createElement('div');
      div.setAttribute('class', 'furniture');
      let name = document.createElement('p');
      name.innerHTML = `Name: ${furniture.name}`;
      let img = document.createElement('img');
      img.setAttribute('src', furniture.img);
      let price = document.createElement('p');
      price.innerHTML = `Price: ${furniture.price}`;
      let decFactor = document.createElement('p');
      decFactor.innerHTML = `Decoration factor: ${furniture.decFactor}`;
      let checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');

      div.appendChild(name);
      div.appendChild(img);
      div.appendChild(price);
      div.appendChild(decFactor);
      div.appendChild(checkBox);

      document.getElementById('furniture-list').appendChild(div);
    }
  })

  document.getElementsByTagName('button')[1].addEventListener('click', () => {
    let arr = Array.from(document.getElementById('furniture-list').children);
    let resultArr = [];
    for (let furniture of arr) {
      let isChecked = furniture.getElementsByTagName('input')[0].checked;
      if (isChecked) {
        check = true;
        let obj = {
          "name": furniture.children[0].textContent.split(": ")[1],
          "price": Number((furniture.children[2].textContent.split(": "))[1]),
          "decFactor": Number((furniture.children[3].textContent.split(": "))[1])
        };
        resultArr.push(obj);
      }
    }
    let area = document.getElementsByTagName('textarea')[1];
    area.value += `Bought furniture: ${resultArr.map(el => el.name).join(', ')}\n`;

    let totalPrice = resultArr.map(el => el.price).reduce((a, b) => a + b);
    area.value += `Total price: ${totalPrice.toFixed(2)}\n`;

    let averageDecFavtor = (resultArr.map(el => el.decFactor)
      .reduce((a, b) => a + b)) / resultArr.length
    area.value += `Average decoration factor: ${averageDecFavtor}`;
  })
}