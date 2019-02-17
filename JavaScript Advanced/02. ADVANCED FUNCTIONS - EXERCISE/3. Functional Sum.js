function solve() {
    let output = (function () {
        let result = 0;
        function add(num) {
            result += num;
            return add;
        }
        add.toString = function () {
            return result;
        }
        return add;
    })();
    output(6)(6)
    output(6)
};
solve()
