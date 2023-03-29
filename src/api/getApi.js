import { urls } from './urls'
import axios from 'axios'

export const getFrndSearchApi = (property) => {
  const url = urls.getFrndSearch(property)
  return axios.get(url)
}

export const postFrndReqApi = (property, reqBody) => {
  const url = urls.postFrndReq(property)
  return axios.post(url, reqBody)
}
