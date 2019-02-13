function solve(inputArr) {
    let commandProcessor = (function () {
        let str = "";
        return {
            append: (currStr) => str += currStr,
            removeStart: (currStr) => str = str.substr(Number(currStr)),
            removeEnd: (currStr) => str = str.substr(0, str.length - Number(currStr)),
            print: () => console.log(str)
        }
    })();

    inputArr.forEach(function (element) {
        let currCommand = element.split(" ")[0];
        let currStr = "";
        currCommand !== "print" ? currStr = element.split(" ")[1] : currStr
        commandProcessor[currCommand](currStr);
    });
}

solve(['append hello', 'append again', 'removeStart 3', 'removeEnd 4', 'print']);
// function commandProcessor(inputArr) {
//     let str = "";
//     inputArr.forEach(function (element) {
//         let currCommand = element.split(" ")[0];
//         let currStr = "";
//         currCommand !== "print" ? currStr = element.split(" ")[1] : currStr
//         switch (currCommand) {
//             case "append": str += currStr; break;
//             case "removeStart":
//                str = str.substr(Number(currStr));
//                 break;
//             case "removeEnd":
//                 str = str.substr(0, str.length - Number(currStr))
//                 break;
//             case "print": console.log(str); break;
//             default: break;
//         }
//     });
// };
// commandProcessor(['append 123',
//  'append 45',
//  'removeStart 2',
//  'removeEnd 1',
//  'print']
// );


// let f = (function() {
//   let counter = 0;
//   return function() {
//     console.log(++counter);
//   }
// })();
// f();
// f();
