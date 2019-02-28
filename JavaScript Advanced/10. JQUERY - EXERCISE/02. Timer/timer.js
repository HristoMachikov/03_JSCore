function timer() {
    let seconds = $('#seconds');
    let minutes = $('#minutes');
    let hours = $('#hours');

    let timer

    let startBtn = $('#start-timer');
    startBtn.on('click', function () {
        timer = setInterval(secondsUpdate, 1000);
        isTicking = true;
    })
    $('#stop-timer').on('click', stop)

    function secondsUpdate() {
        seconds.text(formatter(+seconds.text() + 1))
        if (Number(seconds.text()) === 59) {
            seconds.text('00')
            minutes.text(formatter(Number(minutes.text()+1)))
        }else if(+minutes.text() === 60){
            minutes.text('00')
            
        }

    }
    function stopTimer() {
        clearInterval(timer);
        isTicking = false;
    }
    function formatter(time) {
        return ("0" + time).slice(-2)
    }

}