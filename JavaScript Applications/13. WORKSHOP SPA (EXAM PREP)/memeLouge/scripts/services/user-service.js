const userService = (() => {
    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(res) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('userId', res._id);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('avatarUrl', res.avatarUrl);
    }

    function register(username, password, email, avatarUrl) {
        let data = { username, password, email, avatarUrl }
        return kinvey.post('user', '', 'basic', data);
    }

    function login(username, password) {
        let data = { username, password }
        return kinvey.post('user', 'login', 'basic', data);
    }

    function logout() {
        return kinvey.post('user', '_logout', 'kinvey');
    }

    function getUser(userId) {
        return kinvey.get('user', `${userId}`, 'kinvey');
    }

    function removeUser(userId) {
        return kinvey.remove('user', `${userId}`, 'kinvey');
    }

    return {
        isAuth,
        saveSession,
        register,
        login,
        logout,
        getUser,
        removeUser
    }
})();