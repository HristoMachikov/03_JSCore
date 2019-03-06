function bugTracker() {
    let storeArr = [];
    let ID = 0;
    let status = 'Open';
    let outputElem;
    function updateHTML(storeArr, outputElem) {
        let contentElem = document.querySelector(`${outputElem}`);
        let parentElem = contentElem.parentNode;
        parentElem.removeChild(contentElem);
        let div = document.createElement('div');
        div.id = "content";
        let resultArr = [];
        storeArr.forEach(function (element) {
            let result = `
            <div id="report_${element.ID}" class="report">
                <div class="body">
                    <p>${element.description}</p>
                </div>
                <div class="title">
                <span class="author">Submitted by: ${element.author}</span>
                <span class="status">${element.status} | ${element.severity}</span>
                </div>
            </div>`;
            resultArr.push(result);
        });
        div.innerHTML = resultArr.join('\n')
        parentElem.appendChild(div);
    }
    return {
        report: (author, description, reproducible, severity) => {

            let bugReport = {
                ID,
                author,
                description,
                reproducible,
                severity,
                status
            }
            ID++;
            storeArr.push(bugReport);
            updateHTML(storeArr, outputElem);
        },
        setStatus: (id, newStatus) => {
            for (const obj of storeArr) {
                if (obj.ID === id) {
                    obj.status = newStatus
                }
            }
            updateHTML(storeArr, outputElem);
        },
        remove: (id) => {
            let couter = 0;
            for (const obj of storeArr) {
                if (obj.ID === id) {
                    storeArr.splice(couter, 1)
                }
                couter++;
            }
            updateHTML(storeArr, outputElem);
        },
        sort: (method) => {
            switch (method) {
                case 'author': storeArr.sort((a, b) => a.author.localeCompare(b.author)); break;
                case 'severity': storeArr.sort((a, b) => a.severity - b.severity); break;
                case 'ID': storeArr.sort((a, b) => a.ID - b.ID); break;
                default: break;
            }
            updateHTML(storeArr, outputElem);
        },
        output: (selector) => outputElem = selector
    }
}