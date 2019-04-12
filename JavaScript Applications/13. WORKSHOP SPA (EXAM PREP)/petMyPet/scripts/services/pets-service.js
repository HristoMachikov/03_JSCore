const petsService = (() => {

    function getDashboard() {
        return kinvey.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
    }

    function getCategory(category) {
        return kinvey.get('appdata', `pets?query={"category":"${category}"}`, 'kinvey')
    }

    function create(data) {
        return kinvey.post('appdata', 'pets', 'kinvey', data)
    }

    function getMyPets(userId) {
        return kinvey.get('appdata', `pets?query={"_acl.creator":"${userId}"}`, 'kinvey')
    }

    function getDetailsMyPet(petId) {
        return kinvey.get('appdata', `pets?query={"_id":"${petId}"}`, 'kinvey')
    }

    function postDetailsMyPet(petId, data) {
        return kinvey.update('appdata', `pets/${petId}`, 'kinvey', data)
    }

    function deleteMyPet(petId) {
        return kinvey.remove('appdata', `pets/${petId}`, 'kinvey')
    }

    return {
        getDashboard,
        getCategory,
        create,
        getMyPets,
        getDetailsMyPet,
        postDetailsMyPet,
        deleteMyPet
    }
})();