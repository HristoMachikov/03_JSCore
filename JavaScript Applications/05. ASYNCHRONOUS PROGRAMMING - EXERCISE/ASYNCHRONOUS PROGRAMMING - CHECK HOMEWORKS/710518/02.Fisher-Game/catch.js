function attachEvents() {
    const baseUrl = `https://baas.kinvey.com/appdata/kid_Hy1stcyYV/biggestCatches`;
    $('button.load').click(loadCatches);
    $('button.add').click(addCatch);

    function loadCatches() {
        $("#catches").empty();
        $.ajax({
            method: "GET",
            url: baseUrl,
            headers: {
                "Authorization": "Basic " + btoa("guest:guest")
            },
            success: loadCatchesOnSuccess
        });
    }

    function addCatch() {
        let angler = $("fieldset#addForm > input.angler").val();
        $("fieldset#addForm > input.angler").val("");
        let weight = $("fieldset#addForm > input.weight").val();
        $("fieldset#addForm > input.weight").val("");
        let species = $("fieldset#addForm > input.species").val();
        $("fieldset#addForm > input.species").val("");
        let location = $("fieldset#addForm > input.location").val();
        $("fieldset#addForm > input.location").val("");
        let bait = $("fieldset#addForm > input.bait").val();
        $("fieldset#addForm > input.bait").val("");
        let captureTime = $("fieldset#addForm > input.captureTime").val();
        $("fieldset#addForm > input.captureTime").val("");

        let newCatch = {
            angler,
            weight: Number(weight),
            species,
            location,
            bait,
            captureTime: Number(captureTime)
        };

        $.ajax({
            method: "POST",
            url: baseUrl,
            headers: {
                "Authorization": "Basic " + btoa("guest:guest"),
                "Content-Type": "application/json"
            },
            data: JSON.stringify(newCatch)
        });

        loadCatches();
    }


    function loadCatchesOnSuccess(data) {
        let catchesDiv = $("#catches");
        data.map(e => {
            let catchDiv = $(`<div class="catch" data-id="${e._id}">`);
            catchDiv.append($(`<label>Angler</label>`));
            catchDiv.append($(`<input type="text" class="angler" value="${e.angler}"/>`));
            catchDiv.append($(`<label>Weight</label>`));
            catchDiv.append($(`<input type="number" class="weight" value="${e.weight}"/>`));
            catchDiv.append($(`<label>Species</label>`));
            catchDiv.append($(`<input type="text" class="species" value="${e.species}"/>`));
            catchDiv.append($(`<label>Location</label>`));
            catchDiv.append($(`<input type="text" class="location" value="${e.location}"/>`));
            catchDiv.append($(`<label>Bait</label>`));
            catchDiv.append($(`<input type="text" class="bait" value="${e.bait}"/>`));
            catchDiv.append($(`<label>Capture Time</label>`));
            catchDiv.append($(`<input type="number" class="captureTime" value="${e.captureTime}"/>`));
            let updateButton = $('<button class="update">Update</button>');
            let deleteButton = $('<button class="delete">Delete</button>');

            updateButton.click(function (el) {
                let parent = el.target.parentElement;
                $.ajax({
                    method: "PUT",
                    url: `${baseUrl}/${e._id}`,
                    headers: {
                        "Authorization": "Basic " + btoa("guest:guest")
                    },
                    data: JSON.stringify({
                        angler: parent.querySelector('.angler').value,
                        weight: Number(parent.querySelector('.weight').value),
                        species: parent.querySelector('.species').value,
                        location: parent.querySelector('.location').value,
                        bait: parent.querySelector('.bait').value,
                        captureTime: Number(parent.querySelector('.captureTime').value)
                    })
                });

                loadCatches();
            });

            deleteButton.click(function () {
                $.ajax({
                    method: "DELETE",
                    url: `${baseUrl}/${e._id}`,
                    headers: {
                        "Authorization": "Basic " + btoa("guest:guest"),
                        "Content-Type": "application/json"
                    }
                });

                loadCatches();
            });

            catchDiv.append(updateButton);
            catchDiv.append(deleteButton);

            catchesDiv.append(catchDiv);
        });
    }
}