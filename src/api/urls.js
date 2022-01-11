import { apiConfig } from "./apiConfig"

const returnApiConfig = (product='', property='')=>{
    const url = apiConfig[product]
    return `${url}/${property}`;
}

export const urls = {
    getLogin: (property)=>returnApiConfig("LOGIN", property)
}