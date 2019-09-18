recipeService = (() => {
    function getAllRecipes() {
        return kinvey.get('appdata', `recipes?query={}&sort={"peopleInterestedIn": -1}`, 'kinvey');
    }

    function createRecipe(data) {
        return kinvey.post('appdata', 'recipes', 'kinvey', data);
    }

    function editRecipe(id, data) {
        return kinvey.update('appdata', `recipes/${id}`, 'kinvey', data);
    }

    function removeRecipe(id) {
        return kinvey.remove('appdata', `recipes/${id}`, 'kinvey');
    }

    function getRecipe(id) {
        return kinvey.get('appdata', `recipes?query={"_id":"${id}"}`, 'kinvey');
    }

    function getUserRecipe(userId) {
        return kinvey.get('appdata', `recipes?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    return {
        getAllRecipes,
        createRecipe,
        editRecipe,
        removeRecipe,
        getRecipe,
        getUserRecipe
    }
})();