
import api from "./api";

const API_URL = 'http://localhost:3000/'

const getFlights = () => {
  return api.get(API_URL + 'flights');
};

const getPhoto = (id) => {
  return api.get(API_URL + `flights/${id}/photo`, {
    'Content-Type': 'multipart/form-data',
    responseType: 'blob'
  });
};

const getFlightById = (id) => {
  return api.get(API_URL + `flights/${id}/details`);
};

const addFlight = (flight) => {
  return api.post(API_URL + 'flights', flight);
};

const addFlightWithPhoto = (flight) => {
  return api.post(API_URL + 'flights/withPhoto', flight, {
    'Content-Type': 'multipart/form-data'
  });
};

const updateFlight = (id, flight) => {
  return api.put(API_URL + `flights/${id}`, flight, {
    responseType: 'blob',
  });
};

const updateFlightWithPhoto = (id, flight) => {
  return api.put(API_URL + `flights/${id}/withPhoto`, flight, {
    'Content-Type': 'multipart/form-data',
    responseType: 'blob'
  });
};

const deleteFlight = (id) => {
  return api.delete(API_URL + `flights/${id}`);
};

const FlightService = {
  getFlights,
  getFlightById,
  getPhoto,
  addFlight,
  addFlightWithPhoto,
  updateFlight,
  updateFlightWithPhoto,
  deleteFlight
};

export default FlightService;
