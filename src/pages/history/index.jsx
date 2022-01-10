import styled from 'styled-components'

import PageContainer from '../components/PageContainer'


const History = () => {
	const displayHabitsHistory = () => {
		return (
			<p>
				Em breve você poderá ver o histórico dos seus hábitos aqui!
			</p>
		)
	}

	return (
		<PageContainer>
			<TitleContainer>
				<h1>Histórico</h1>
			</TitleContainer>

			<HabitsContainer>{displayHabitsHistory()}</HabitsContainer>
		</PageContainer>
	)
}


export default History


const TitleContainer = styled.div`
	margin: 22px 5vw 20px;
	display: flex;
	flex-direction: column;
	font-size: 23px;
	line-height: 29px;
	color: #126BA5;
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
