// inspired by vue-element-admin
// https://panjiachen.github.io/vue-element-admin-site/guide/essentials/server.html#front-end-request-flow

import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_ENDPOINT, // url = base url + request url
  timeout: 12000,
  headers: {
    'Content-type': 'application/json',
  },
  // default method
  method: 'GET',
})

// request interceptor
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

// response interceptor
service.interceptors.response.use(
  response => response.data,
  // custom error will be handled here
  error => Promise.reject(error)
)

export default service
