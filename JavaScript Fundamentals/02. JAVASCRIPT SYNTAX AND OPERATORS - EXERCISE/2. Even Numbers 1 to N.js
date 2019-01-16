function solve(numb){
    let inputNumb = Number(numb);
    let outputArr = [];
    for (let i = 1; i <= inputNumb; i++){
        if(i%2==0){
            outputArr.push(i);
        }
    }
    outputArr.forEach(element => {
        console.log(element);
    });
};
solve(100);