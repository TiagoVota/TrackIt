import axios from 'axios'

import BASE_URL from './baseUrl'


const AUTH_URL = `${BASE_URL}/auth`

const postLogin = ({ body }) => {
	return axios.post(`${AUTH_URL}/login`, body)
}

const postSignUp = ({ body }) => {
	return axios.post(`${AUTH_URL}/sign-up`, body)
}


export {
	postLogin,
	postSignUp,
}
