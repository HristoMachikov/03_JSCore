function solve(inputArr, workout) {
    let dailyCalorieIntake = 0;
    let activeFact = 0;
    let calores = 0;
    let weight = Number(inputArr[1]);
    let height = Number(inputArr[2]);
    let age = Number(inputArr[3]);
    if (inputArr[0] == 'f') {
        calores = 655 + 9.7 * weight + 1.85 * height - 4.7 * age
    } else if (inputArr[0] == 'm') {
        calores = 66 + 13.8 * weight + 5 * height - 6.8 * age;
    }
    switch (Number(workout)) {
        case 0: activeFact = 1.2; break;
        case 1:
        case 2: activeFact = 1.375; break;
        case 3:
        case 4:
        case 5: activeFact = 1.55; break;
        case 6:
        case 7: activeFact = 1.725; break;
        default: activeFact = 1.9; break;
    };
    dailyCalorieIntake = Math.round(activeFact * calores);
    console.log(dailyCalorieIntake);
};
solve(['m', 86, 185, 25], 8);