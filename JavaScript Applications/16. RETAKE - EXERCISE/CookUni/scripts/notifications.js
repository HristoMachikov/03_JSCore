const notifications = (() => {
    $(document).on({
        ajaxStart: () => $('#loadingBox').fadeIn(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    })

    function showSuccess(message) {
        let successBox = $('#successBox');
        successBox.text(message);
        successBox.fadeIn();
        successBox.fadeOut(5000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.fadeIn();
        errorBox.on('click', fadeOutError);
    }

    function fadeOutError(event) {
        $('#errorBox').fadeOut(1000);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description)
    }

    return {
        showSuccess,
        showError,
        handleError
    }
})();