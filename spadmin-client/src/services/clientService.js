import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/clients";

function clientUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getClients() {
  return http.get(apiEndPoint);
}

export function getClient(clientId) {
  return http.get(clientUrl(clientId));
}

export function saveClient(client) {
  if (client._id) {
    const body = { ...client };
    delete body._id;
    return http.put(clientUrl(client._id), body);
  }

  return http.post(apiEndPoint, client);
}

export function deleteClient(clientId) {
  return http.delete(clientUrl(clientId));
}
