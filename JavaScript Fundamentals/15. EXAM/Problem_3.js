function solve(inputArr) {
    let resultStr = "";
    let arr = [];
    inputArr.forEach(function (row) {
        let count = 0;
        let currStr = row
        let pattern = /((<[a-z0-9]+?>)([^<]*?)(<\/[a-z0-9]+?>))/g;
        //let pattern = /((<[a-z0-9]+>)(.*)(<\/[a-z0-9]+>))/g;
        let currMatch;

        while ((currMatch = currStr.match(pattern)) !== null) {
            count += 1;
            let exec = pattern.exec(currStr)
            let openTag = exec[2];
            let closeTag = exec[4];
            if (openTag === closeTag.replace("/", "")) {
                currStr = currStr.replace(`${openTag}`, "")
                    .replace(`${closeTag}`, " ");
            } else {
                currStr = "";
                count = 0;
                break;
            }
        }
        if (count > 0) {
            currStr = currStr.split(' ').filter(a => a).join(' ');
        } else {
            currStr = "";
        }
        arr.push(currStr);
    });
    console.log(arr.join(' '));
};
solve(['<div><p>This</p> is</div>',
    '<div><a>perfectly</a></div>',
    '<divs><p>valid</p></divs>',
    '<div><p>This</div></p>',
    '<div><p>is not</p><div>']
);