import axios from 'axios';

const ObservationUrl = 'http://localhost:5000/api/observations';
const searchUrl ='http://localhost:5000/api/search';

export const axiosObservationInstance = axios.create({
  baseURL: ObservationUrl,
});

export const axiosSearchInstance = axios.create({
    baseURL: searchUrl,
});