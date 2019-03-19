class Hotel {
    constructor(name, capacity) {
        this.name = name, //string
            this.capacity = capacity, // number
            this.booking ,  
            this.currentBookingNumber = "1",
            this.rooms //= {  //
        // single: Math.floor(this.capacity * 0.5),
        // double: Math.floor(this.capacity * 0.3),
        // maisonette: Math.floor(this.capacity * 0.2)
        // }
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
        } else {
            return this._capacity = 10;
        }
    }

    get booking() {
        if (this._booking === undefined) {
            this._booking = [];
        }
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
        value.single = Math.floor(this.capacity * 0.5);
        value.double = Math.floor(this.capacity * 0.3);
        value.maisonette = Math.floor(this.capacity * 0.2);
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
            currBooking.roomNumber = +this.currentBookingNumber;
            this.rooms[roomType] -= 1;
            this.capacity--;
            this.booking.push(currBooking);
            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${+this.currentBookingNumber++}.`;
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
        let currRoom = this.booking
            .filter(x => x.roomNumber === currentBookingNumber)[0];
        if (currRoom) {
            if (this.servicesPricing.hasOwnProperty(serviceType)) {
                this.booking.map(function (x) {
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
        let removeRoom = (this.booking
            .filter(x => x.roomNumber === currentBookingNumber))[0];
        if (removeRoom) {
            let output = "";
            let removeType = removeRoom.roomType;
            this.booking = this.booking
                .filter(x => x.roomNumber !== currentBookingNumber);
            totalMoney = removeRoom.nights * this.roomsPricing[removeType];
            this.rooms[removeType] += 1;
            this.capacity++;
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

        if (this.booking.length > 0) {
            output += `${this.name.toUpperCase()} DATABASE:\n`;
            output += `${"-".repeat(20)}\n`;
            let count = 0;
            for (let obj of this.booking) {
                output += `bookingNumber - ${++count}\n`;
                output += `clientName - ${obj.clientName}\n`;
                output += `roomType - ${obj.roomType}\n`;
                output += `nights - ${obj.nights}\n`;
                if (obj.services) {
                    output += `services: ${obj.services.join(', ')}\n`;
                }
                output += `${count !== this.booking.length ? "-".repeat(10) : ""}\n`;
            }
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
//console.log(hotel.checkOut(2));
console.log(hotel.report());

console.log(hotel.rentARoom('Peter2', 'double', 4));
console.log(hotel.rentARoom('Peter3', 'double', 4));
console.log(hotel.rentARoom('Peter4', 'double', 4));
console.log(hotel.rentARoom('Peter5', 'single', 4));
console.log(hotel.rentARoom('Peter4', 'double', 4));