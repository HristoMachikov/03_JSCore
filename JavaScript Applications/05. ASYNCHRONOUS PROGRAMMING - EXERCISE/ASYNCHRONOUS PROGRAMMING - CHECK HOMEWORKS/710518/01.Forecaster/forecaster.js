function attachEvents() {
    const url = "https://judgetests.firebaseio.com/locations.json";
    const weatherSymbols = {
        Sunny: "&#x2600;",
        Partlysunny: "&#x26C5;",
        Overcast: "&#x2601;",
        Rain: "&#x2614;",
        Degrees: "&#176;"
    };
    let forecastDiv = $("#forecast");
    $("#submit").click(getWeather);

    function getWeather() {
        $.ajax({
            method: "GET",
            url,
            success: getWeatherOnSuccess,
            error: displayError
        });
    }

    function getWeatherOnSuccess(data) {
        let location = $("#location").val();
        let locationObj = data.filter(e => e.name === location)[0];

        if (!locationObj) {
            displayError();
            return;
        }

        let currentConditionsUrl = `https://judgetests.firebaseio.com/forecast/today/${locationObj.code}.json`;
        let threeDaysConditionsUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${locationObj.code}.json`;

        $.ajax({
            method: "GET",
            url: currentConditionsUrl,
            success: currentConditionOnSuccess
        });

        $.ajax({
            method: "GET",
            url: threeDaysConditionsUrl,
            success: threeDaysConditionOnSuccess
        });
    }

    function currentConditionOnSuccess(data) {
        setForecastDivToVisible();
        let current = $("#current");
        current.append($(`<span class="condition symbol">${weatherSymbols[data.forecast.condition]}</span>`));
        current.append(
            $(`<span class="condition">`)
            .append($(`<span class="forecast-data">${data.name}</span>`))
            .append($(`<span class="forecast-data">${data.forecast.low + weatherSymbols.Degrees}/${data.forecast.high + weatherSymbols.Degrees}</span>`))
            .append($(`<span class="forecast-data">${data.forecast.condition}</span>`))
        );
    }

    function threeDaysConditionOnSuccess(data) {
        let upcoming = $("#upcoming");
        data.forecast.map(day => {
            upcoming.append($('<span class="upcoming">')
                .append($(`<span class="symbol">${weatherSymbols[day.condition.split(" ").join("")]}</span>`))
                .append($(`<span class="forecast-data">${day.low + weatherSymbols.Degrees}/${day.high + weatherSymbols.Degrees}</span>`))
                .append($(`<span class="forecast-data">${day.condition}</span>`)));
        });
    }

    function displayError() {
        setForecastDivToVisible();
        forecastDiv.text("Error");
    }

    function setForecastDivToVisible() {
        forecastDiv.css("display", "block");
    }
}