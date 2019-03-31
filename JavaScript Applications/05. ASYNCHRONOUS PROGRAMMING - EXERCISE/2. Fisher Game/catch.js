function attachEvents() {

    const baseUrl = "https://baas.kinvey.com/appdata/";
    const appKey = "kid_Sy9enso_N";
    const endPoint = "biggestCatches";
    const baseUser = "guest";
    const basePass = "guest";
    const authoBase64 = btoa(baseUser + ":" + basePass);
    const headers = {
        "Authorization": `Basic ${authoBase64}`,
        "Content-Type": "application/json"
    }

    $('.load').on('click', loadAngler)
    $('.add').on('click', addAngler)

    async function loadAngler() {
        let response = await $.ajax({
            method: "GET",
            url: baseUrl + appKey + "/" + endPoint,
            headers
        });

        $('#catches').empty();
        response.forEach(function (obj) {
            let $div = `
             <div class="catch" data-id="${obj._id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${obj.angler}" />
                <label>Weight</label>
                <input type="number" class="weight" value="${obj.weight}" />
                <label>Species</label>
                <input type="text" class="species" value="${obj.species}" />
                <label>Location</label>
                <input type="text" class="location" value="${obj.location}" />
                <label>Bait</label>
                <input type="text" class="bait" value="${obj.bait}" />
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${obj.captureTime}" />
            </div>
            `;
            $('#catches').append($div);

            $btnUpdate = $('<button class="update">Update</button>');
            $btnDelete = $('<button class="delete">Delete</button>');
            $btnUpdate.on('click', updateCatch);
            $btnDelete.on('click', deleteCatch);
            $(`[data-id="${obj._id}"]`).append($btnUpdate).append($btnDelete);
        });
    }

    async function addAngler() {
        let response = await $.ajax({
            method: "POST",
            url: baseUrl + appKey + "/" + endPoint,
            headers,
            data: JSON.stringify({
                "angler": $("#addForm").find(".angler").val(),
                "weight": +$("#addForm").find(".weight").val(),
                "species": $("#addForm").find(".species").val(),
                "location": $("#addForm").find(".location").val(),
                "bait": $("#addForm").find(".bait").val(),
                "captureTime": +$("#addForm").find(".captureTime").val()
            })
        });
        loadAngler();
    }

    async function updateCatch() {
        let id = this.parentNode.getAttribute("data-id");
        let $parent = $(this).parent();
        let currObj = {
            "angler": $parent.find(".angler").val(),
            "weight": +$parent.find(".weight").val(),
            "species": $parent.find(".species").val(),
            "location": $parent.find(".location").val(),
            "bait": $parent.find(".bait").val(),
            "captureTime": +$parent.find(".captureTime").val()
        }
        let response = await $.ajax({
            method: "PUT",
            url: baseUrl + appKey + "/" + endPoint + '/' + id,
            headers,
            data: JSON.stringify(currObj)
        })
        loadAngler();
    }

    async function deleteCatch() {
        let id = this.parentNode.getAttribute("data-id");
        let response = await $.ajax({
            method: "DELETE",
            url: baseUrl + appKey + "/" + endPoint + '/' + id,
            headers
        })
         loadAngler();
    }
}