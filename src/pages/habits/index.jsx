import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { getHabits } from '../../services/service.habits'
import { errorModal } from '../../factories/modalFactory'

import PageContainer from '../components/PageContainer'
import NewHabit from './NewHabit'
import Habit from './Habit'
import LoaderSpinner from '../shared/LoaderSpinner'


const Habits = () => {
	const { userInfo: { token } } = useContext(UserContext)
	const [habitsList, setHabitsList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isNewHabitHidden, setIsNewHabitHidden] = useState(true)
	const [updateHabits, setUpdateHabits] = useState({})

	const errorMsg = {
		401: 'Não autorizado(a) 😔<br/>Refaça seu login, por favor 🥺',
		getHabits: `Não conseguimos carregar seus hábitos 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	useEffect(() => {
		setIsLoading(true)
		getHabits({ token }).then(({ data }) => {
			setHabitsList(data)
		}).catch(({ response: { status } }) => {
			errorModal(errorMsg[status] || errorMsg.getHabits)
		}).finally(() => setIsLoading(false))
	}, [token, updateHabits])

	const displayHabits = (habitsList) => {
		return (
			Boolean(habitsList[0])
				? habitsList.map((habit, idx) => <Habit
					key={idx}
					habitInfo={habit}
					setUpdateHabits={setUpdateHabits}
				/>)
				: <p>
					Você não tem nenhum hábito cadastrado ainda.
					Adicione um hábito para começar a trackear!
				</p>
		)
	}

	const handleAddHabitCLick = () => setIsNewHabitHidden(!isNewHabitHidden)

	return (
		<PageContainer>
			<TitleContainer>
				<h1>Meus hábitos</h1>

				<button onClick={handleAddHabitCLick}>+</button>
			</TitleContainer>

			{<NewHabit
				setUpdateHabits={setUpdateHabits}
				setIsHidden={setIsNewHabitHidden}
				isHidden={isNewHabitHidden}
			/>}

			{
				isLoading
					? <LoaderSpinner type='TailSpin' />
					: <HabitsContainer>{displayHabits(habitsList)}</HabitsContainer>
			}
		</PageContainer>
	)
}


export default Habits


const TitleContainer = styled.div`
	margin: 22px 5vw 20px;
	display: flex;
	justify-content: space-between;
	font-size: 23px;
	line-height: 29px;
	color: #126BA5;

	> button {
		width: 40px;
		height: 35px;
		border-radius: 5px;
		font-size: 27px;
		line-height: 34px;
		text-align: center;
		color: #FFFFFF;
		background: #52B6FF;
	}
`

const HabitsContainer = styled.div`
	width: 90%;
	margin: 0 auto;

	> p {
		margin-top: 10px;
		font-size: 18px;
		line-height: 22px;
	}

	&:last-child {
		margin-bottom: 37px;
	}
`
