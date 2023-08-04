import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/reservations";

function reservationUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getClientReservations() {
  return http.get(apiEndPoint);
}

export function getReservation(reservationId) {
  return http.get(reservationUrl(reservationId));
}

export function saveReservation(reservation) {
  if (reservation._id) {
    const body = { ...reservation };
    delete body._id;
    return http.put(reservationUrl(reservation._id), body);
  }

  return http.post(apiEndPoint, reservation);
}

export function deleteReservation(reservationId) {
  return http.delete(reservationUrl(reservationId));
}

export function getEachDayReservations() {
  return http.get(apiEndPoint + "/eachday");
}
