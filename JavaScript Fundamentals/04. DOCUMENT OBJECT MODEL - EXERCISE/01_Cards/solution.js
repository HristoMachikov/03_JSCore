function solve() {
    Array.from(document.getElementsByTagName('img')).forEach((images) => {
        images.addEventListener('click', clickEvent);
    });
    function clickEvent(e) {
        let card = e.target;
        card.src = "./images/whiteCard.jpg";
        card.removeEventListener('click', clickEvent);
        let parent = card.parentNode;
        let spans = document.getElementById('result').children;
        let currentCard = card.name;
        let leftPlayer1 = spans[0];
        let rightPlayer2 = spans[2];
        let topCard = "";
        let bottomCard = "";
        if (parent.id === "player1Div") {
            leftPlayer1.textContent = currentCard;
            topCard = card;
        } else if (parent.id === "player2Div") {
            rightPlayer2.textContent = currentCard;
            bottomCard = card;
        }
        if (leftPlayer1.textContent != "" && rightPlayer2.textContent != "") {
            let winner = "";
            let looser = "";
            if (+leftPlayer1.textContent > +rightPlayer2.textContent) {
                winner = document.querySelector(`#player1Div img[name='${leftPlayer1.textContent}']`);
                looser = document.querySelector(`#player2Div img[name='${rightPlayer2.textContent}']`);
            } else {
                winner = document.querySelector(`#player2Div img[name='${rightPlayer2.textContent}']`);
                looser = document.querySelector(`#player1Div img[name='${leftPlayer1.textContent}']`);
            }
            winner.style.border = '2px solid green';
            looser.style.border = '2px solid darkred';
            document.getElementById('history').textContent += `[${leftPlayer1.textContent} vs ${rightPlayer2.textContent}] `;
            //setTimeout(() => {
                leftPlayer1.textContent = "";
                rightPlayer2.textContent = "";
            //}, 2000);
        };
    };
};