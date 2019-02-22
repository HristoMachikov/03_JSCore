class SortedList {
    constructor() {
        this.list = []
        this.size = 0
    }

    add(element) {
       // if (!isNaN(element) && element % element == 0) {
            this.list.push(element);
            this.size++;
            this.list.sort((a, b) => a - b);
            return this.list;
      //  }
    }

    remove(index) {
        if (this.list.length > index && index >= 0) {
            this.list.splice(index, 1);
            this.size--;
            return this.list;
        }
    }

    get(index) {
        if (this.list.length > index && index >= 0) {
            return this.list[index];
        }
    }
}
let list = new SortedList;
list.add(1)
list.add(5)
list.add(1)
list.remove(1)
list.add({})
list.add({})
list.add(NaN)
list.add('Hello')
list.add([() => { 1 }, () => { 2 }, () => { 3 }])
console.log(list.size)
console.log(list.get(6))