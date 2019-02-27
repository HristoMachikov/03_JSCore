function solve(selector) {
    let htmlElem = document.querySelector(selector)
       // htmlElem.classList.add("highlight")

        (function changeClass(htmlElem) {
            if (htmlElem.hasChildNodes()) {
                htmlElem.className += 'highlight';
                changeClass(Array.from(htmlElem.childNodes).sort((a, b) => b.childNodes.length - a.childNodes.length)[0])
            }
        })(htmlElem);
}
// function highlight(selector) {
//     let element = document.querySelector(selector);

//     (function changeClass(element) {
//         if (element.hasChildNodes()) {
//             element.className += ' highlight';
//             changeClass(Array.from(element.childNodes).sort((a, b) => b.childNodes.length - a.childNodes.length)[0]);
//         }
//     })(element);
// }