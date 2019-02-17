let solution = (function () {
    const add = ([Xa, Ya], [Xb, Yb]) => {
        return [Xa + Xb, Ya + Yb]
    }

    const multiply = ([Xa, Ya], scalar) => {
        return [Xa * scalar, Ya * scalar]
    }

    const length = ([A, B]) => {
        return Math.sqrt(A * A + B * B);
    }

    const dot = ([Xa, Ya], [Xb, Yb]) => {
        return Xa * Xb + Ya * Yb;
    }

    const cross = ([Xa, Ya], [Xb, Yb]) => {
        return Xa * Yb - Ya * Xb;
    }

    return {
        add,
        multiply,
        length,
        dot,
        cross
    }
})();
console.log(solution.cross([3, 7], [1, 0]));