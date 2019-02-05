function solve() {
    let arrObj = [];
    document.getElementsByTagName('button')[0].addEventListener('click', (event) => {
        event.preventDefault();

        let userElem = document.querySelector('div[class="user-info"]');
        let userName = userElem.children[1].value;
        let email = userElem.children[5].value;
        let topics = [];
        let checkedTopics = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        for (let elem of checkedTopics) {
            let isChecked = elem.checked;
            if (isChecked) {
                topics.push(elem.value);
            }
        }
        // topics = arr.filter(el => el.checked).map(e => e.value);
        let obj = { userName, email, topics };
        
        let tBodyElem = document.querySelector('tbody');

        // let tr = document.createElement('tr');
        // let name = document.createElement('td');
        // name.innerHTML = `${userName}`;
        // let emailElem = document.createElement('td');
        // emailElem.innerHTML = `${email}`;
        // let topicsElem = document.createElement('td');
        // topicsElem.innerHTML = `${topics.join(' ')}`;
        // tr.appendChild(name);
        // tr.appendChild(emailElem);
        // tr.appendChild(topicsElem);
        // tBodyElem.appendChild(tr);

        let newRow = '<tr>\n' + `   <td>${userName}</td>\n` + `    <td>${email}</td>\n`;
        newRow += `   <td>${topics.join(' ')}</td>\n` + '</tr>\n';
        tBodyElem.innerHTML += newRow;
    })

    document.getElementsByTagName('button')[1].addEventListener('click', () => {
        let str = document.getElementsByTagName('input')[7].value;

        let tdElem = Array.from(document.querySelectorAll('tbody tr td'));
        tdElem.forEach(function (element) {
            element.parentNode.style.visibility = "hidden";
        });
        tdElem.forEach(function (element) {
            if (element.textContent.includes(str)) {
                element.parentNode.style.visibility = "visible";
            }
        });
    })
}