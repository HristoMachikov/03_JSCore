function sortedList() {
    let collection = (function () {
        let list = [];
        let size = 0;
        const add = function (element) {
            list.push(element);
            list.sort((a, b) => a - b)
            this.size++;
            return
        };
        const remove = function (index) {
            if (this.list.length > index && index >= 0) {
                this.list.splice(index, 1);
                this.size--;
                return this.list;
            }
        };

        let get = function (index) {
            if (this.list.length > index && index >= 0) {
                return this.list[index];
            }
        };

        return { add, remove, get, size }

    })()
    return collection;
}