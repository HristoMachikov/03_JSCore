const kinvey = (() => {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_BkLV2Z0F4';
    const APP_SECRET = 'c48483a68cb447aeadc2ee9217b08667';

    function makeAuth(auth) {
        if (auth === "basic") {
            return {
                "Authorization": `Basic ${btoa(APP_KEY + ":" + APP_SECRET)}`
            }
        } else {
            return {
                "Authorization": `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }
    }

    function makeRequest(method, startPoint, endPoint, auth) {
        return {
            method,
            url: BASE_URL + startPoint + '/' + APP_KEY + '/' + endPoint,
            headers: makeAuth(auth)
        }
    }

    function get(startPoint, endPoint, auth) {
        return $.ajax(makeRequest("GET", startPoint, endPoint, auth));
    }

    function post(startPoint, endPoint, auth, data) {
        let req = makeRequest("POST", startPoint, endPoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    function update(startPoint, endPoint, auth, data) {
        let req = makeRequest('PUT', startPoint, endPoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    function remove(startPoint, endPoint, auth) {
        return $.ajax(makeRequest('DELETE', startPoint, endPoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
})();