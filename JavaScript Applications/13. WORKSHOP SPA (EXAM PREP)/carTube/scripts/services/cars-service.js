const carsService = (() => {
    function getMyListings(username) {
        return kinvey.get('appdata', `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    function getAllListings() {
        return kinvey.get('appdata', `cars?query={}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    function getDetails(id) {
        return kinvey.get('appdata', `cars/${id}`, 'kinvey');
    }

    function removeListing(id) {
        return kinvey.remove('appdata', `cars/${id}`, 'kinvey');
    }

    function createListing(data) {
        return kinvey.post('appdata', `cars`, 'kinvey', data);
    }

     function editListing(id, data) {
        return kinvey.update('appdata', `cars/${id}`, 'kinvey', data);
    }

    return {
        getMyListings,
        getAllListings,
        getDetails,
        removeListing,
        createListing,
        editListing
    }
})();