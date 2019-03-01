function initializeTable() {
    $('#createLink').on('click', createCountry);

    addCountryToTable('Bulgaria', 'Sofia')
    addCountryToTable('Germany', 'Berlin')
    addCountryToTable('Russia', 'Moscow')
    fixRowLinks();

    function createCountry() {
        let country = $("#newCountryText").val();
        let capital = $('#newCapitalText').val();

        if (capital !== '' && country !== '') {
            addCountryToTable(country, capital);
        }
        $("#newCountryText").val("");
        $('#newCapitalText').val("");
        fixRowLinks();
    }

    function addCountryToTable(country, capital) {
        let tables = $('#countriesTable');
        let row = $('<tr>')
            .append($('<th>').text(country))
            .append($('<th>').text(capital))
            .append($('<th>')
                .append($('<a href="#">[Up]</a>').on('click', moveRowUp))
                .append($('<a href="#">[Down]</a>').on('click', moveRowDown))
                .append($('<a href="#">[Delete]</a>').on('click', deleteRow)));
        row.css('display', 'none');
        tables.append(row);
        row.fadeIn();
    }

    function moveRowUp() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
        row.insertBefore(row.prev());
        row.fadeIn();
        fixRowLinks();
        });
    }
    function moveRowDown() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            row.insertAfter(row.next());
            row.fadeIn();
            fixRowLinks();
        });
    }
    function deleteRow() {
        let row = $(this).parent().parent();
        row.fadeOut(function () {
            row.remove();
            fixRowLinks();
        });
    }
    function fixRowLinks() {
        $('#countriesTable a').css('display', 'inline');
        let tableRows = $('#countriesTable tr')
        $(tableRows[2])
            .find('a:contains("Up")')
            .css('display', 'none');
        $(tableRows[tableRows.length - 1])
            .find('a:contains("Down")')
            .css('display', 'none');
    }
}