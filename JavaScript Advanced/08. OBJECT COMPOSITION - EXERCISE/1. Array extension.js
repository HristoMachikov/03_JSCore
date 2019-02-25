(function solve() {
    Array.prototype.last = function () {
        let lastElem = this.length - 1;
        return this[lastElem];
    };
    Array.prototype.skip = function (n) {
        let resultArr = [];
        for (let i = n; i < this.length; i++) {
            resultArr.push(this[i]);
        }
        return resultArr;
    };
    Array.prototype.take = function (n) {
        let resultArr = [];
        for (let i = 0; i < n; i++) {
            resultArr.push(this[i]);
        }
        return resultArr;
    };
    Array.prototype.sum = function () {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += this[i];
        }
        return sum;
    };
    Array.prototype.average = function () {
        return this.sum() / this.length;
    };
})();
