export const makeTokenHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': token
});

export const getLoadAuthenticatedUser = (id, token, loadUser, routeChange) => {
    fetch(`http://localhost:3000/profile/${id}`, {
        method: 'get',
        headers: makeTokenHeaders(token)
    })
        .then(resp => resp.json())
        .then(user => {
            if (user && user.email) {
                loadUser(user);
                routeChange('home');
            }
        })
        .catch(console.log)
}