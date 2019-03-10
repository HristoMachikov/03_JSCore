function attachGradientEvents() {
    document.getElementById('gradient').addEventListener("mousemove", gradientMove);
    document.getElementById('gradient').addEventListener("mouseout", gradientOut);
    let resultElem = document.getElementById('result');

    function gradientMove(e) {
        let x = e.offsetX / (e.target.clientWidth - 1);
        let gradient = Math.floor(x * 100)
        resultElem.textContent = `${gradient}%`;
    }

    function gradientOut() {
        resultElem.textContent = "";
    }
}