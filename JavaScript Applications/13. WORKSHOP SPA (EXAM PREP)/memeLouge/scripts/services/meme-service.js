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

    return {
        getAllMemes,
        createMeme,
        editMeme,
        removeMeme
    }
})();