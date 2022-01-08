import axios from 'axios'

import BASE_URL from './baseUrl'
import makeConfig from './makeConfig'


// TODO: Olá Thiago, a pergunta da vez é: qual o melhor local para montar o body?
// aqui no service (recebendo como argumento os atributos) ou no próprio component
// (como está feito nesse caso)?
const getHabits = ({ token }) => {
	return axios.get(`${BASE_URL}/habits`, makeConfig(token))
}


export {
	getHabits,
}
