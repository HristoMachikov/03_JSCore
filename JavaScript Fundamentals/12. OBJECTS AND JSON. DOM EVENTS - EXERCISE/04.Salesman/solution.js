function solve() {
  document.getElementsByTagName('button')[0].addEventListener('click', load);
  document.getElementsByTagName('button')[1].addEventListener('click', buy);
  document.getElementsByTagName('button')[2].addEventListener('click', endDay);

  let storag = {};
  let profit = 0;
  //let logElem = document.getElementsByTagName('textarea')[2];
  function load() {
    let val = JSON.parse(document.getElementsByTagName('textarea')[0].value);
    for (let item of val) {
      if (!storag.hasOwnProperty(item.name)) {
        storag[item.name] = {
          "price": item.price,
          "quantity": item.quantity
        }
      } else {
        storag[item.name] = {
          "price": item.price,
          "quantity": storag[item.name].quantity + item.quantity
        }
      }
      document.getElementsByTagName('textarea')[2].value += `Successfully added ${storag[item.name].quantity} ${item.name}. Price: ${storag[item.name].price}\n`;
    }
  }

  function buy() {
    let product = JSON.parse(document.getElementsByTagName('textarea')[1].value);
    if (storag.hasOwnProperty(product.name) && storag[product.name].quantity >= product.quantity) {
      let orderMoney = product.quantity * storag[product.name].price;
      document.getElementsByTagName('textarea')[2].value += `${product.quantity} ${product.name} sold for ${orderMoney}.\n`;
      storag[product.name].quantity -= product.quantity;
      profit += orderMoney;
    } else {
      document.getElementsByTagName('textarea')[2].value += "Cannot complete order.\n";
    }
  }

  function endDay() {
    document.getElementsByTagName('textarea')[2].value += `Profit: ${profit.toFixed(2)}.\n`;
    document.getElementsByTagName('button')[0].removeEventListener('click', load);
    document.getElementsByTagName('button')[1].removeEventListener('click', buy);
    document.getElementsByTagName('button')[2].removeEventListener('click', endDay);
  }
}