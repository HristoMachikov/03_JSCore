const kinvey = (() => {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_BkBF_ZpLB';
    const APP_SECRET = '5cccf609496c4c6f8befefeeaabaa7e2';

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