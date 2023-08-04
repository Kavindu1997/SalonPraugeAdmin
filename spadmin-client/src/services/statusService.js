import http from "./httpService";
import config from "../config.json";

export function getStatus() {
  return http.get(config.apiUrl + "/status");
}
