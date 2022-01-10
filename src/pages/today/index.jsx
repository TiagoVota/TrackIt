import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { getTodayInfo } from '../../services/service.dayjs'
import { getTodayHabits } from '../../services/service.habits'
import { makePercentage } from '../../utils/makePercentage'

import PageContainer from '../components/PageContainer'
import TodayHabit from './TodayHabit'


const mockTodayList = [
	{
		'id': 3,
		'name': 'Acordar',
		'done': true,
		'currentSequence': 1,
		'highestSequence': 1
	},
	{
		'id': 4,
		'name': 'Acordar 2',
		'done': false,
		'currentSequence': 1,
		'highestSequence': 2
	},
	{
		'id': 5,
		'name': 'Acordar 3',
		'done': true,
		'currentSequence': 1,
		'highestSequence': 2
	}
]
const Today = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)
	const { token } = userInfo
	const [todayList, setTodayList] = useState([])
	const percentage = makePercentage(todayList)

	useEffect(() => {
		getTodayHabits({ token }).then(({ data }) => {
			setTodayList(data)
			// setTodayList(mockTodayList)
		}).catch(error => {
			console.log('today error:', error.response)
			alert('Deu ruim ao pegar os hábitos de hoje!')
		})
	}, [token])

	useEffect(() => {
		setUserInfo({
			...userInfo,
			percentage
		})
	}, [percentage])

	const displayCompleatHabitsMsg = () => {
		return (
			Boolean(percentage > 0)
				? <>{`${percentage}% dos hábitos concluídos`}</>
				: 'Nenhum hábito concluído ainda'
		)
	}

	const displayTodayHabits = () => {
		return (
			Boolean(todayList[0])
				? todayList.map((todayHabit, idx) => <TodayHabit
					key={idx}
					habitInfo={todayHabit}
					setUpdateHabits={'setUpdateHabits'}
				/>)
				: <p>
					Você não tem nenhum hábito cadastrado ainda.
					Adicione um hábito para começar a trackear!
				</p>
		)
	}

	return (
		<PageContainer>
			<TitleContainer someHabitCompleat={percentage > 0}>
				<h1>{getTodayInfo()}</h1>

				<h2>{displayCompleatHabitsMsg()}</h2>
			</TitleContainer>

			<HabitsContainer>{displayTodayHabits()}</HabitsContainer>
		</PageContainer>
	)
}


export default Today


const TitleContainer = styled.div`
	margin: 22px 5vw 20px;
	display: flex;
	flex-direction: column;
	font-size: 23px;
	line-height: 29px;
	color: #126BA5;

	> h2 {
		font-size: 18px;
		line-height: 22px;
		color: ${p => p.someHabitCompleat ? '#8FC549' : '#BABABA'};
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
