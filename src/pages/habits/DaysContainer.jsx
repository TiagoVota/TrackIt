import Day from './Day'


const DaysContainer = ({ daysSelected, handleDayClick, isDaysDisabled }) => {
	const displayDays = (daysSelected) => {
		return [...'DSTQQSS'].map((char, index) => <Day
			key={index}
			index={index}
			onClick={handleDayClick}
			char={char}
			isSelected={daysSelected.includes(index)}
			isDisabled={isDaysDisabled}
		/>)
	}

	return (
		<div>{displayDays(daysSelected)}</div>
	)
}


export default DaysContainer
