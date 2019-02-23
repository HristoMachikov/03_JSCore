function solve(inputArr) {
    
    let listProcessor = (function () {
        let innerArr = [];
        return {
            add: (currStr) => { innerArr.push(currStr) },
            remove: (currStr) => { innerArr = innerArr.filter(x => x !== currStr) },
            print: () => { console.log(innerArr.join(",")) }
        }
    })();

    inputArr.forEach(element => {
        let currCommand = element.split(" ")[0];
        let currStr = "";
        if (currCommand === "add" || currCommand === "remove") {
            currStr = element.split(" ")[1];
        }

        return listProcessor[currCommand](currStr)
    });
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])
solve(['add pesho', 'add gosho', 'add pesho', 'remove pesho','print'])