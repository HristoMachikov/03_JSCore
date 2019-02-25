function solve() {
    let myObj = {
        extend: function (template) {
            for (let property in template) {
                if (typeof template[property] === "function") {
                    myObj.__proto__[property] = template[property]
                    //Object.getPrototypeOf(this)[property] = template[property]
                } else {
                    this[property] = template[property];
                }
            }
        }
    };
    return myObj;
}