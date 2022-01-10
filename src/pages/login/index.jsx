import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { postLogin } from '../../services/service.auth'
import { validateLogin } from '../../validations/authValidations'
import { handleValidation } from '../../validations/handleValidation'
import { errorModal } from '../../factories/modalFactory'

import logo from '../../assets/logo.svg'
import LoaderSpinner from '../shared/LoaderSpinner'


const Login = () => {
	const { setUserInfo } = useContext(UserContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const errorMsg = {
		422: 'E-mail não cadastrado 😔',
		401: 'E-mail e/ou senha inválido(s) 😔',
		postLogin: `Não conseguimos fazer o Login 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const body = {
			email,
			password
		}

		const {
			isValid,
			error
		}	= handleValidation(body, validateLogin)
		
		if (!isValid) return errorModal(error)

		setIsLoading(true)
		postLogin({ body }).then(({ data }) => {
			setUserInfo(data)
			clearInputs()
			navigate('/hoje')
		}).catch(({ response: { status } }) => {
			errorModal(errorMsg[status] || errorMsg.postLogin)
		}).finally(() => setIsLoading(false))
	}

	const clearInputs = () => {
		setPassword('')
		setIsLoading('')		
	}

	const makeSubmitButtonText = (isLoading) => {
		return (
			isLoading
				? <LoaderSpinner width={'45px'} color={'#FFFFFF'} />
				: 'Entrar'
		)
	}


	return (
		<Container>
			<img src={logo} alt="TrackIt Logo" />

			<form onSubmit={handleSubmit}>
				<Label htmlFor='E-mail'>E-mail:</Label>
				<Input
					id='E-mail'
					placeholder='Digite seu e-mail...'
					type='email'
					onChange={({ target: { value }}) => setEmail(value)}
					value={email}
					disabled={isLoading}
					isLoading={isLoading}
					required
				/>

				<Label htmlFor='Senha'>Senha:</Label>
				<Input
					id='Senha'
					placeholder='Digite sua senha...'
					type='password'
					onChange={({ target: { value }}) => setPassword(value)}
					value={password}
					disabled={isLoading}
					isLoading={isLoading}
					required
				/>

				<Button
					type='submit'
					disabled={isLoading}
					isLoading={isLoading}
				>
					{makeSubmitButtonText(isLoading)}
				</Button>
			</form>

			<Link to='/cadastro'>
				<P>Primeira vez? Cadastre-se!</P>
			</Link>
		</Container>
	)
}


export default Login


const Container = styled.div`
	width: 100vw;
	height: 100vh;

	> img {
		margin: 10vh calc(50vw - 91px) 5vh;
	}
`

const Label = styled.label`
  margin-left: 10vw;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 18px;
	color: #126BA5;
`

const Input = styled.input`
	width: 80vw;
	height: 45px;
	margin-left: 10vw;
	margin-bottom: 6px;
	padding-left: 11px;
	font-size: 20px;
	line-height: 25px;
	background-color: ${p => p.isLoading ? '#F2F2F2' : '#FFFFFF'};
	border: 1px solid #D5D5D5;
	border-radius: 5px;

	::placeholder {
		color: #DBDBDB;
	}

	:focus {
		color: #52B6FF;
		outline: none;
	}
`

const Button = styled.button`
	width: 80vw;
	height: 45px;
	margin: 5px 10vw 25px;
	background: #52B6FF;
	opacity: ${p => p.isLoading ? 0.7 : 1};
	border-radius: 5px;
	font-size: 21px;
	line-height: 26px;
	color: #FFFFFF;
`

const P = styled.p`
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	text-decoration-line: underline;
	color: #52B6FF;
`
