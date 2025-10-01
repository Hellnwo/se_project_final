export const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const handleRequest = (url, options = {}) => {
  return fetch(url, options).then(checkResponse);
};

export const signIn = (email, password, username) => {
  return handleRequest(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  })
};

export const signUp = (email, password, username) => {
  return handleRequest(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  })
};

export const handleToken = (token) => {
  return handleRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
};