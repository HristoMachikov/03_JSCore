class Circle {
    constructor(R) {
        this.radius = R;
    }
    get diameter() {
        return 2 * this.radius;
    }
    set diameter(D) {
        this.radius = D / 2;
    }
    get area() {
        return Math.PI * this.radius * this.radius;
    }
}
let c = new Circle(2);
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
c.diameter = 1.6;
console.log(`Radius: ${c.radius}`);
console.log(`Diameter: ${c.diameter}`);
console.log(`Area: ${c.area}`);
