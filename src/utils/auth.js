const TokenKey = "token";

export function getToken() {
  if (localStorage.getItem(TokenKey)) {
    return localStorage.getItem(TokenKey);
  } else {
    return null;
  }
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
