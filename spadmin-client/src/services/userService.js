import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/users";

function userUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getUsers() {
  return http.get(apiEndPoint);
}

export function getAvailableUsers(data) {
  return http.post(apiEndPoint + "/availablestylists", data);
}

export function getUser(userId) {
  return http.get(userUrl(userId));
}

export function inviteUser(user) {
  return http.post(apiEndPoint + "/invite", {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });
}

export function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  }
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}
