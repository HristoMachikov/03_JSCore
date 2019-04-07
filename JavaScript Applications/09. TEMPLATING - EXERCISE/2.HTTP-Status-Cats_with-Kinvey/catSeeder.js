function solve() {

    const baseUrl = "https://baas.kinvey.com/appdata/";
    const appKey = "kid_BJ9CphEYV";
    const endPoint = "cats";
    const baseUser = "guest";
    const basePass = "guest";
    const authoBase64 = btoa(baseUser + ":" + basePass);
    const headers = {
        "Authorization": `Basic ${authoBase64}`,
        "Content-Type": "application/json"
    }

    $('#create').on('click', creatCat)
    $('#read').on('click', listCats)

    // let cats = [];

    async function creatCat() {
        console.log('creatCat')
        let name = $('#inputName').val();
        let sex = $('#inputGender :selected').val();
        let age = +$('#inputAges').val();
        let weight = +$('#inputWeigth').val();
        let someInfo = $('#inputInfo').val();
        let imgNumb = $('#inputImgName').val();
        let img = "cat" + imgNumb + ".jpg";

        if (name && sex && age && weight && img) {
            let newCat = {
                name,
                sex,
                age,
                weight,
                img,
                someInfo
            }
            try {
                let result = await $.ajax({
                    url: baseUrl + appKey + "/" + endPoint,
                    method: "POST",
                    headers,
                    data: JSON.stringify(newCat)
                })
                listCats();
            } catch (error) {
                console.log(error)
                //showError(error)
            }
            $('#inputName').val("");
            $('#inputGender :selected').val("");
            $('#inputAges').val("");
            $('#inputWeigth').val("");
            $('#inputInfo').val("");
            $('#inputImgName').val("");
        }
    }

    async function listCats() {

        $('#allCats').empty();
        try {
            let response = await $.ajax({
                url: baseUrl + appKey + "/" + endPoint,
                method: "GET",
                headers
            })

            window.cats = response;
            renderCatTemplate();
        } catch (error) {
            console.log(error)
            //showError(error)
        }
    }

    // function showError(error) {
    //     let $p = $(`<p>Status: ${error.status} - ${error.responseJSON.result}</p>`);
    //     $('body').append($p);
    // }

};