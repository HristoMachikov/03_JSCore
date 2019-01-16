function solve(days, activity, time){
    let currentTime = +time;
    let currentPrice = 0;
    switch (days){
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
        switch (activity){
            case "Fitness":currentPrice = 5; break;
            case "Sauna": currentPrice = 4; break;
            case "Insdaytructor":currentPrice = 10; break;
            default:break;
        };
        break;
        case "Saturday":
        case "Sunday":
        switch (activity){
            case "Fitness":currentPrice = 8; break;
            case "Sauna": currentPrice = 7; break;
            case "Insdaytructor":currentPrice = 15; break;
            default:break;
        };
        default:break;
    };
    if(currentTime>=8 && currentTime<=22 && (days == "Saturday" || days == "Sunday")){
        console.log(currentPrice);
    } else if (currentTime>=8 && currentTime<15){
        console.log(currentPrice);
    }else if (currentTime>=15 && currentTime<=22){
        console.log((currentPrice + 2.5));
    }
};
solve('Sunday', 'Fitness', 22.00);