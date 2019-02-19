function validateRequest(request) {
    let uriRegExp = /^([\w.]+)$/g;
    let msgRegExp = /^([^<>\\&'"]+)$/g;
    let validMethod = false;
    let validURI = false;
    let validVersion = false;
    let validMessage = false;

    if (request.hasOwnProperty('method')) {
        validMethod = methodValidation(request);
        if (!validMethod) {
            printErrorMessages("Method");
        }
    } else {
        printErrorMessages("Method");
    }
    if (request.hasOwnProperty('uri')) {
        validURI = uriValidation(request)
        if (!validURI) {
            printErrorMessages("URI");
        }
    } else {
        printErrorMessages("URI");
    }
    if (request.hasOwnProperty('version')) {
        validVersion = versionValidation(request)
        if (!validVersion) {
            printErrorMessages("Version");
        }
    } else {
        printErrorMessages("Version");
    }
    if (request.hasOwnProperty('message')) {
        validMessage = messageValidation(request)
        if (!validMessage) {
            printErrorMessages("Message");
        }
    } else {
        printErrorMessages("Message");
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
    }
    function uriValidation(request) {
        validURI = false;
        if (uriRegExp.test(request.uri) || request.uri === "*") {
            validURI = true;
        }
        return validURI;
    }
    function versionValidation(request) {
        validVersion = false;
        if (request.version === "HTTP/0.9" ||
            request.version === "HTTP/1.0" ||
            request.version === "HTTP/1.1" ||
            request.version === "HTTP/1.2") {
            validVersion = true;
        }
        return validVersion;
    }
    function messageValidation(request) {
        validMessage = false;
        if (msgRegExp.test(request.message) || request.message === "") {
            validMessage = true;
        }
        return validMessage;
    }
    function printErrorMessages(msg) {
        throw new Error(`Invalid request header: Invalid ${msg}`);
    }
    if (validMethod && validURI && validVersion && validMessage) {
        return request;
    }
}


console.log(validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/0.9',
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

