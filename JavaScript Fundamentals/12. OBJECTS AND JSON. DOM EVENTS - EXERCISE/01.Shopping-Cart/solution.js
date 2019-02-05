function solve() {
    let btnArr = Array.from(document.querySelectorAll('#exercise button'));
    btnArr.forEach(btn => {
        btn.addEventListener('click', shoppingCart);
    })
    let totalArr = [];
    let totalPrice = 0;
    let resultElem = document.querySelector("textarea");

    function shoppingCart(event) {
        let nameOfBtn = event.target.textContent;
        if (nameOfBtn === "Buy") {
            let products = totalArr.map(elem => elem.prooduct).join(', ');
            let totalPrice = totalArr.map(el => el.price).reduce((a, b) => a + b);
            resultElem.textContent += `You bought ${products} for ${totalPrice.toFixed(2)}.\n`;
        } else if (nameOfBtn === "Add to cart") {
            let currParent = event.target.parentNode;
            let currPicture = currParent.children[0].src;
            let currProduct = currParent.children[1].textContent;
            let currPrice = Number(currParent.children[2].textContent.split(' ')[1]);

            let currObj = {
                "picture": currPicture,
                "prooduct": currProduct,
                "price": currPrice
            };
            if (totalArr.length === 0) {
                totalArr.push(currObj);
            } else {
                let findProp = totalArr.find(el => el.prooduct === currProduct)
                if (findProp !== undefined) {
                    findProp.price += currPrice;
                } else {
                    totalArr.push(currObj);
                }
            }
            totalPrice += Number(currPrice);
            resultElem.textContent += `Added ${currObj.prooduct} for ${currObj.price.toFixed(2)} to the cart.\n`;

            //.filter((el, idx, arr) => {
            //     if(arr.indexOf(el) === idx){
            //         return el;
            //     }
            // })

            //.map(e => e.price).reduce((a, b) => a + b));
        }
    }
}