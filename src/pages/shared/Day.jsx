import styled from 'styled-components'


const Day = ({ char, isSelected, index, onClick: handleClick }) => {
	return (
		<Button onClick={() => handleClick(index)} isSelected={isSelected}>
			{char}
		</Button>
	)
}


export default Day


const Button = styled.button`
	width: 30px;
	height: 30px;
	margin-right: 4px;
	font-size: 20px;
	line-height: 25px;
	color: ${p => p.isSelected ? '#FFFFFF' : '#D5D5D5'};
	background: ${p => p.isSelected ? '#D5D5D5' : '#FFFFFF'};
	border: 1px solid #DBDBDB;
	border-radius: 5px;
`
