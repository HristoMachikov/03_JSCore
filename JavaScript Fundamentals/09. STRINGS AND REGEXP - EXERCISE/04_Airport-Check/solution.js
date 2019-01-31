function solve() {
    let string = document.getElementById('str').value;
    let result = document.getElementById('result');

    let [text, wantedInfo] = string.value.split(', ');
    let message;

    let namePattern = / ([A-Z]+([a-zA-Z]*)?)(-[A-Z][a-zA-Z]*\.*)?-([A-Z][a-zA-Z]*)? /g;
    let airportPattern = / [A-Z]{3}\/[A-Z]{3} /g;
    let fligthNumberPattern = / [A-Z]{1,3}[\d]{1,5} /g

    let matchInfo = text.match(namePattern);

    if (wantedInfo === "name") {
        let matchInfo = text.match(namePattern)[0];
        let name = matchInfo[0].trim().replace('-', " ");
        result.textContent = `Mr/Ms, ${name}, have a nice flight!`;

    }else if (wantedInfo == 'fligth'){
        let airport = text.match(airportPattern)[0].split('/').trim();
        let flightNumber = text.match(fligthNumberPattern)[0].trim();
        result.textContent = `Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`;
    }


}