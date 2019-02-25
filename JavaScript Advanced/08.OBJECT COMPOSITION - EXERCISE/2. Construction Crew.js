function solve(inputObj) {
    let currWeight = function () {
        return inputObj.weight;
    };
    let currExperience = function () {
        return inputObj.experience
    };
    let currBloodAlcoholLevel = inputObj.bloodAlcoholLevel;
    let currHandsShaking = inputObj.handsShaking;

    if (currHandsShaking) {
        currBloodAlcoholLevel += currExperience() * currWeight() * 0.1;
        currHandsShaking = false;
    }

    return {
        weight: currWeight(),
        experience: currExperience(),
        bloodAlcoholLevel: currBloodAlcoholLevel,
        handsShaking: currHandsShaking
    };
}
console.log(solve({
    weight: 95,
    experience: 3,
    bloodAlcoholLevel: 0,
    handsShaking: false
}
));