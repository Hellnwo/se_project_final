class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
};

function checkResponse(res) {
return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}