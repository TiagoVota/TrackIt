import 'react-circular-progressbar/dist/styles.css'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


const Footer = ({ percentage=66 }) => {
	// TODO: Olá Thiago, estou com problemas com o header e o footer tendo uma borda
	// de 1px na direita, como resolver?
	const navigate = useNavigate()

	return (
		<Container>
			<button onClick={() => navigate('/habitos')}>
				Hábitos
			</button>

			<TodayButton onClick={() => navigate('/hoje')}>
				<CircularProgressbar
					value={percentage}
					text={'Hoje'}
					background
					backgroundPadding={6}
					styles={buildStyles({
						backgroundColor: '#52B6FF',
						textColor: '#FFFFFF',
						pathColor: '#FFFFFF',
						trailColor: 'transparent'
					})}
				/>
			</TodayButton>
			
			<button onClick={() => navigate('/historico')}>
				Histórico
			</button>
		</Container>
	)
}


export default Footer
export {
	footerHeight,
}


const footerHeight = '70px'

const Container = styled.div`
	width: 100vw;
	height: ${footerHeight};
	position: absolute;
	left: 0px;
	bottom: 0px;
	display: flex;
	background-color: #FFFFFF;

	> button {
		flex-grow: 1;
		font-size: 18px;
		line-height: 22px;
		text-align: center;
		color: #52B6FF;
	}
`

const TodayButton = styled.button`
	width: 91px;
	height: 91px;
	position: absolute;
	top: -41.5px;
	left: calc((100vw - 91px) / 2);
	border-radius: 50%;
	padding: 0;
`
