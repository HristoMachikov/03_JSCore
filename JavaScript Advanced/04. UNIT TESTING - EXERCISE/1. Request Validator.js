function validateRequest(request) {
    let urlRegExp = /^([\w.]+)$/gm;
    let msgRegExp = /^([^"&\\'<>]+)$/gm;
    let validMethod = false;
    let validURI = false;
    let validVersion = false;
    let messageVersion = false;

    if (request.hasOwnProperty('method')) {
        if (!methodValidation(request)) {
            return `Invalid request header: Invalid Method`;
        }
    } else {
        return `Invalid request header: Invalid Method`;
    }
    if (request.hasOwnProperty('uri')) {
        if (!uriValidation(request)) {
            return `Invalid request header: Invalid URI`;
        }
    } else {
        return `Invalid request header: Invalid URI`;
    }
    if (request.hasOwnProperty('version')) {
        if (!versionValidation(request)) {
            return `Invalid request header: Invalid Version`;
        }
    } else {
        return `Invalid request header: Invalid Version`;
    }
    if (request.hasOwnProperty('message')) {
        if (!messageValidation(request)) {
            return `Invalid request header: Invalid Message`;
        }
    } else {
        return `Invalid request header: Invalid Message`;
    }

    if (validMethod &&
        validURI &&
        validVersion &&
        messageVersion) {
        return request;
    }

    function methodValidation(request) {
        validMethod = false;
        if (request.method === "GET" ||
            request.method === "POST" ||
            request.method === "DELETE" ||
            request.method === "CONNECT") {
            validMethod = true;
        }
        return validMethod;
    };
    function uriValidation(request) {
        validURI = false;
        if (urlRegExp.test(request.uri)) {
            validURI = true;
        }
        return validURI;
    };
    function versionValidation(request) {
        validVersion = false;
        if (request.version === "HTTP/0.9" ||
            request.version === "HTTP/1.0" ||
            request.version === "HTTP/1.1" ||
            request.version === "HTTP/1.2") {
            validVersion = true;
        }
        return validVersion;
    };
    function messageValidation(request) {
        messageVersion = false;
        if (msgRegExp.test(request.message) || request.message === "") {
            messageVersion = true;
        }
        return messageVersion;
    };
};

console.log(validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));

console.log(validateRequest({
    method: 'OPTIONS',
    uri: 'git.master',
    version: 'HTTP/1.1',
    message: '-recursive'
}));

console.log(validateRequest({
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
}));

