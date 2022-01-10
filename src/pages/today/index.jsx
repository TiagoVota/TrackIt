import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { errorModal } from '../../factories/modalFactory'
import { getTodayInfo } from '../../services/service.dayjs'
import { getTodayHabits } from '../../services/service.habits'
import { makePercentage } from '../../utils/makePercentage'

import PageContainer from '../components/PageContainer'
import LoaderSpinner from '../shared/LoaderSpinner'
import TodayHabit from './TodayHabit'


const Today = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)
	const { token } = userInfo
	const [todayList, setTodayList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [updateHabits, setUpdateHabits] = useState({})
	const percentage = makePercentage(todayList)

	const errorMsg = {
		401: 'Não autorizado(a) 😔<br/>Refaça seu login, por favor 🥺',
		getTodayHabits: `Não conseguimos carregar seus hábitos diários 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	useEffect(() => {
		setIsLoading(true)
		getTodayHabits({ token }).then(({ data }) => {
			setTodayList(data)
		}).catch(({ response: { status } }) => {
			errorModal(errorMsg[status] || errorMsg.getTodayHabits)
		}).finally(() => setIsLoading(false))
	}, [token, updateHabits])

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
					setUpdateHabits={setUpdateHabits}
				/>)
				: <p>
					Você não tem nenhum hábito cadastrado ainda.
					Adicione um hábito para começar a trackear!
				</p>
		)
	}

	return (
		<PageContainer>
			{
				isLoading
					? <LoaderSpinner type='TailSpin' />
					: <>
						<TitleContainer someHabitCompleat={percentage > 0}>
							<h1>{getTodayInfo()}</h1>

							<h2>{displayCompleatHabitsMsg()}</h2>
						</TitleContainer>

						<HabitsContainer>{displayTodayHabits()}</HabitsContainer>
					</>
			}
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
