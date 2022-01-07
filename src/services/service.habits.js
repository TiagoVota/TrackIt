import axios from 'axios'

import BASE_URL from './baseUrl'


const postLogin = ({ body }) => {
	return axios.post(`${BASE_URL}/login`, body)
}


export {
	postLogin,
}
