function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/';
    const appId = 'kid_BJXTsSi-e';
    const endpoint = 'students';
    const username = 'guest';
    const password = 'guest';
    const header = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }

    async function loadStudents() {
        let students = await $.ajax({
            method: 'GET',
            url: `${baseUrl}appdata/${appId}/${endpoint}`,
            headers: header
        })
        
        let sortedStudents = students.sort((a, b) => {
            return a['ID'] - b['ID']
        });

        console.log(sortedStudents);
        

        sortedStudents.forEach(student => {
            let element = $(`
            <tr>
                <td>${student['ID']}</td>
                <td>${student['FirstName']}</td>
                <td>${student['LastName']}</td>
                <td>${student['FacultyNumber']}</td>
                <td>${student['Grade']}</td>
            </tr>
            `)

            $('#results').append(element);
        })
    }
    loadStudents()

    $('button.add').on('click', addStudent);

    async function addStudent() {
        let newStudent = {
            'ID': Number($('#addStudent input.id').val()),
            'FirstName': $('#addStudent input.first-name').val(),
            'LastName': $('#addStudent input.last-name').val(),
            'FacultyNumber': $('#addStudent input.faculty-number').val(),
            'Grade': Number($('#addStudent input.grade').val())
        }

        let student = await $.ajax({
            method: 'POST',
            url: `${baseUrl}appdata/${appId}/${endpoint}`,
            headers: header,
            data: JSON.stringify(newStudent)
        })
    }
}