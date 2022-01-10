import { IoCheckbox } from 'react-icons/io5'
import styled from 'styled-components'


const TodayHabit = ({ habitInfo }) => {
	const {id, name, done, currentSequence, highestSequence } = habitInfo

	const sequenceDisplay = (value) => {
		const dayDisplay = value > 1 ? 'dias' : 'dia'
		return `${value} ${dayDisplay}`
	}

	return (
		<Container>
			<TextBox>
				<h3>{name}</h3>

				<H4 isDone={done}>
					Sequência atual: <span>{sequenceDisplay(currentSequence)}</span>
				</H4>
				<H5 isRecord={currentSequence === highestSequence && highestSequence > 0}>
					Seu recorde: <span>{sequenceDisplay(highestSequence)}</span>
				</H5>
			</TextBox>

			<IoCheckbox
				color={`${done ? '#8FC549' : '#EBEBEB'}`}
				size="80px"
			/>
		</Container>
	)
}


export default TodayHabit


const Container = styled.div`
	width: 100%;
	height: 94px;
	padding: 13px 13px 17px 15px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 5px;
	background-color: #FFFFFF;
`

const TextBox = styled.div`
	> h3 {
		margin-bottom: 7px;
		font-size: 20px;
		line-height: 25px;
	}

	> h4, h5 {
		font-size: 13px;
		line-height: 16px;
	}
`
const H4 = styled.h4`
	> span {
		color: ${p => p.isDone ? '#8FC549' : '#666666'};
	}
`

const H5 = styled.h5`
	> span {
		color: ${p => p.isRecord ? '#8FC549' : '#666666'};
	}
`
