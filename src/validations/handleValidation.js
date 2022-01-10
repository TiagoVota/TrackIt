import { messages } from 'joi-translation-pt-br'


const handleValidation = (object, objectValidation) => {
	const objectError = objectValidation.validate(object, { messages }).error
	const errorMessage = objectError?.details?.[0]?.message
	const error = Boolean(errorMessage) ? improveErrorText(errorMessage) : null
	
	return {
		isValid: !objectError,
		error
	}
}

const improveErrorText = (errorStr) => {
	const strReplaces = [
		['email', 'E-mail'],
		['password', 'Senha'],
		['name', 'Nome'],
		['image', 'Foto'],
		['days', 'Dias do hábito'],
	]

	return strReplaces.reduce((acc, rep) => acc.replace(rep[0], rep[1]), errorStr)
}


export {
	handleValidation,
}
