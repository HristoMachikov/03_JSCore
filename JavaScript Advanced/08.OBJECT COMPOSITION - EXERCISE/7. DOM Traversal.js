function solve(selector) {
    let htmlElem = document.querySelector(selector);
    (function changeClass(htmlElem) {
        if (htmlElem.hasChildNodes()) {
            htmlElem.classList.add("highlight")
            changeClass(Array.from(htmlElem.childNodes).sort((a, b) => b.childNodes.length - a.childNodes.length)[0])
        }
    })(htmlElem);
}