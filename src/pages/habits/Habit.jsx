import { IoTrashOutline } from 'react-icons/io5'
import styled from 'styled-components'

import DaysContainer from '../shared/DaysContainer'


const Habit = ({ habitInfo }) => {
	const { id, name, days } = habitInfo

	return (
		<Box>
			<p>{name}</p>

			<DaysContainer handleDayClick={() => {}} daysSelected={days} />

			<TrashButton>
				<IoTrashOutline
					color={'#666666'}
					size="15px"
				/>
			</TrashButton>
		</Box>
	)
}


export default Habit


const Box = styled.div`
	position: relative;
	width: 90vw;
	height: 91px;
	padding: 13px 0 15px 15px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #FFFFFF;
	border-radius: 5px;

	> p {
		font-size: 20px;
		line-height: 25px;
	}
`

const TrashButton = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	padding: 11px;
	border-radius: 5px;
`
