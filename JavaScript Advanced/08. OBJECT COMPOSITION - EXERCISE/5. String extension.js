String.prototype.ensureStart = function (substring) {
    if ((!this.startsWith(substring))) {
        return `${substring}${this}`;
    }
    return this.toString();
}
String.prototype.ensureEnd = function (substring) {
    if ((!this.endsWith(substring))) {
        return `${substring}${this}`;
    }
    return this.toString();
}
String.prototype.isEmpty = function () {
    return this.length === 0;
}
String.prototype.truncate = function (n) {
    if (n < 4) {
        return ".".repeat(n);
    }
    if (n >= this.length) {
        return this.toString();
    }
    const lastIndexOfSpace = this.toString().substr(0, n - 2).lastInfexOf(' ');
    if (lastIndexOfSpace !== -1) {
        return this.substr(0, lastIndexOfSpace) + "...";
    } else {
        return this.substr(0, n - 3) + '...';
    }
}

String.format = function (string, ...params) {
    for (let i = 0; i < params.length; i++) {
        string = string.replace(`{${i}}`, params[i]);
    }
    return string;
}