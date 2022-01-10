import { useContext } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { deleteHabit } from '../../services/service.habits'

import DaysContainer from '../shared/DaysContainer'


const Habit = ({ habitInfo }) => {
	// TODO: Olá Thiago, nesse caso aqui, vale mais a pena eu pegar novamente o token
	// pelo UserContext, passar o token por props no index ou definir a função que lida
	// com o delete do hábito diretamente pelo index?
	const { userInfo: { token } } = useContext(UserContext)
	const { id, name, days } = habitInfo

	const removeHabit = () => {
		const confirmDelete = confirm('Quer deletar mesmo?!')
		if (!confirmDelete) return

		deleteHabit({ token, id }).then(() => {
			alert('Habito deletado!')
		}).catch(error => {
			alert('Deu para delatar o hábito não :(')
			console.log('delete habit error:', error.response)
		})
	}

	return (
		<Box>
			<p>{name}</p>

			<DaysContainer handleDayClick={() => {}} daysSelected={days} />

			<TrashButton onClick={removeHabit}>
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
