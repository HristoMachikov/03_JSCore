let result = (function solve() {
    let count = 0;
    return class Extensible {
        constructor() {
            this.id = count++;
        }
        extend(template) {
            for (let property in template) {
                if (typeof template[property] == "function") {
                   // Extensible.prototype[property] = template[property]
                    Object.getPrototypeOf(this)[property] = template[property]
                } else {
                    this[property] = template[property];
                }
            }
        }
    }
})();
function doSomething() { 1 }
console.log(doSomething.prototype);
let obj1 = new result();
let obj3 = new result();
let temp = {
    template: {
        extensionMethod: function () { 1 },
        extensionPropertyS: 'someString2'
    }
}
obj1.__proto__.extend = function () { 2 };
obj1.extensionProperty = "someString";
console.log(obj1.__proto__);
console.log(obj1.prototype);
let obj2 = new result();
obj2.extend(temp);
console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);
console.log(obj1.__proto__);
console.log(obj2);
console.log(obj3.__proto__);

//console.log(obj3.constructor.prototype);
