function solve() {

    const baseUrl = "https://baas.kinvey.com/appdata/";
    const appKey = "kid_Sk5HEURd4";
    const appSecret = "59912525e38541428568ad2b6bdc7b9c";
    const firstEndPoint = "countries";
    const secondEndPoint = "towns";
    const baseUser = "guest";
    const basePass = "guest";
    const authoBase64 = btoa(baseUser + ":" + basePass);
    const headers = {
        "Authorization": `Basic ${authoBase64}`,
        "Content-Type": "application/json"
    }

    let currCountry = "";
    let currCountryId = "";
    let currTown = "";
    let currTownId = "";

    $('#listCountries').on('click', listCountries)
    $('#countries').find('button[value="create"]').on("click", createCountry)
    $('#countries').find('button[value="edit"]').on("click", editCountry)
    $('#countries').find('button[value="delete"]').on("click", deleteCountry)

    $('#listTowns').on('click', listTowns)
    // $('#towns').find('button[value="create"]').on("click", createTown)
    // $('#towns').find('button[value="edit"]').on("click", editTown)
    // $('#towns').find('button[value="delete"]').on("click", deleteTown)

    async function listTowns() {

        $('#towns').find('ul').remove();
        let checkCountry = $('#towns input').val();
        if (checkCountry) {
            try {
                let request = await $.ajax({
                    method: "GET",
                    url: baseUrl + appKey + "/" + secondEndPoint,
                    headers
                })
                let checkCountryArr = request.filter(x => x.country === checkCountry)

                if (checkCountryArr) {
                    let $ul = $(`<ul>${checkCountryArr[0].country}</ul>`);
                    $ul.insertBefore('#towns input')
                    checkCountryArr.forEach(function (obj) {
                        let $li = $(`
                        <li id="${obj._id}">${obj.name}</li>
                    `);
                        $li.on('click', showTownInTheInput)
                        $('#towns ul').append($li);
                    });
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    function showTownInTheInput() {
        currTown = event.target.textContent;
        currTownId = event.target.id;
        $('#towns input').val(`${currTown}`)
    }

    // async function createTown() {
    //     let country = $('#towns ul').val();
    //     if (country) {
    //         let currObj = {
    //             "name": $('#towns input').val(),
    //             country
    //         }
    //         try {
    //             let response = await $.ajax({
    //                 method: "POST",
    //                 url: baseUrl + appKey + "/" + secondEndPoint,
    //                 headers,
    //                 data: JSON.stringify(currObj)
    //             })
    //             resetTowns()
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }


    // async function editTown() {
    //     let country = $('#towns ul').val();
    //     if (country) {
    //         let currObj = {
    //             "name": $('#towns input').val(),
    //             country
    //         }
    //         try {
    //             let response = await $.ajax({
    //                 method: "PUT",
    //                 url: baseUrl + appKey + "/" + secondEndPoint + '/' + currTownId,
    //                 headers,
    //                 data: JSON.stringify(currObj)
    //             })
    //             resetTowns()
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }

    // async function deleteTown() {
    //     try {
    //         let response = await $.ajax({
    //             method: "DELETE",
    //             url: baseUrl + appKey + "/" + secondEndPoint + '/' + currTownId,
    //             headers
    //         })
    //         resetTowns()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



    async function listCountries() {
        try {
            $('#countries').find('ul').remove();
            let request = await $.ajax({
                method: "GET",
                url: baseUrl + appKey + "/" + firstEndPoint,
                headers
            })
            request.forEach(function (obj) {
                let $ul = $(`
            <ul id="${obj._id}">${obj.name}</ul>
        `);
                $ul.on('click', showInTheInput)
                $ul.insertBefore('#countries input')
            });
        } catch (error) {
            console.log(error)
        }
    }

    function showInTheInput(event) {
        currCountry = event.target.textContent;
        currCountryId = event.target.id;
        $('#countries input').val(`${currCountry}`)
    }

    async function createCountry() {
        try {
            let currObj = { "name": $('#countries input').val() }
            let response = await $.ajax({
                method: "POST",
                url: baseUrl + appKey + "/" + firstEndPoint,
                headers,
                data: JSON.stringify(currObj)
            })
            resetCountries()
        } catch (error) {
            console.log(error)
        }
    }

    async function editCountry() {
        try {
            let currObj = {
                "name": $('#countries input').val()
            }
            let response = await $.ajax({
                method: "PUT",
                url: baseUrl + appKey + "/" + firstEndPoint + '/' + currCountryId,
                headers,
                data: JSON.stringify(currObj)
            })
            resetCountries()
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteCountry() {
        try {
            let response = await $.ajax({
                method: "DELETE",
                url: baseUrl + appKey + "/" + firstEndPoint + '/' + currCountryId,
                headers
            })
            resetCountries()
        } catch (error) {
            console.log(error)
        }
    }

    function resetCountries() {
        listCountries();
        $('#countries input').val("")
        currCountryId = "";
    }

    function resetTowns() {
        listTowns();
        $('#towns input').val("")
        currTownId = "";
    }

}