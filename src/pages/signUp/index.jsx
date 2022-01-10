import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { postSignUp } from '../../services/service.auth'

import logo from '../../assets/logo.svg'
import LoaderSpinner from '../shared/LoaderSpinner'
import { validateSignUp } from '../../validations/authValidations'
import { handleValidation } from '../../validations/handleValidation'
import { errorModal } from '../../factories/modalFactory'


const SignUp = () => {
	const { setUserInfo } = useContext(UserContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const errorMsg = {
		postSignUp: `Não conseguimos fazer o cadastro 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const body = {
			email,
			password,
			name,
			image		
		}

		const {
			isValid,
			error
		}	= handleValidation(body, validateSignUp)
		
		if (!isValid) return errorModal(error)

		setIsLoading(true)

		postSignUp({ body }).then(({ data }) => {
			setUserInfo(data)
			clearInputs()
			navigate('/')
		}).catch(({ response: { status } }) => {
			errorModal(errorMsg[status] || errorMsg.postSignUp)
		}).finally(() => setIsLoading(false))
	}

	const clearInputs = () => {
		setPassword('')
		setIsLoading('')		
		setName('')		
		setImage('')		
	}

	const makeSubmitButtonText = (isLoading) => {
		return (
			isLoading
				? <LoaderSpinner width={'45px'} color={'#FFFFFF'} />
				: 'Cadastrar'
		)
	}


	return (
		<Container>
			<img src={logo} alt="TrackIt Logo" />

			<form onSubmit={handleSubmit}>
				<Label htmlFor='E-mail'>E-mail:</Label>
				<Input
					id='E-mail'
					placeholder='seulindoemail@email.com'
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
					placeholder='Ex.: Senha123!'
					type='text'
					onChange={({ target: { value }}) => setPassword(value)}
					value={password}
					disabled={isLoading}
					isLoading={isLoading}
					required
				/>

				<Label htmlFor='Nome'>Nome:</Label>
				<Input
					id='Nome'
					placeholder='Ex.: Seu Lindo Nome'
					type='text'
					onChange={({ target: { value }}) => setName(value)}
					value={name}
					disabled={isLoading}
					isLoading={isLoading}
					required
				/>

				<Label htmlFor='Foto'>Foto:</Label>
				<Input
					id='Foto'
					placeholder='Ex.: google.com/imgres?imgurl=minhalindaimagem'
					type='text'
					onChange={({ target: { value }}) => setImage(value)}
					value={image}
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

			<Link to='/'>
				<P>Já tem uma conta? Faça login!</P>
			</Link>
		</Container>
	)
}


export default SignUp


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
