function sortArray(arr, command) {

    var sortAsc = function (x, y) {
        if (x > y) {
            return 1;
        } else if (x < y) {
            return -1
        } else return 0;
    };
    var sortDesc = function (x, y) {
        if (x < y) {
            return 1;
        } else if (x > y) {
            return -1
        } else return 0;
    };
    
    var sortedResult = {
        "asc": sortAsc,
        "desc": sortDesc
    }
    return arr.sort(sortedResult[command]);
}
sortArray([14, 7, 17, 6, 8], 'desc')