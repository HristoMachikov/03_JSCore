class Hotel {
    constructor(name, capacity) {
        this.name = name, //string
            this.capacity = capacity, // number
            this.booking = [],
            this.currentBookingNumber = 1,
            this.rooms = { single: 0, double: 0, maisonette: 0 }
    }
    get name() {
        return this._name;
    }

    set name(value) {
        return this._name = value;
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(value) {
        return this._capacity = value;
    }

    get booking() {
        return this._booking;
    }

    set booking(value) {
        return this._booking = value;
    }

    get currentBookingNumber() {
        return this._currentBookingNumber;
    }

    set currentBookingNumber(value) {
        return this._currentBookingNumber = value;
    }

    get roomsPricing() {
        let obj = { single: 50, double: 90, maisonette: 135 }
        return obj;
    }

    get servicesPricing() {
        let obj = { food: 10, drink: 15, housekeeping: 25 }
        return obj;
    }

    get rooms() {
        return this._rooms;
    }
    set rooms(value) {
        // let obj = { single: 0, double: 0, maisonette: 0 }
        //if (this.capacity >= 10) {
        value.single = Math.floor(this.capacity * 0.5);
        value.double = Math.floor(this.capacity * 0.3);
        value.maisonette = Math.floor(this.capacity * 0.2);
        //  }
        return this._rooms = value;
    }

    rentARoom(clientName, roomType, nights) {
        let currBooking = { clientName, roomType, nights, roomNumber: 0 };
        if (this.roomsPricing.hasOwnProperty(roomType)
            && this.rooms[roomType] > 0
        ) {
            currBooking.roomNumber = this.currentBookingNumber;
            //  this.currentBookingNumber += 1;
            this.capacity -= 1;
            this.booking.push(currBooking);
            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber++}.`;
        } else {
            let output = `No ${roomType} rooms available!`;
            for (let room of Object.keys(this.rooms)) {
                if (this.rooms[room] > 0) {
                    output += ` Available ${room} rooms: ${this.rooms[room]}.`;
                }
            }
            return output;

        }

    }

    roomService(currentBookingNumber, serviceType) {

    }

    checkOut(currentBookingNumber) {
        let totalMoney = 0;
        let removeRoom = this.booking
            .filter(x => x.roomNumber === currentBookingNumber);
        //console.log(removeRoom[0])
        if (removeRoom[0]) {
            let output = "";
            let removeType = removeRoom[0].roomType
            this.booking = this.booking
                .filter(x => x.roomNumber !== currentBookingNumber);
            totalMoney = removeRoom[0].nights * this.roomsPricing[removeType]

            this.rooms[removeType] += 1;

            output += `We hope you enjoyed your time here, Mr./Mrs. ${removeRoom[0].name}. The total amount of money you have to pay is ${totalMoney} BGN.`;
            // if (false) {
            //     output += ` You have used additional room services, costing {totalServiceMoney} BGN.`;
            // }
            return output;
        } else {
            return `The booking ${currentBookingNumber} is invalid.`
        }

    }

    report() {
        let output = "";

        if (this.booking.length > 0) {
            output += `${this.name.toUpperCase()} DATABASE:\n`;
            output += "--------------------\n";
            let count = 0;
            for (let obj of this.booking) {
                output += `bookingNumber - ${++count}\n`;
                output += `clientName - ${obj.clientName}\n`;
                output += `roomType - ${obj.roomType}\n`;
                output += `nights - ${obj.nights}\n`;
                if (obj.services) {
                    output += `services - ${obj.services}\n`;
                }
                output += "----------\n";

            }
        } else {
            output += `${this.name.toUpperCase()} DATABASE:\n`;
            output += "--------------------\n";
            output += " There are currently no bookings.\n";
        }
        return output.trim();
    }

}

let hotel = new Hotel('HotUni', 10);


console.log(hotel.rentARoom('Peter', 'single', 4));
console.log(hotel.rentARoom('Robert', 'double', 4));
console.log(hotel.rentARoom('Geroge', 'maisonette', 6));

//console.log(hotel.rentARoom("za", "single", 2));
hotel.checkOut(4);
