function solve() {
    Array.from(document.getElementsByTagName('button')).forEach(btn => {
        btn.addEventListener('click', toDo)
    });
    function toDo(event) {
        let currentSender = event.target.name;
        let currentMessage;
        let parentElem = event.target.parentNode;
        let meMessage = parentElem.children[0];
        let peshoMessage = parentElem.children[3];
        let chatRoomElem = parentElem.children[2];
        if (meMessage.value || peshoMessage.value) {
            let newDivElem = document.createElement('div');
            let newSpanElem = document.createElement('span');
            let newParElem = document.createElement('p');
            let currentName;
            if (currentSender == "myBtn") {
                currentMessage = meMessage.value;
                newDivElem.style.textAlign = 'left';
                currentName = "Me";
            } else if (currentSender == "peshoBtn") {
                currentMessage = peshoMessage.value;
                newDivElem.style.textAlign = 'right';
                currentName = "Pesho";
            }
            newSpanElem.textContent = currentName;
            newParElem.textContent = currentMessage;
            newDivElem.appendChild(newSpanElem);
            newDivElem.appendChild(newParElem);
            chatRoomElem.appendChild(newDivElem);
        };
        meMessage.value = "";
        peshoMessage.value = "";
    };
};