function extractText() {
    let result = Array.from($('#items li')).map(x => x.textContent);
    let resultElem = $('#result')
    resultElem.text(result.join(', '))
}
