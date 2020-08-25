export const APP_URL = 'http://localhost:3000';

const makeRequestHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = token;
    }

    return headers;
};

export const apiRequest = (route, method, token, body) => {
    const init = {
        method,
        headers: makeRequestHeaders(token)
    }

    if (body) {
        init.body = JSON.stringify(body);
    }

    return fetch(`${APP_URL}/${route}`, init)
}