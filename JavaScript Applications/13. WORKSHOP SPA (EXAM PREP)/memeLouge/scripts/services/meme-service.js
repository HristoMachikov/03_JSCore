memeService = (() => {
    function getAllMemes() {
        return kinvey.get('appdata', `memes?query={}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    function createMeme(data) {
        return kinvey.post('appdata', 'memes', 'kinvey', data);
    }

    function editMeme(id, data) {
        return kinvey.update('appdata', `memes/${id}`, 'kinvey', data);
    }

    function removeMeme(id) {
        return kinvey.remove('appdata', `memes/${id}`, 'kinvey');
    }

    function getMeme(id) {
        return kinvey.get('appdata', `memes?query={"_id":"${id}"}`, 'kinvey');
    }

    function getUserMeme(userId) {
        return kinvey.get('appdata', `memes?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    return {
        getAllMemes,
        createMeme,
        editMeme,
        removeMeme,
        getMeme,
        getUserMeme
    }
})();