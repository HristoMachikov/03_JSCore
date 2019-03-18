function solve() {

    $('button').on('click', showCourses);

    function showCourses() {
        let objPrice = {
            "js-fundamentals": 170,
            "js-advanced": 180,
            "js-applications": 190,
            "js-web": 490
        }
        let modulePrice = objPrice["js-fundamentals"]
            + objPrice["js-advanced"]
            + objPrice["js-applications"];

        let $selectedForm = $('input[type="radio"]:checked ');
        let $selectedCourses = $('input[type="checkbox"]:checked ');
        let courseArr = [];
        let totalPrice = 0;
        let discount = 0;
        let sum = 0;

        let $price = $('.courseFoot').eq(1).children().eq(0);
        let $ul = $('.courseBody').eq(1).children().eq(0);
        $ul.empty();

        if ($selectedCourses.val() !== undefined) {
            for (const el of Array.from($selectedCourses)) {
                courseArr.push(el.value);
                totalPrice += objPrice[el.value];
                let currCourse = el.value;
                currCourse = currCourse
                    .replace(currCourse[0], currCourse[0].toUpperCase())
                    .replace(currCourse[1], currCourse[1].toUpperCase())
                    .replace(currCourse[3], currCourse[3].toUpperCase());
                let $li = $(`<li>${currCourse}</li>`);
                $ul.append($li);
            }
            if (courseArr.length === 4) {
                $ul.append('<li>HTML and CSS</li>');
            }
            if ($selectedForm.val() === "online") {

                courseArr.forEach(course => {
                    discount += objPrice[course] * 0.06;
                });
            }
            if (courseArr.includes("js-fundamentals")
                && courseArr.includes("js-advanced")) {
                discount += objPrice["js-advanced"] * 0.1;
            }
            if (courseArr.includes("js-fundamentals")
                && courseArr.includes("js-advanced")
                && courseArr.includes("js-applications")) {
                discount += modulePrice * 0.06;
            }
            sum = Math.floor(totalPrice - discount);
        }
        let $newPrice = $(`<p>Cost: ${sum + ".00"} BGN</p>`);
        $price.replaceWith($newPrice);
    }
}

solve();