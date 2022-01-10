import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { postHabit } from '../../services/service.habits'

import DaysContainer from '../shared/DaysContainer'


const NewHabit = ({ setCreationStatus }) => {
	const { userInfo: { token } } = useContext(UserContext)
	const [habitInfo, setHabitInfo] = useState({ name: '', days: [] })
	const [isLoading, setIsLoading] = useState(false)
	const { name, days } = habitInfo

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

		setIsLoading(true)
		postHabit({ token, body: habitInfo }).then(() => {
			setCreationStatus(false)
		}).catch((error) => {
			console.log('habits creation error:', error.response)
			alert('Deu ruim ao criar o hábito!')
		}).finally(() => setIsLoading(false))
	}

	return (
		<Box>
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
				/>

				<ButtonsContainer>
					<CancelButton type='button' onClick={() => setCreationStatus(false)}>
						Cancelar
					</CancelButton>

					<ConfirmButton type='submit' onClick={submitNewHabit}>
						Salvar
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
	display: flex;
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
`

const ConfirmButton = styled.button`
	color: #FFFFFF;
	background: #52B6FF;
`
