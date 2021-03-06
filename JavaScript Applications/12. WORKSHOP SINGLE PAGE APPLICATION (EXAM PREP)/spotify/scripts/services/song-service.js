const songService = (() => {
    function create(title, artist, imageURL) {
        let data = {
            title,
            artist,
            imageURL
        }
        data.likes = 0;
        data.listened = 0;
        return kinvey.post('appdata', 'songs', 'kinvey', data)
    }

    function remove(id) {
        return kinvey.remove('appdata', `songs/${id}`, 'kinvey');
    }

    function listen(id, data) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data);
    }

    function like(id, data) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', data);
    }

    return {
        create,
        remove,
        listen,
        like
    }
})();