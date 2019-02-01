function solve() {
    let stringElem = document.getElementById('str');
    let result = document.getElementById('result');

    let [text, wantedInfo] = stringElem.value.split(', ');

    let namePattern = / ([A-Z]+([a-zA-Z]*)?)(-[A-Z][a-zA-Z]*\.*)?-([A-Z][a-zA-Z]*)? /g;
    let airportPattern = / [A-Z]{3}\/[A-Z]{3} /g;
    let fligthNumberPattern = / [A-Z]{1,3}[\d]{1,5} /g;

    if (wantedInfo === "name") {
        let matchInfo = text.match(namePattern)[0];
        let name = matchInfo[0].trim().replace('-', " ");
        result.textContent = `Mr/Ms, ${name}, have a nice flight!`;
    }else if (wantedInfo === 'flight'){
        let airport = text.match(airportPattern)[0].trim().split("/");
        let flightNumber = text.match(fligthNumberPattern)[0].trim();
        result.textContent = `Your flight number ${flightNumber} is from ${airport[0]} to ${airport[1]}.`;
    }
    
}