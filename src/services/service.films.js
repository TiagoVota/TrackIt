import axios from 'axios'

import BASE_URL from './baseUrl'


const getSomething = () => {
	return axios.get(`${BASE_URL}/something`)
}


export {
	getSomething,
}
