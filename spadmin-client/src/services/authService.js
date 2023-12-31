import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getInviteUser(tokenKey) {
  try {
    return jwtDecode(tokenKey);
  } catch (ex) {
    return null;
  }
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  getInviteUser,
};
export default auth;
