function solve() {
  document.getElementsByTagName('button')[0].addEventListener('click', add);
   document.getElementsByTagName('button')[1].addEventListener('click', buy);
    document.getElementsByTagName('button')[2].addEventListener('click', endDay);


  let storag = {};
  let profit = 0;
  function add() {
    let val = JSON(document.getElementsByTagName('textarea')[0].value);
    for (let item of val) {
      if (!storag.hasOwnProperty(item.name)) {
        storag[item.name] = {
          price: item.price,
          quantity: item.quantity
        }
      } else {
        storag[item.name] = {
          price: item.price,
          quantity: storag[item.name].quantity + item.quantity
        }

      }

      document.
    }
  }

  function bay() {
    let product = JSON.parse(document.getElementsByTagName('textarea')[1].value);
    if(storag.hasOwnProperty(product.name) && storag[product.name].quantity >= product.quantity){

    }
  }

  function endDay() {
    

      document.getElementsByTagName('button')[0].removeEventListener('click', add);
   document.getElementsByTagName('button')[1].removeEventListener('click', buy);
    document.getElementsByTagName('button')[2].removeEventListener('click', endDay);
  }
}
