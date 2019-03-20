class Hotel {
    constructor(name, capacity) {
        this.name = name, //string
            this.capacity = capacity, // number
            this.bookings, // array
            this.currentBookingNumber = 1,
            this.rooms // object
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
        if (value >= 10) {
            return this._capacity = value;
        }
    }

    get bookings() {
        if (this._bookings === undefined) {
            this._bookings = [];
        }
        return this._bookings;
    }

    set bookings(value) {
        return this._bookings = value;
    }

    get currentBookingNumber() {
        return this._currentBookingNumber;
    }

    set currentBookingNumber(value) {
        return this._currentBookingNumber = value;
    }

    get rooms() {
       if (this._rooms === undefined) {
            let single = Math.floor(this.capacity * 0.5);
            let double = Math.floor(this.capacity * 0.3);
            let maisonette = Math.floor(this.capacity * 0.2);

            this._rooms = { single, double, maisonette };
        }
        return this._rooms;
    }

    set rooms(value) {
        // let currObj = {
        //     single: value.single,
        //     double: value.double,
        //     maisonette: value.maisonette
        // }
        //console.log(currObj)
        return this._rooms = value;
    }

    get roomsPricing() {
        let obj = { single: 50, double: 90, maisonette: 135 }
        return obj;
    }

    get servicesPricing() {
        let obj = { food: 10, drink: 15, housekeeping: 25 }
        return obj;
    }

    rentARoom(clientName, roomType, nights) {
        let currBooking = { clientName, roomType, nights, roomNumber: 0 };
        if (this.roomsPricing.hasOwnProperty(roomType)
            && this.rooms[roomType] > 0
        ) {
            currBooking.roomNumber = this.currentBookingNumber;
            this.rooms[roomType] -= 1;
            this.bookings.push(currBooking);
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
        let currRoom = this.bookings
            .filter(x => x.roomNumber === currentBookingNumber)[0];
        if (currRoom) {
            if (this.servicesPricing.hasOwnProperty(serviceType)) {
                this.bookings.map(function (x) {
                    if (x.roomNumber === currentBookingNumber) {
                        if (!x.hasOwnProperty("services")) {
                            x.services = [];
                        }
                        x.services.push(serviceType);
                    }
                })
                return `Mr./Mrs. ${currRoom.clientName}, Your order for ${serviceType} service has been successful.`;
            } else {
                return `We do not offer ${serviceType} service.`;
            }
        } else {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
    }

    checkOut(currentBookingNumber) {
        let totalMoney = 0;
        let totalServiceMoney = 0;
        let removeRoom = (this.bookings
            .filter(x => x.roomNumber === currentBookingNumber))[0];
        if (removeRoom !== undefined) {
            let output = "";
            let removeType = removeRoom.roomType;
            this.bookings = this.bookings
                .filter(x => x.roomNumber !== currentBookingNumber);
            totalMoney = removeRoom.nights * this.roomsPricing[removeType];
            this.rooms[removeType] += 1;
            //this.currentBookingNumber--;
            output += `We hope you enjoyed your time here, Mr./Mrs. ${removeRoom.clientName}. The total amount of money you have to pay is ${totalMoney} BGN.`;
            if (removeRoom.hasOwnProperty("services")) {
                for (const service of removeRoom.services) {
                    totalServiceMoney += this.servicesPricing[service];
                }
                output = `We hope you enjoyed your time here, Mr./Mrs. ${removeRoom.clientName}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN. You have used additional room services, costing ${totalServiceMoney} BGN.`;
            }
            return output;
        } else {
            return `The booking ${currentBookingNumber} is invalid.`;
        }
    }

    report() {
        let output = "";
        if (this.bookings.length > 0) {
            output += `${this.name.toUpperCase()} DATABASE:\n`;
            output += `${"-".repeat(20)}\n`;
            this.bookings.forEach((obj, i) => {
                output += `bookingNumber - ${obj.roomNumber}\n`;
                output += `clientName - ${obj.clientName}\n`;
                output += `roomType - ${obj.roomType}\n`;
                output += `nights - ${obj.nights}\n`;
                if (obj.services) {
                    output += `services: ${obj.services.join(', ')}\n`;
                }
                output += `${i !== this.bookings.length - 1 ? "-".repeat(10) : ""}\n`;
            });
        } else {
            output += `${this.name.toUpperCase()} DATABASE:\n`;
            output += `${"-".repeat(20)}\n`;
            output += "There are currently no bookings.\n";
        }
        return output.trim();
    }
}

let hotel = new Hotel('HotUni', 10);

console.log(hotel.rentARoom('Peter', 'single', 4));
console.log(hotel.rentARoom('Robert', 'double', 4));
console.log(hotel.rentARoom('Geroge', 'maisonette', 6));

console.log(hotel.roomService(3, 'housekeeping'));
console.log(hotel.roomService(3, 'drink'));
console.log(hotel.roomService(2, 'room'));

console.log(hotel.report());
console.log(hotel.checkOut(3));

console.log(hotel.report());

console.log(hotel.rentARoom('Peter2', 'double', 4));
console.log(hotel.rentARoom('Peter3', 'double', 4));
console.log(hotel.rentARoom('Peter4', 'double', 4));
console.log(hotel.rentARoom('Peter5', 'single', 4));
console.log(hotel.rentARoom('Peter4', 'double', 4));
