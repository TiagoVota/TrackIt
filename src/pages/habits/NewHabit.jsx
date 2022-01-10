import { useContext, useState } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { errorModal } from '../../factories/modalFactory'
import { postHabit } from '../../services/service.habits'
import { validateHabitCreation } from '../../validations/habitsValidations'
import { handleValidation } from '../../validations/handleValidation'

import DaysContainer from './DaysContainer'
import LoaderSpinner from '../shared/LoaderSpinner'


const NewHabit = ({ setIsHidden, setUpdateHabits, isHidden }) => {
	const { userInfo: { token } } = useContext(UserContext)
	const initialHabitInfo = { name: '', days: [] }
	const [habitInfo, setHabitInfo] = useState(initialHabitInfo)
	const [isLoading, setIsLoading] = useState(false)
	const { name, days } = habitInfo

	const errorMsg = {
		401: 'Não autorizado(a) 😔<br/>Refaça seu login, por favor 🥺',
		noDaysPost: 'Insira ao menos um dia para seu hábito 🥺',
		postHabit: `Não conseguimos criar o hábito 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	const handleDayClick = (dayNumber) => {
		const newDays = [...days]

		if (!newDays.includes(dayNumber)) {
			newDays.push(dayNumber)
			return setAtribute(newDays)
		}

		setAtribute(newDays.filter(day => day !== dayNumber))
	}

	const setAtribute = (newAtribute) => {
		const atributeByType = {
			'object': 'days',
			'string': 'name'
		}
		const atribute = atributeByType[typeof newAtribute]

		const newHabit = { ...habitInfo }
		newHabit[atribute] = newAtribute

		setHabitInfo(newHabit)
	}

	const submitNewHabit = (event) => {
		event.preventDefault()

		if (days.length === 0) return errorModal(errorMsg.noDaysPost)

		const {
			isValid,
			error
		}	= handleValidation(habitInfo, validateHabitCreation)
		
		if (!isValid) return errorModal(error)

		setIsLoading(true)
		postHabit({ token, body: habitInfo }).then(() => {
			setUpdateHabits({})
			setIsHidden(true)
			setHabitInfo(initialHabitInfo)
		}).catch(({ response: { status } }) => {
			errorModal(errorMsg[status] || errorMsg.postHabit)
		}).finally(() => setIsLoading(false))
	}

	const makeSubmitButtonText = () => {
		return (
			isLoading
				? <LoaderSpinner width={'35px'} color={'#FFFFFF'} />
				: 'Salvar'
		)
	}

	return (
		<Box isHidden={isHidden}>
			<form onSubmit={submitNewHabit}>
				<Input
					placeholder='Nome do hábito'
					type='text'
					onChange={({ target: { value }}) => setAtribute(value)}
					value={name}
					disabled={isLoading}
					isLoading={isLoading}
					required
				/>

				<DaysContainer
					handleDayClick={handleDayClick}
					daysSelected={days}
					isDaysDisabled={isLoading}
				/>

				<ButtonsContainer>
					<CancelButton
						type='button'
						onClick={() => setIsHidden(true)}
						disabled={isLoading}
						isLoading={isLoading}
					>
						Cancelar
					</CancelButton>

					<ConfirmButton
						type='submit'
						onClick={submitNewHabit}
						disabled={isLoading}
						isLoading={isLoading}
					>
						{makeSubmitButtonText()}
					</ConfirmButton>
				</ButtonsContainer>

			</form>
		</Box>
	)
}


export default NewHabit


const Box = styled.div`
	width: 90vw;
	height: 180px;
	padding: 13px 0 15px 15px;
	margin: 0 auto 20px;
	display: ${p => p.isHidden ? 'none' : 'flex'};
	flex-direction: column;
	justify-content: space-between;
	background: #FFFFFF;
	border-radius: 5px;
`

const Input = styled.input`
	width: calc(100% - 15px);
	height: 45px;
	padding-left: 11px;
	margin-bottom: 10px;
	border: 1px solid #D5D5D5;
	border-radius: 5px;
	font-size: 20px;
	line-height: 25px;
	background-color: ${p => p.isLoading ? '#F2F2F2' : '#FFFFFF'};

	::placeholder {
		color: #DBDBDB;
	}

	:focus {
		color: #52B6FF;
		outline: none;
	}
`

const ButtonsContainer = styled.div`
	margin: 30px 16px 0 0;
	display: flex;
	justify-content: flex-end;

	> button {
		width: 84px;
		height: 35px;
		margin-left: 15px;
		border-radius: 5px;
		font-size: 16px;
		line-height: 20px;
	}
`

const CancelButton = styled.button`
	color: #52B6FF;
	opacity: ${p => p.isLoading ? 0.7 : 1};
`

const ConfirmButton = styled.button`
	color: #FFFFFF;
	background: #52B6FF;
	opacity: ${p => p.isLoading ? 0.7 : 1};
`
