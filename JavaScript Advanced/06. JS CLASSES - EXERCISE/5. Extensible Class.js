let Extensible = (function () {
    let count = 0;
    return class {
        constructor() {
            this.__proto__ = {}
            this.id = count++;
        }
        extend(template) {
            return class {
                constructor() {
                    
                }
            }
            if (typeof (template) === "function") {

            }

        }
        // get id(){
        //     console.log('get')
        //     return this._id;
        // }
        // set id(id){
        //     console.log('set')
        //     return this._id++;
        // }
    }
})();

let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();

console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);
for (const obj in obj3.constructor.prototype){
    console.log(type(obj))
}
//console.log(obj3.constructor.prototype);
