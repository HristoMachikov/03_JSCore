function solve(inputStr) {
    let inputArr = JSON.parse(inputStr);

    let result = "";
    result += "<table>\n";
    result += "   <tr><th>name</th><th>score</th></tr>\n";
    inputArr.forEach(element => {
        result += `   <tr><td>${HtmlEncode(element.name)}</td><td>${HtmlEncode(element.score)}</td></tr>\n`;
    });
    result += "</table>";

    function HtmlEncode(mystring) {
        let resultStr = "";
        let pattern = /[&<>"]/g;
        let currMatch;
        if ((currMatch = pattern.exec(mystring)) !== null) {
            resultStr = mystring.replace(/&/g, "&amp;")
                .replace(/>/g, "&gt;")
                .replace(/</g, "&lt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        } else {
            resultStr = mystring
        }
        return resultStr;
    }
    console.log(result)
}

solve('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');