import styled from 'styled-components'

import logoName from '../../assets/logoName.svg'
import defaultImage from '../../assets/defaultProfileImage.png'


const Header = ({ profileImage }) => {
	return (
		<Container>
			<img src={logoName} alt="Logo Name" />

			<ProfileImg src={profileImage || defaultImage} alt="Profile Image" />
		</Container>
	)
}


export default Header
export {
	headerHeight
}


const headerHeight = '70px'

const Container = styled.div`
	position: fixed;
	height: ${headerHeight};
	width: 100vw;
	padding: 0 5vw;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #126BA5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`

const ProfileImg = styled.img`
	width: 51px;
	height: 51px;
	border-radius: 50%;
`
