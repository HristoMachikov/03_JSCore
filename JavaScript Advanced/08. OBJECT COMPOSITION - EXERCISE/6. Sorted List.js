function sortedList() {
    let collection = (() => {
        let numbers = [];
        let size = 0;
        const add = (element) => {
            numbers.push(element);
            numbers.sort((a, b) => a - b)
            this.size++;
            return
        };
        const remove = function(index) {
            
        }
    



        return { add ,remove,}

    })
    return collection;
}