function solve() {

    const baseUrl = "https://baas.kinvey.com/appdata/";
    const appKey = "kid_BJXTsSi-e";
    const appSecret = "447b8e7046f048039d95610c1b039390";
    const endPoint = "students";
    const baseUser = "guest";
    const basePass = "guest";
    const authoBase64 = btoa(baseUser + ":" + basePass);
    const headers = {
        "Authorization": `Basic ${authoBase64}`,
        "Content-Type": "application/json"
    }

    $('#creat').on('click', creatStudent)
    $('#list').on('click', listStudents)

    async function creatStudent() {
        let ID = +$('#createStudent').find('.id').val();
        let FirstName = $('#createStudent').find('.firstName').val();
        let LastName = $('#createStudent').find('.lastName').val();
        let FacultyNumber = $('#createStudent').find('.facultyNumber').val();
        let Grade = +$('#createStudent').find('.grade').val();

        if (ID && FirstName && LastName && FacultyNumber && Grade) {
            let newStudent = {
                ID,
                FirstName,
                LastName,
                FacultyNumber,
                Grade
            }
            try {
                let response = await $.ajax({
                    url: baseUrl + appKey + "/" + endPoint,
                    method: "POST",
                    headers,
                    data: JSON.stringify(newStudent)
                })
                listStudents();
            } catch (error) {
                showError(error);
            }

        }
    }

    async function listStudents() {
        $("#results tbody tr:not(:first)").empty();
        try {
            let response = await $.ajax({
                url: baseUrl + appKey + "/" + endPoint,
                method: "GET",
                headers
            })
            let sortedResponse = response.sort((a, b) => a.ID - b.ID)
            sortedResponse.forEach(function (student) {
                let tr = `
            <tr>
                <td>${student.ID}</td>
                <td>${student.FirstName}</td>
                <td>${student.LastName}</td>
                <td>${student.FacultyNumber}</td>
                <td>${student.Grade}</td>
            </tr>
            `;
                $('#results tbody').append(tr);
            });
        } catch (error) {
            showError(error);
        }
    }

    function showError(error) {
        let $p = $(`<p>Status: ${error.status} - ${error.responseJSON.result}</p>`);
        $('#results').append($p);
    }

}