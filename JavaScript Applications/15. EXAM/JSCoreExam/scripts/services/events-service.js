eventService = (() => {
    function getAllEvents() {
        return kinvey.get('appdata', `events?query={}&sort={"peopleInterestedIn": -1}`, 'kinvey');
    }

    function createEvent(data) {
        return kinvey.post('appdata', 'events', 'kinvey', data);
    }

    function editEvent(id, data) {
        return kinvey.update('appdata', `events/${id}`, 'kinvey', data);
    }

    function removeEvent(id) {
        return kinvey.remove('appdata', `events/${id}`, 'kinvey');
    }

    function getEvent(id) {
        return kinvey.get('appdata', `events?query={"_id":"${id}"}`, 'kinvey');
    }

    function getUserEvent(userId) {
        return kinvey.get('appdata', `events?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    return {
        getAllEvents,
        createEvent,
        editEvent,
        removeEvent,
        getEvent,
        getUserEvent
    }
})();