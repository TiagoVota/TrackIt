import axios from 'axios'

import BASE_URL from './baseUrl'

const AUTH_URL = `${BASE_URL}/auth`

const postLogin = ({ body }) => {
	return axios.post(`${AUTH_URL}/login`, body)
}


export {
	postLogin,
}
