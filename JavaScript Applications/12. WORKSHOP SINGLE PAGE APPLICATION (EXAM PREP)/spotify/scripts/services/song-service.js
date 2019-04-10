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

    return {
        create
    }
})();