// (function () {
//     class Cat {
//         constructor(id, statusCode, statusMessage, imageLocation) {
//             this.id = id;
//             this.statusCode = statusCode;
//             this.statusMessage = statusMessage;
//             this.imageLocation = imageLocation;
//         }
//     }

//     let cats = [
//         new Cat('100', 100, 'Continue', 'cat100'),
//         new Cat('200', 200, 'Ok', 'cat200'),
//         new Cat('204', 204, 'No content', 'cat204'),
//         new Cat('301', 301, 'Moved permanently', 'cat301'),
//         new Cat('304', 304, 'Not modified', 'cat304'),
//         new Cat('400', 400, 'Bad request', 'cat400'),
//         new Cat('404', 404, 'Not Found', 'cat404'),
//         new Cat('406', 406, 'Not Acceptable', 'cat406'),
//         new Cat('410', 410, 'Gone', 'cat410'),
//         new Cat('500', 500, 'Internal Server Error', 'cat500'),
//         new Cat('511', 511, 'Network Authentication Required', 'cat511')
//     ];

//     window.cats = cats;
// })()

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
        let img = $('#inputImgName').val();

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
                showError(error);
            }

        }
    }

    async function listCats() {
        //console.log('listCats')
        // $("#results tbody tr>td").parent().empty();

        try {
            let response = await $.ajax({
                url: baseUrl + appKey + "/" + endPoint,
                method: "GET",
                headers
            })
           // console.log(response)
            window.cats = response;
            // let sortedResponse = response.sort((a, b) => a.ID - b.ID)
            // console.log(sortedResponse)
            // for (const student of sortedResponse) {
            //     let tr = `
            //         <tr>
            //             <td>${student.ID}</td>
            //             <td>${student.FirstName}</td>
            //             <td>${student.LastName}</td>
            //             <td>${student.FacultyNumber}</td>
            //             <td>${student.Grade}</td>
            //         </tr>
            //     `;
            //     $('#results tbody').append(tr);
            // };
        } catch (error) {
            showError(error);
        }
    }

    function showError(error) {
        let $p = $(`<p>Status: ${error.status} - ${error.responseJSON.result}</p>`);
        $('body').append($p);
    }

};