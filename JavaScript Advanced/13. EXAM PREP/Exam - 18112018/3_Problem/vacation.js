class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer,
            this.destination = destination,
            this.budget = budget,
            this.kids = {}
    }
    get organizer() {
        return this._organizer;
    }
    set organizer(value) {
        return this._organizer = value;
    }
    get destination() {
        return this._destination;
    }
    set destination(value) {
        return this._destination = value;
    }
    get budget() {
        return this._budget;
    }
    set budget(value) {
        return this._budget = value;
    }
    get kids() {
        return this._kids;
    }
    set kids(value) {
        return this._kids = value;
    }

    registerChild(name, grade, budget) {
        if (+budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }
        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = []
        }
        let kidsInGrade = this.kids[grade].map(x => x.split('-')[0]);
        if (kidsInGrade.includes(name)) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }
        this.kids[grade].push(`${name}-${budget}`);
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (this.kids[grade] !== undefined) {
            let findName = this.kids[grade].filter(x => x.split('-')[0] === name)[0];
            if (findName !== undefined && findName.split('-')[0] === name) {
                this.kids[grade] = this.kids[grade].filter(x => x.split('-')[0] !== name);
                return this.kids[grade];
            }
        }
        return `We couldn't find ${name} in ${grade} grade.`;
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
        let output = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        for (const grade in this.kids) {
            output += `Grade: ${grade}\n`;
            let count = 0;
            for (const kid of this.kids[grade]) {
                output += `${++count}. ${kid}\n`;
            }
            output += "\n"
        }
        return output.trim();
    }

    get numberOfChildren() {
        let allKids = 0;
        for (const grade in this.kids) {
            allKids += this.kids[grade].length;
        }
        return allKids;
    }
}

let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);

vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500);

console.log(vacation.toString());