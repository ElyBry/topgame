import axios from 'axios'

const API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

export const axiosRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
})

const API_LOCAL_URL = 'http://localhost:3001'

export const axiosRequestLocal = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
  baseURL: API_LOCAL_URL,
})
