const baseUrl = "http://localhost:3001";

const headers = () => ({
  "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  "Content-Type": "application/json"
});

function checkResponse(res) {
return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}