function sortedList() {
    let collection = (function () {
        let list = [];
        let size = 0;
        const add = function (element) {
            list.push(element);
            list.sort((a, b) => a - b)
            this.size++;
        };
        const remove = function (index) {
            if (list.length > index && index >= 0) {
                list.splice(index, 1);
                this.size--;
            }
        };

        const get = function (index) {
            if (list.length > index && index >= 0) {
                return list[index];
            }
        };

        return { add, remove, get, size }

    })()
    return collection;
}