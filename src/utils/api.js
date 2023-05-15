export const API_URL = 'https://smart-brains-clarifai-api.herokuapp.com/';
export const LOCAL_API_URL = 'http://localhost:3000';

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
    headers: makeRequestHeaders(token),
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return fetch(`${API_URL}/${route}`, init);
};
