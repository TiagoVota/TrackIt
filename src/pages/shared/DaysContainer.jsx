import styled from 'styled-components'

import Day from './Day'


const DaysContainer = ({ daysSelected, handleDayClick }) => {
	const displayDays = (daysSelected) => {
		return [...'DSTQQSS'].map((char, index) => <Day
			key={index}
			index={index}
			onClick={handleDayClick}
			char={char}
			isSelected={daysSelected.includes(index)}
		/>)
	}

	return (
		<Container>{displayDays(daysSelected)}</Container>
	)
}


export default DaysContainer


const Container = styled.div`
`
