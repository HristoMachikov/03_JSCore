function initializeTable() {
    $('#createLink').click(addCountry);
    function addCountry(){
        let country = $("#newCountryText").val();
        let capital = $('#newCapitalText').val();

        if(capital !== '' && country !== ''){
            creataCountry(country,capital);
        }
    }

    function creataCountry(country,capital){
        let tables = ('#countriesTable');
let row =$(`<tr><td>${country}</td><td><a href="#">[Up]</a>)
let action =  

        let row =$(`<tr><td>${country}</td><td><a href="#">[Up]</a></td></tr>`);
        <a href="#">[Down]</a>
        <a href="#">[Delete]</a></td></tr>`);
        tables.append(row);
    }
function moveUp(){

}
function deleteRow(){

}

    creataCountry('Bulgaria','Sofia')
}