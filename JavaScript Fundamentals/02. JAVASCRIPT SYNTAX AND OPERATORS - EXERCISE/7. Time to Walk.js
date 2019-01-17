function solve(numbSteps, oneStepLength, speed) {
    let distanceInMeter = numbSteps * oneStepLength;
    let breaks = Math.floor(distanceInMeter / 500);
    let totalTimeInSeconds = breaks * 60 + distanceInMeter * 3.6 / speed;
    let seconds = totalTimeInSeconds % 60;
    let minutes = ((totalTimeInSeconds - seconds) / 60) % 60;
    let hours = Math.floor((totalTimeInSeconds - seconds) / 3600);;
    seconds = Math.ceil(seconds);
    seconds = seconds > 9 ? seconds : '0' + seconds;
    minutes = minutes > 9 ? minutes : '0' + minutes;
    hours = hours > 9 ? hours : '0' + hours;
    console.log(`${hours}:${minutes}:${seconds}`);
};
solve(2564, 0.70, 5.5);