function solve() {
    Array.from(document.querySelectorAll('td > button')).forEach(elem => {
        elem.addEventListener('click', stadium)
    });
    document.querySelector('div > button').addEventListener('click', total);

    let totalSum = 0;
    let tatalFan = 0;

    function stadium(event) {
        let sectionElem = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        let currName = sectionElem.children[0].textContent;
        let currCol = (Array.from(document.querySelectorAll('td > button')).indexOf(event.target) % 15) % 3;
        let sectorCol = document.querySelector('table > thead > tr').children[currCol].textContent;
        let currPrice = 0;
        switch (sectorCol) {
            case "A": currName === "VIP" ? currPrice = 25 : currPrice = 10; break;
            case "B": currName === "VIP" ? currPrice = 15 : currPrice = 7; break;
            case "C": currName === "VIP" ? currPrice = 10 : currPrice = 5; break;
        }

        if (event.target.style.backgroundColor !== "rgb(255, 0, 0)") {
            event.target.style.backgroundColor = "rgb(255, 0, 0)"
            document.getElementsByTagName('textarea')[0].value
                += ` Seat ${event.target.innerHTML} in zone ${currName} sector ${sectorCol} was taken.\n` 
            totalSum += currPrice;
            tatalFan += 1;
        } else if (event.target.style.backgroundColor === "rgb(255, 0, 0)") {
            document.getElementsByTagName('textarea')[0].value
                += ` Seat ${event.target.innerHTML} in zone ${currName} sector ${sectorCol} is unavailable.\n`;  
        }
    }

    function total() {
        document.getElementsByTagName("span")[0].innerHTML = `${totalSum} leva, ${tatalFan} fans.`;
    }
}