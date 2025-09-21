const baseUrl = "http://localhost:3001";

export const fakeSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "this-jwt-token-is-fake" });
  });
};

export const fakeSignUp = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ message: "Sign up was a success" });
  });
};

export const checkFakeToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        username: "Elise",
        email: "fake-email@example.com",
        _id: "fake-id",
      },
    });
  });
};