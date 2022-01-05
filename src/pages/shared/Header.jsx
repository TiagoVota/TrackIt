import styled from 'styled-components'


const Header = () => {
	return (
		<Container>
		</Container>
	)
}


export default Header
export {
	headerHeight
}


const headerHeight = '67px'

const Container = styled.div`
	height: ${headerHeight};
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
`
