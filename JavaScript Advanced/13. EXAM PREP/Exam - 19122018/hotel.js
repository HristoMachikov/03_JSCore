class Hotel {
    constructor(name, capacity) {
        this.name = name,
            this.capacity = capacity,
            this.bookings = [],
            this.currentBookingNumber = 1,
            this.rooms = {
                "single": Math.floor(this.capacity * 0.5),
                "double": Math.floor(this.capacity * 0.3),
                "maisonette": Math.floor(this.capacity * 0.2)
            }
    }

    get roomsPricing() {
        return { "single": 50, "double": 90, "maisonette": 135 }
    }

    get servicesPricing() {
        return { "food": 15, "drink": 15, "housekeeping": 25 };
    }

    rentARoom(clientName, roomType, nights) {
        let output = "";
        if (this.rooms[roomType] !== undefined) {
            let currClient = { clientName, roomType, nights }
            currClient.roomNumber = this.currentBookingNumber;
            currClient.services = [];
            this.bookings.push(currClient);
            this.rooms.roomType--;
            output = `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber++}.`;
        } else {
            output = `No ${roomType} rooms available!`;
            for (const room in this.rooms) {
                if (this.rooms.roomType) {
                    output += ` Available ${room} rooms: ${this.rooms.room}`;
                }
            }
        }
        return output;
    }

    roomService(currentBookingNumber, serviceType) {
        let currBooking = this.bookings.filter(book => book.roomNumber === currentBookingNumber)[0];
        if (currBooking !== undefined) {
            if (this.servicesPricing.hasOwnProperty(serviceType)) {
                currBooking.services.push(serviceType);
                return `Mr./Mrs. ${currBooking.clientName}, Your order for ${serviceType} service has been successful.`;
            } else {
                return `We do not offer ${serviceType} service.`;
            }

        } else {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
    }

    checkOut(currentBookingNumber) {
        let currBooking = this.bookings.filter(book => book.roomNumber === currentBookingNumber)[0];
        if (currBooking !== undefined) {
            let totalServiceMoney = 0;
            let totalMoney = currBooking.nights * this.roomsPricing[currBooking.roomType];
            this.rooms[currBooking.roomType] += 1;
            if (currBooking.services.length > 0) {
                for (const service of currBooking.services) {
                    totalServiceMoney += this.servicesPricing[service];
                }
                return `We hope you enjoyed your time here, Mr./Mrs. ${currBooking.clientName}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN. You have used additional room services, costing ${totalServiceMoney} BGN.`;
            } else {
                return `We hope you enjoyed your time here, Mr./Mrs. ${currBooking.clientName}. The total amount of money you have to pay is ${totalMoney} BGN.`;
            }

        } else {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
    }

    report() {
        let output = `${this.name.toUpperCase()} DATABASE:\n`;
        output += "-".repeat(20);
        output += "\n";
        if (this.bookings.length > 0) {
            let count = 1;
            for (const book of this.bookings) {
                output += `bookingNumber – ${book.roomNumber}\n`;
                output += `clientName – ${book.clientName}\n`;
                output += `roomType – ${book.roomType}\n`;
                output += `nights – ${book.nights}\n`;
                if (book.services.length > 0) {
                    output += `services: ${book.services.join(', ')}\n`;
                }
                if (count !== this.bookings.length) {
                    output += "-".repeat(10);
                    output += "\n";
                }
                count++;
            }
        } else {
            output += 'There are currently no bookings.';
        }
        return output;
    }

}

let hotel = new Hotel('HotUni', 10);

console.log(hotel.rentARoom('Peter', 'single', 4));
console.log(hotel.rentARoom('Robert', 'double', 4));
console.log(hotel.rentARoom('Geroge', 'maisonette', 6));

console.log(hotel.roomService(3, 'housekeeping'));
console.log(hotel.roomService(3, 'drink'));
console.log(hotel.roomService(2, 'room'));

console.log(hotel.checkOut(3));
console.log(hotel.checkOut(2));

console.log(hotel.report());