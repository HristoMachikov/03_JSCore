function solve(inputArr, sortByStr) {
    let arr = [];
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination
            this.price = price
            this.status = status
        }
    }

    inputArr.forEach(function (element) {
        let currTickArr = element.split('|');
        let currDestination = currTickArr[0];
        let currPrice = +currTickArr[1];
        let currStatus = currTickArr[2];
        let currTicket = new Ticket(currDestination, currPrice, currStatus);
        arr.push(currTicket);
    });

    function sortTickets(criteria) {
        return  (a, b) => {
            if (a[criteria] > b[criteria]) {
                return 1;
            } else if (a[criteria] < b[criteria]) {
                return -1
            } else {
                return 0;
            }
        }
    };
    let sortArr = arr.sort(sortTickets(sortByStr));
    return sortArr;
}

console.log(solve(['Philadelphia|94.20|available',
 'New York City|95.99|available',
 'New York City|95.99|sold',
 'Boston|126.20|departed'],
'destination'
));