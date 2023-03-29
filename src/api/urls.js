import { apiConfig } from './apiConfig'

const returnApiConfig = (product = '', property = '') => {
  const url = apiConfig[product]
  return `${url}/${property}`
}

export const urls = {
  getFrndSearch: (property) => returnApiConfig('SEARCH_FRIENDS', property),
  postFrndReq: (property) => returnApiConfig('FRIEND_REQ', property)
}
