import axios from 'axios'

const specificCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = country => {
    const request = axios.get(`${specificCountryUrl}${country}`)
    return request.then(response => response.data)
}

export default getCountry 