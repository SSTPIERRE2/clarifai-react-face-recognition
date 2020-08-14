import { apiRequest } from "./api";

export const makeTokenHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = token;
    }

    return headers;
};

export const getLoadAuthenticatedUser = (id, token, loadUser, routeChange) => {
    apiRequest(`profile/${id}`, 'get', token)
        .then(resp => resp.json())
        .then(user => {
            if (user && user.email) {
                loadUser(user);
                routeChange('home');
            }
        })
        .catch(console.log)
}