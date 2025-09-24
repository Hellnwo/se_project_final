const baseUrl = "http://localhost:3001";

export const fakeSignIn = (email, password) => {
  return new Promise((res) => {
    res({ token: "this-jwt-token-is-fake" });
  });
};

export const fakeSignUp = (email, password) => {
  return new Promise((res) => {
    res({ message: "Sign up was a success" });
  });
};

export const checkFakeToken = (token) => {
  return new Promise((res) => {
    res({
      data: {
        username: "Elise",
        email: "fake-email@example.com",
        _id: "fake-id",
      },
    });
  });
};