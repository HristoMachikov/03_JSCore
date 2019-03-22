class LineManager {
    constructor(stops) {
        this.stops = stops, // Array
            this.currentStop = this.stops[0], // Object
            this.duration = 0 // Number
    }

    // get currentStop() {
    //     return this._currentStop;
    // }

    // set currentStop(value) {
    //     return this._currentStop = value;
    // }

    // get duration() {
    //     return this._duration;
    // }

    // set duration(value) {
    //     return this._duration = value;
    // }

    get stops() {
        return this._stops;
    }

    set stops(value) {
        value.forEach(stop => {
            if (stop.name !== ""
                && typeof stop.name === "string"
                && stop.timeToNext >= 0
                && typeof stop.timeToNext === "number") {
            } else {
                throw "Name should be a non-empty string and time should be a positive number!";
            }
        });
        return this._stops = value;
    }

    get atDepot() {
        let lastStop = this.stops[this.stops.length - 1];
        if (this.currentStop.name === lastStop.name && this.currentStop.timeToNext === 0) {
            return true;
        } else {
            return false;
        }
    }

    get nextStopName() {
        if (this.atDepot) {
            return "At depot.";
        } else {
            let index = this.stops.indexOf(this.currentStop);
            return this.stops[index + 1].name;
        }
    }

    get currentDelay() {
        let timeExact = 0;
        let index = this.stops.indexOf(this.currentStop);
        for (let i = 0; i < index; i++) {
            timeExact += this.stops[i].timeToNext;
        }
        let delay = this.duration - timeExact;
        return delay;
    }

    arriveAtStop(minutes) {
        if (minutes >= 0 && typeof minutes === "number") {
            if (this.atDepot) {
                throw "last stop reached";
            } else {

                let index = this.stops.indexOf(this.currentStop);
                this.currentStop = this.stops[index + 1];
                this.duration += minutes;
                return true;
            }
        } else {
            throw "minutes cannot be negative";
        }
    }

    toString() {
        //let index = 0;
        // if (this.stops.indexOf(this.currentStop) !== -1) {
        let index = this.stops.indexOf(this.currentStop);
        //}

        let stepsCovered = index;
        let nextStop = "";
        let currDelay = 0;
        if (this.atDepot) {
            nextStop = "- Course completed";
        } else {
            nextStop = `- Next stop: ${this.nextStopName}`;
        }
        let output = "Line summary\n";
        output += `${nextStop}\n`;
        output += `- Stops covered: ${stepsCovered}\n`;
        output += `- Time on course: ${this.duration} minutes\n`;
        output += `- Delay: ${this.currentDelay} minutes\n`;
        return output.trim();
    }
}

const man = new LineManager([
    { name: 'Depot', timeToNext: 4 },
    { name: 'Romanian Embassy', timeToNext: 2 },
    { name: 'TV Tower', timeToNext: 3 },
    { name: 'Interpred', timeToNext: 4 },
    { name: 'Dianabad', timeToNext: 2 },
    { name: 'Depot', timeToNext: 0 },
]);

while (man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}
console.log(man.toString());
man.arriveAtStop(4);

// const wrong = new LineManager([
//     { name: 'Stop', timeToNext: { wrong: 'Should be a number'} }
// ]);


// console.log(man.toString());
// man.arriveAtStop(4);
// console.log(man.toString());
// man.arriveAtStop(4);
// console.log(man.toString());
// man.arriveAtStop(4);
// console.log(man.toString());
// man.arriveAtStop(4);
// console.log(man.toString());
// man.arriveAtStop(4);
// console.log(man.toString());
// man.arriveAtStop(4);
// console.log(man.toString());
// man.arriveAtStop(4);

