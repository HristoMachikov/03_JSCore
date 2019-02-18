function solve(examPonts, homeworkCompleted, totalHomework) {
    let grade = 0;
    let bonus = 0;
    if (totalHomework > 0) {
        if (homeworkCompleted >= totalHomework) {
            bonus = 0.1;
        } else {
            bonus = 0.1 * (homeworkCompleted / totalHomework);
        }
    };
    if (examPonts < 400) {
        totalPoints = 100 * (bonus + 0.9 * (examPonts / 400));
        grade = 3 + ((2 * (totalPoints - 100 / 5)) / (100 / 2));
    } else if (examPonts = 400) {
        grade = 6;
    }
    if (grade < 3) {
        grade = 2;
    }
    console.log(grade.toFixed(2));
};
solve(270, 10, 10);