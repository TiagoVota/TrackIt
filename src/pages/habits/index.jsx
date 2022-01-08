import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { getHabits } from '../../services/service.habits'

import PageContainer from '../components/PageContainer'
import Habit from './Habit'

const mockEmptyHabits = []
const mockHabits = [
	{
		id: 1,
		name: 'Nome do hábito',
		days: [1, 3, 5]
	},
	{
		id: 2,
		name: 'Nome do hábito 2',
		days: [1, 3, 4, 6]
	}
]
const Habits = () => {
	const { userInfo: { token } } = useContext(UserContext)
	const [habitsList, setHabitsList] = useState([])

	useEffect(() => {
		getHabits({ token }).then(({ data }) => {
			// setHabitsList(data)
			// setHabitsList(mockEmptyHabits)
			setHabitsList(mockHabits)
		}).catch(error => {
			alert('Deu ruim ao pegar os hábitos!')
		})
	}, [token])

	const displayHabits = (habitsList) => {
		return (
			Boolean(habitsList[0])
				? habitsList.map((habit, idx) => <Habit key={idx} habitInfo={habit} />)
				: <p>
					Você não tem nenhum hábito cadastrado ainda.
					Adicione um hábito para começar a trackear!
				</p>
		)
	}

	return (
		<PageContainer>
			<TitleContainer>
				<h1>Meus hábitos</h1>

				<button>+</button>
			</TitleContainer>

			<NewHabitBox>

			</NewHabitBox>
			
			<HabitsContainer>{displayHabits(habitsList)}</HabitsContainer>
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
const NewHabitBox = styled.div`
	
`

const HabitsContainer = styled.div`
	width: 90%;
	margin: 0 auto;

	> p {
		margin-top: 10px;
		font-size: 18px;
		line-height: 22px;
	}
`
