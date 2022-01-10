import axios from 'axios'

import BASE_URL from './baseUrl'
import makeConfig from './makeConfig'


const HABITS_URL = `${BASE_URL}/habits`

// TODO: Olá Thiago, a pergunta da vez é: qual o melhor local para montar o body?
// aqui no service (recebendo como argumento os atributos) ou no próprio component
// (como está feito nesse caso)?
const getHabits = ({ token }) => {
	return axios.get(`${HABITS_URL}`, makeConfig(token))
}

const postHabit = ({ token, body }) => {
	return axios.post(`${HABITS_URL}`, body, makeConfig(token))
}

const deleteHabit = ({ token, id }) => {
	return axios.delete(`${HABITS_URL}/${id}`, makeConfig(token))
}

const getTodayHabits = ({ token }) => {
	return axios.get(`${HABITS_URL}/today`, makeConfig(token))
}

const postCheckOrUncheckHabit = ({ token, id, isAlreadyChecked }) => {
	const type = isAlreadyChecked ? 'uncheck' : 'check'
	return axios.post(`${HABITS_URL}/${id}/${type}`, {}, makeConfig(token))
}


export {
	getHabits,
	postHabit,
	deleteHabit,
	getTodayHabits,
	postCheckOrUncheckHabit,
}
