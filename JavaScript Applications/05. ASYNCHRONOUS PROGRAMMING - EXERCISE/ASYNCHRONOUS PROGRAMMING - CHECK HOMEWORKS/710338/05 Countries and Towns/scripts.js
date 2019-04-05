function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appId = 'kid_BJoGYmbKE';
    const username = 'joseph';
    const password = '1234567';
    const header = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }
    let $loader = $('<span class="loader"><i class="fas fa-spinner fa-spin"></i></span>')

    async function loadCountries() {
        let countries = await $.ajax({
            method: 'GET',
            url: `${baseUrl}appdata/${appId}/countries`,
            headers: header
        });

        $('#countries tbody').empty();
        countries.forEach(country => {
            let element = $(`
            <tr data-id="${country._id}">
                <td><input type="text" value="${country.name}" class="name"/></td>
                <td><button class="edit-country"><i class="fas fa-edit"></i></button></td>
                <td><button class="delete-country"><i class="fas fa-times"></i></button></td>
                <td><button class="select-country"><i class="fas fa-angle-right"></i></button></td>
            </tr>
            `)

            $('#countries tbody').append(element)
        })

        $('.loader').remove();
        
        $('button.edit-country').on('click', editCountry);
        $('button.delete-country').on('click', deleteCountry);
        $('button.select-country').on('click', loadTowns);
    }
    loadCountries()
    
    async function editCountry() {
        let updateId = $(this).parent().parent().data('id');
        $(this).parent().parent().find('td:first-child').prepend($loader);
        
        let newCountry = {
            "name": $(this).parent().parent().find('input').val()
        }
        let country = await $.ajax({
            method: 'PUT',
            url: `${baseUrl}appdata/${appId}/countries/${updateId}`,
            headers: header,
            data: JSON.stringify(newCountry)
        });
        $('.loader').remove();
    }

    async function deleteCountry() {
        let deleteId = $(this).parent().parent().data('id');
        $(this).parent().parent().find('td:first-child').prepend($loader);
        let country = await $.ajax({
            method: 'DELETE',
            url: `${baseUrl}appdata/${appId}/countries/${deleteId}`,
            headers: header
        })
        loadCountries()
    }

    $('button.add-country').on('click', addCountry);

    async function addCountry() {
        $(this).parent().prepend($loader);
        let newCountry = {
            "name": $('#addCountry .name').val()
        }
        let addingCountry = await $.ajax({
            method: 'POST',
            url: `${baseUrl}appdata/${appId}/countries`,
            headers: header,
            data: JSON.stringify(newCountry)
        })

        $('#addCountry .name').val('')

        loadCountries()
    }

    async function loadTowns() {
        let selectedCountry = $(this).parent().parent().find('input').val();
        $(this).parent().parent().find('td:first-child').prepend($loader);
        $('#towns tbody').empty();

        let towns = await $.ajax({
            method: 'GET',
            url: `${baseUrl}appdata/${appId}/towns`,
            headers: header
        });

        towns.forEach(town => {
            let element = $(`
            <tr data-id="${town._id}">
                <td><input type="text" value="${town.name}" class="name"/></td>
                <td><input type="text" value="${town.countryName}" class="country-name"/></td>
                <td><button class="edit-town"><i class="fas fa-edit"></i></button></td>
                <td><button class="delete-town"><i class="fas fa-times"></i></button></td>
            </tr>
            `)
            if (town.countryName == selectedCountry) {
                $('#towns tbody').append(element)
            }
        })

        $(this).parent().parent().find('.loader').remove();

        $('button.edit-town').on('click', editTown);
        $('button.delete-town').on('click', deleteTown);
    }

    async function editTown() {
        let updateId = $(this).parent().parent().data('id');
        $(this).parent().parent().find('td:first-child').prepend($loader);
        
        let newTown = {
            "name": $(this).parent().parent().find('input.name').val(),
            "countryName": $(this).parent().parent().find('input.country-name').val()
        }
        let town = await $.ajax({
            method: 'PUT',
            url: `${baseUrl}appdata/${appId}/towns/${updateId}`,
            headers: header,
            data: JSON.stringify(newTown)
        })

        $('.loader').remove();
    }

    async function deleteTown() {
        let deleteId = $(this).parent().parent().data('id');
        $(this).parent().parent().find('td:first-child').prepend($loader);
        let town = await $.ajax({
            method: 'DELETE',
            url: `${baseUrl}appdata/${appId}/towns/${deleteId}`,
            headers: header
        })

        $(this).parent().parent().remove();
        $('.loader').remove()
    }

    $('button.add-town').on('click', addTown);

    async function addTown() {
        $(this).parent().prepend($loader);

        let newTown = {
            "name": $('#addTown .name').val(),
            "countryName": $('#addTown .country-name').val()
        }
        let addingTown = await $.ajax({
            method: 'POST',
            url: `${baseUrl}appdata/${appId}/towns`,
            headers: header,
            data: JSON.stringify(newTown)
        })

        $('#addTown .name').val('');
        $('#addTown .country-name').val('');
        $('.loader').remove();
    }
}
attachEvents()