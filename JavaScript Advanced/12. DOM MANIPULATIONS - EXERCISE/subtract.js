function subtract() {
    let firstNumber = $("#firstNumber").val();
    let secondNumber = $("#secondNumber").val();
    let $result = $('#result');
    $result.text(`${Number(firstNumber) - Number(secondNumber)}`)
}