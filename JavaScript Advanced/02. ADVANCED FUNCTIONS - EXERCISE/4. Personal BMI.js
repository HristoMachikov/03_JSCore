function personalBMI(name, age, weight, height) {
    let obj = {
        "name": name,
        "personalInfo": {
            "age": age,
            "weight": weight,
            "height": height
        },
        "BMI": 0,
        "status": ""
    };
    let BMI = Math.round(+weight / Math.pow(+height / 100, 2));
    obj.BMI = BMI
    let status = "";
    if (BMI < 18.5) {
        status = "underweight";
    } else if (BMI >= 18.5 && BMI < 25) {
        status = "normal";
    } else if (BMI >= 25 && BMI < 30) {
        status = "overweight";
    } else if (BMI >= 30) {
        status = "obese"
    }
    obj.status = status;
    if (status === "obese") {
        obj["recommendation"] = "admission required";
    }
    
    return obj;
}
personalBMI("Honey Boo Boo", 9, 57, 137)