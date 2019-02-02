function solve() {
    let stringElem = document.getElementById('str');
    let resultElem = document.getElementById('result');
    let [text, wantedInfo] = stringElem.value.split(', ');

    let namePattern = / ([A-Z]+([A-Za-z]*)?)(-[A-Z][A-Za-z]*\.)?-([A-Z][A-Za-z]*)? /g;
    //                / [A-Z]+[a-z]*(-[A-Z]+[a-z]*\.)?-[A-Z]+[a-z]* /g;
    //let namePattern = / ([A-Z]+([a-zA-Z]*)?)(-[A-Z][a-zA-Z]*\.)?-([A-Z][a-zA-Z]*)? /g;
    let airportPattern = / [A-Z]{3}\/[A-Z]{3} /g;
    let fligthNumberPattern = / [A-Z]{1,3}[\d]{1,5} /g;
    let companyPattern = /- ([A-Z]+([A-Za-z]*)?)\*([A-Z][A-Za-z]*)? /g;
    //- [A-Z]+[a-z]*\*[A-Z]+[a-z]* /g;

    if (wantedInfo === "name") {
        let matchName = text.match(namePattern)[0];
        let name = matchName.trim().replace('-', " ");
        resultElem.textContent = `Mr/Ms, ${name}, have a nice flight!`;
    } else if (wantedInfo === 'flight') {
        let airport = text.match(airportPattern)[0].trim().split("/");
        let flightNumber = text.match(fligthNumberPattern)[0].trim();
        resultElem.textContent = `Your flight number ${flightNumber} is from ${airport[0]} to ${airport[1]}.`;
    } else if (wantedInfo === 'company') {
        let companyName = text.match(companyPattern)[0].slice(1).trim(' ').split('*').join(' ');
        resultElem.textContent = `Have a nice flight with ${companyName}.`;
    } else if (wantedInfo === 'all') {
        let matchName = text.match(namePattern)[0];
        
        let name = matchName.trim().replace('-', " ");
        let airport = text.match(airportPattern)[0].trim().split("/");
        let flightNumber = text.match(fligthNumberPattern)[0].trim();
        let companyName = text.match(companyPattern)[0].slice(1).trim(' ').split('*').join(' ');
        resultElem.textContent = `Mr/Ms, ${name}, your flight number ${flightNumber} is from ${airport[0]} to ${airport[1]}. Have a nice flight with ${companyName}.`;
    }
}