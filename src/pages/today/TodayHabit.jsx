import { useContext, useState } from 'react'
import { IoCheckbox } from 'react-icons/io5'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { errorModal } from '../../factories/modalFactory'
import { postCheckOrUncheckHabit } from '../../services/service.habits'


const TodayHabit = ({ habitInfo, setUpdateHabits }) => {
	const { userInfo: { token } } = useContext(UserContext)
	const {id, name, done, currentSequence, highestSequence } = habitInfo
	const [isLoading, setIsLoading] = useState(false)

	const errorMsg = {
		401: 'Não autorizado(a) 😔<br/>Refaça seu login, por favor 🥺',
		postCheckOrUncheckHabit: `Não conseguimos atualizar seu hábito 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	const handleClick = () => {
		setIsLoading(true)
		postCheckOrUncheckHabit({ token, id, isAlreadyChecked: done }).then(() => {
			setUpdateHabits({})
		}).catch(({ response: { status } }) => {
			errorModal(errorMsg[status] || errorMsg.postCheckOrUncheckHabit)
		}).finally(() => setIsLoading(false))
	}

	const verifyIsRecord = () => {
		return currentSequence === highestSequence && highestSequence > 0
	}

	const sequenceDisplay = (sequenceValue) => {
		const dayDisplay = sequenceValue > 1 ? 'dias' : 'dia'
		return `${sequenceValue} ${dayDisplay}`
	}
	
	return (
		<ContainerButton disabled={isLoading} onClick={handleClick}>
			<TextBox>
				<h3>{name}</h3>

				<SequenceH4 isDone={done}>
					Sequência atual: <span>{sequenceDisplay(currentSequence)}</span>
				</SequenceH4>
				<RecordH5 isRecord={verifyIsRecord()}>
					Seu recorde: <span>{sequenceDisplay(highestSequence)}</span>
				</RecordH5>
			</TextBox>

			<IoCheckbox
				color={`${done ? '#8FC549' : '#EBEBEB'}`}
				size="80px"
			/>
		</ContainerButton>
	)
}


export default TodayHabit


const ContainerButton = styled.button`
	width: 100%;
	height: 94px;
	padding: 13px 13px 17px 15px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-align: start;
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

const SequenceH4 = styled.h4`
	> span {
		color: ${p => p.isDone ? '#8FC549' : '#666666'};
	}
`

const RecordH5 = styled.h5`
	> span {
		color: ${p => p.isRecord ? '#8FC549' : '#666666'};
	}
`
