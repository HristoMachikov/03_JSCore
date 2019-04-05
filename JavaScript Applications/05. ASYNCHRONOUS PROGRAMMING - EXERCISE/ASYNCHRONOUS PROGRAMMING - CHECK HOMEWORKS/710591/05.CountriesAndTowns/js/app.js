function app() {
    const baserUrl = "https://baas.kinvey.com/";
    const appKey = "kid_Hyzke_GOE";
    const username = "guest";
    const password = "guest";
    const auth = btoa(`${username}:${password}`);
    const countriesCollection = 'countries';
    const townsCollection = 'towns';

    const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
    }
    
    $('#loadCountries').on('click', loadCountries);
    $('#addCountry').on('click', addCountry);

    async function loadCountries() {

        try {
            const request = await $.ajax({
                method: 'GET',
                url: `${baserUrl}appdata/${appKey}/${countriesCollection}`,
                headers
            });

            listCountriesTable(request);
        } catch (error) {
            console.error(error);
        }
    }

    async function addCountry() {
        

        let countryName = $('#add-country').val();

        const data = {
            "name": countryName
        };
        
        try {
            const req = await $.ajax({
                method: "POST",
                url: `${baserUrl}appdata/${appKey}/${countriesCollection}`,
                headers,
                data:JSON.stringify(data)
            })

            console.log(req)

            loadCountries();

            $('#add-country').val('');            
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteCountry(e) {
        const id = ($(e.target).parent()[0]).id;

        try {
            await $.ajax({
                method: 'DELETE',
                url: `${baserUrl}appdata/${appKey}/${countriesCollection}/${id}`,
                headers
            });

            loadCountries();
        } catch (error) {
            console.error(error);
        }
    }    

    async function editCountry(e) {
        const id = ($(e.target).parent()[0]).id;
        const name = $($(e.target).parent());

        try {
            await $.ajax({
                method: 'PUT',
                url: `${baserUrl}appdata/${appKey}/${countriesCollection}/${id}`,
                headers,
                data
            });

            loadCountries();
        } catch (error) {
            console.error(error);
        }
    }

    function listCountriesTable(request){
        $('#countries-div').empty();
        let $countries = $('#countries-div');
        let $table = $(`
            <table id="countries-table" class="table table-striped table-dark mt-2">
                <thead>
                    <th>ID</th>
                    <th>Country</th>
                    <th>Actions</th>
                </thead>
            </table>
        `);

        let $tbody = $('<tbody>');

        request.forEach((country, id) => {
            let $country = $(`
            <tr id="${country._id}">
                <td>${id + 1}</td>
                <td>${country.name}</td>
            </tr>
            `)
            
            let $editButton = $('<button id="editCountry" class="btn btn-warning m-2">Edit</button>');
            let $deleteButton = $('<button id="deleteCountry" class="btn btn-danger m-2">Delete</button>');

            $editButton.on('click', editCountry);
            $deleteButton.on('click', deleteCountry);

            $country.append($editButton)
                    .append($deleteButton);

            $($tbody).append($country);
        });

        $table.append($tbody);

        $countries.append($table);
    }
}
