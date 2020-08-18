let backendHost;
if (window.location.href.includes("localhost")) {
  backendHost = "http://localhost:3001";
} else {
  backendHost = "https://goc-api.herokuapp.com";
}

export const API_URL = backendHost;
