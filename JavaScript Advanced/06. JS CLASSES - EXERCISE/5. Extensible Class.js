(function () {
    let count = 0;
    return class Extensible {
        constructor() {
            this.id = count++;
        }
        extend(template) {
            for (let property in template) {
                if (typeof (property) === "function") {
                    this.prototype[property] = template[property]
                    //Object.getPrototypeOf(this).property = template[property]
                } else {
                    this[property] = template[property];
                }
            }
        }
    }
})()

let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();
obj1.extensionProperty = "someString";
console.log(obj1.__proto__);
obj2[extend](obj1);
console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);
console.log(obj1);
console.log(obj2);
console.log(obj3);

//console.log(obj3.constructor.prototype);
