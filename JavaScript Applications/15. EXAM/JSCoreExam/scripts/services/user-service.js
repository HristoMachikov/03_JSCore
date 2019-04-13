const userService = (() => {
    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(res) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('userId', res._id);
    }

    function register(username, password) {
        let data = { username, password }
        return kinvey.post('user', '', 'basic', data);
    }

    function login(username, password) {
        let data = { username, password }
        return kinvey.post('user', 'login', 'basic', data);
    }

    function logout() {
        return kinvey.post('user', '_logout', 'kinvey');
    }

    return {
        isAuth,
        saveSession,
        register,
        login,
        logout
    }
})();