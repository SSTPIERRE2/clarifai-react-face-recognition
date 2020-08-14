export const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
}