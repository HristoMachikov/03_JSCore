function attachEvents() {

    let $submit = $('#submit');

    const baseUrl = "https://judgetests.firebaseio.com";

    $submit.on('click', getForecast);

    async function getForecast() {
        let location = $('#location').val();
        let code;
        $('#forecast').css("display", "block");

        try {
            let responseForecast = await $.get({
                url: baseUrl + "/locations.json",
            })
            code = responseForecast.filter((obj) => obj.name === location)[0].code;
        } catch (err) {
            showError();
        }

        try {
            let resCurrCondition = await $.get({
                url: baseUrl + `/forecast/today/${code}.json `
            })
            let $div = $('#current');

            let condition = resCurrCondition.forecast.condition
            let high = resCurrCondition.forecast.high;
            let low = resCurrCondition.forecast.low;
            let symbol = showSymbol(condition);

            let $span = $(`
            <span class="condition symbol">${symbol}</span>
            <span class="condition">
                <span class="forecast-data">${resCurrCondition.name}</span>
                <span class="forecast-data">${low}&#176;/${high}&#176;</span>
                <span class="forecast-data">${condition}</span>
            </span>
            `);
            $div.append($span);
        } catch (err) {
            showError();
        }

        try {
            let res3DaysCondition = await $.get({
                url: baseUrl + `/forecast/upcoming/${code}.json `
            })
            let $div = $('#upcoming');
            let arr3DaysCondition = res3DaysCondition.forecast;
            arr3DaysCondition.forEach(dayForecast => {

                let condition = dayForecast.condition
                let high = dayForecast.high;
                let low = dayForecast.low;
                let symbol = showSymbol(condition);

                let $span = $(`
                <span class="upcoming">
                    <span class="symbol">${symbol}</span>
                    <span class="forecast-data">${low}&#176;/${high}&#176;</span>
                    <span class="forecast-data">${condition}</span>
                </span>
                `);

                $div.append($span);
            });
        } catch (err) {
            showError();
        }
    };

    function showError() {
        $('#forecast').text("Error");
    }

    function showSymbol(condition) {
        switch (condition) {
            case "Sunny":
                return "&#x2600;";
            case "Partly sunny":
                return "&#x26C5;";
            case "Overcast":
                return "&#x2601;";
            case "Rain":
                return "&#x2614;";
        };
    };

}