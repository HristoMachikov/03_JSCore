class Organization {
    constructor(name, budget) {
        this.name = name,
            this.budget = budget,
            this.employees = []
       //this.departmentsBudget
    }

    get budget() {
        return this._budget;
    }

    set budget(value) {
        return this._budget = value;
    }
      get name() {
        return this._name;
    }

    set name(value) {
        return this._name = value;
    }

    // get departmentsBudget() {
    //     let budget = Number(this.budget)
    //     let marketing = budget * 0.4;
    //     let finance = budget * 0.25;
    //     let production = budget * 0.35;
    //     return { marketing, finance, production };
    // }

    get departmentsBudget() {
        if (this._departmentsBudget === undefined) {
            let budget = Number(this.budget)
            let marketing = budget * 0.4;
            let finance = budget * 0.25;
            let production = budget * 0.35;

            this._departmentsBudget = { marketing, finance, production };
        }
        return this._departmentsBudget;
    }

    set departmentsBudget(value) {
        return this._departmentsBudget = value;
    }


    add(employeeName, department, salary) {
        if (this.departmentsBudget[department] >= salary) {
            let person = { employeeName, department, salary };
            this.employees.push(person);
            this.departmentsBudget[department] -= Number(salary);
            return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
        } else {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is ${this.departmentsBudget[department]}.`;
        }
    }

    employeeExists(employeeName) {
        let searchingPerson = (this.employees.filter(person => person.employeeName === employeeName))[0];
        if (searchingPerson) {
            return `Mr./Mrs. ${employeeName} is part of the ${searchingPerson.department} department.`;

        } else {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }
    }

    leaveOrganization(employeeName) {
        let searchingPerson = (this.employees.filter(person => person.employeeName === employeeName))[0];
        if (searchingPerson) {
            this.employees = this.employees.filter(person => person.employeeName !== employeeName);
            this.departmentsBudget[searchingPerson.department] += Number(searchingPerson.salary)
            return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
        } else {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }
    }

    status() {
        let output = "";

        let marketingPersons = this.employees.filter(person => person.department === 'marketing');
        let financePersons = this.employees.filter(person => person.department === 'finance');
        let productionPersons = this.employees.filter(person => person.department === 'production');

        let marketingNames = [];
        let financeNames = [];
        let productionNames = [];

        if (marketingPersons) {
            marketingPersons.sort((a, b) => b.salary - a.salary)
            marketingPersons.forEach(person => {
                marketingNames.push(person.employeeName);
            });
        }
        if (financePersons) {
            financePersons.sort((a, b) => b.salary - a.salary)
            financePersons.forEach(person => {
                financeNames.push(person.employeeName);
            });
        }
        if (productionPersons) {
            productionPersons.sort((a, b) => b.salary - a.salary)
            productionPersons.forEach(person => {
                productionNames.push(person.employeeName);
            });
        }

        output += `${this.name.toUpperCase()} DEPARTMENTS:`;
        output += `\nMarketing | Employees: ${marketingPersons.length}: ${marketingPersons ? marketingNames.join(", ") : ""} | Remaining Budget: ${this.departmentsBudget.marketing}`;
        output += `\nFinance | Employees: ${financePersons.length}: ${financePersons ? financeNames.join(", ") : ""} | Remaining Budget: ${this.departmentsBudget.finance}`;
        output += `\nProduction | Employees: ${productionPersons.length}: ${productionPersons ? productionNames.join(", ") : ""} | Remaining Budget: ${this.departmentsBudget.production}`;

        return output;
    }
}

let organization = new Organization('SoftUni', 20000);

console.log(organization.add('Peter', 'production', 1200));

console.log(organization.add('Robert', 'production', 2000));

//console.log(organization.leaveOrganization('Peter'));


// let organization = new Organization('SBTech', 1000);

// console.log(organization.add('Peter', 'marketing', 800));
// console.log(organization.add('Robert', 'production', 2000));
// console.log(organization.add('Peter', 'production', 2000));
 console.log(organization.status())
//console.log(organization.leaveOrganization("Robert"))
console.log(organization.status())
