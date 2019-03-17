class LineManager {
    constructor(stops) {
        this.stops = stops, // Array
            this.currentStop = { name: "", timeToNext: 0 }, // Object
            this.duration = 0 // Number
        //this.delay = 0 // Number
    }
    get currentStop() {
        return this._currentStop;
    }

    set currentStop(value) {
        return this._currentStop = value;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        return this._duration = value;
    }

    get stops() {
        return this._stops;
    }

    set stops(value) {
        let allStops = [];
        value.forEach(stop => {
            if (stop.name !== ""
                && typeof stop.name === "string"
                && stop.timeToNext >= 0
                && typeof stop.timeToNext === "number") {
                allStops.push(stop);
            } else {
                throw "Name should be a non-empty string and time should be a positive number!";
            }
        });
        return this._stops = allStops;
    }

    get atDepot() {
        let lastStop = this.stops[this.stops.length - 1];
        if (lastStop.name === this.currentStop.name && this.currentStop.timeToNext === 0) {
            return true;
        } else {
            return false;
        }
    }

    get nextStopName() {
        if (this.atDepot()) {
            return "At depot.";
        } else {
            let index = 0;
            for (let i = 0; i < this.stops.length; i++) {
                if (this.stops[i].name === this.currentStop.name) {
                    index = i;
                }
            }
            return this.stops[index + 1].name;
        }
    }

    static findIndexByKeyValue(arraytosearch, key, valuetosearch) {
        for (let i = 0; i < arraytosearch.length; i++) {
            if (arraytosearch[i][key] == valuetosearch) {
                return i;
            }
        }
        return null;
    }

    get currentDelay() {
        let currIndex = findIndexByKeyValue(this.stops, "name", this.currentStop.name);
        let timeExact = 0;
        //let count = currIndex == this.stops.length-1? this.stops.length:currIndex
        for (let i = 0; i < currIndex; i++) {
            timeExact += this.stops[i].timeToNext;
            // console.log(i)
        }
        let delay = this.duration - timeExact;
        // console.log(this.duration)
        //  return delay < 0 ? 0 : delay;
        return delay;

        function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
            for (let i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i][key] === valuetosearch) {
                    return i;
                }
            }
            return null;
        }
    }

    arriveAtStop(minutes) {
        if (minutes >= 0 && typeof minutes === "number") {
            this._duration = this.duration + minutes;

            //let timeOnCourse = this.duration.timeOnCourse + minutes;
            // let delay = this.duration.delay + (minutes - this.currentStop.timeToNext)
            // this._duration = { timeOnCourse: 0, delay: 0 }
            if (this.stops[this.stops.length - 1].name === this.currentStop.name) {
                return false;
            } else {
                let index = 0;
                for (let i = 0; i < this.stops.length; i++) {
                    if (this.stops[i].name === this.currentStop.name) {
                        index = i;
                    }
                }
                //console.log(this.currentStop)
                this._currentStop = this.stops[index + 1];
                // console.log(this.currentStop)
                return true;
            }
        } else {
            throw "Minutes cannot be negative!";
        }
    }

    toString() {
        let currIndex = findIndexByKeyValue(this.stops, "name", this.currentStop.name)
        let stepsCovered = 0;
        let nextStop = "";
        let currDelay = 0;
        if (this.nextStopName === "At depot.") {
            stepsCovered = this.stops.length - 1;
            nextStop = "- Course completed";
            for (let i = 0; i < this.stops.length; i++) {
                currDelay += this.stops[i].timeToNext;
            }
            currDelay = this.duration - currDelay;
        } else {
            stepsCovered = currIndex === null ? 0 : currIndex;
            nextStop = `- Next stop: ${this.nextStopName}`;
            currDelay = this.currentDelay;
        }
        let output = "Line summary\n";
        output += `${nextStop}\n`;
        output += `- Stops covered: ${stepsCovered}\n`;
        output += `- Time on course: ${this.duration} minutes\n`;
        output += `- Delay: ${currDelay} minutes\n`;
        return output.trim();

        function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
            for (let i = 0; i < arraytosearch.length; i++) {
                if (arraytosearch[i][key] == valuetosearch) {
                    return i;
                }
            }
            return null;
        }
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


console.log(man.toString());
man.arriveAtStop(4);
console.log(man.toString());
man.arriveAtStop(4);
console.log(man.toString());
man.arriveAtStop(4);
console.log(man.toString());
man.arriveAtStop(4);
console.log(man.toString());
man.arriveAtStop(4);
console.log(man.toString());
man.arriveAtStop(4);
console.log(man.toString());
man.arriveAtStop(4);

