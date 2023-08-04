import http from "./httpService";
import config from "../config.json";

export function getTypes() {
  return http.get(config.apiUrl + "/types");
}
