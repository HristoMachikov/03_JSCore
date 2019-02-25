(function solve() {
    let arr = [1, 2, 3];
    arr.prototype.last = () => {
        let lastElem = this.length - 1;
        return this[lastElem];
    };
    arr.prototype.skip = (n) => {
        let resultArr = [];
        for (let i = n; i < this.length; i++) {
            resultArr.push(this[i]);
        }
        return resultArr;
    };
    arr.prototype.take = (n) => {
        let resultArr = [];
        for (let i = 0; i < n; i++) {
            resultArr.push(this[i]);
        }
        return resultArr;
    };
    arr.prototype.sum = () => {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += this[i];
        }
        return sum;
    };
    arr.prototype.average = () => {
        return this.sum() / this.length;
    };
})();
