import { useContext } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'

import Footer, { footerHeight } from '../shared/Footer'
import Header, { headerHeight } from '../shared/Header'


const PageContainer = ({ children }) => {
	const { userInfo } = useContext(UserContext)
	const { image, percentage } = userInfo

	return (
		<>
			<Header profileImage={image} />

			<Container>
				{children}
			</Container>

			<Footer percentage={percentage} />
		</>
	)
}


export default PageContainer


const Container = styled.div`
	width: 100vw;
	height: calc(100vh - ${headerHeight} - ${footerHeight});
	margin-top: ${headerHeight};
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	background-color: #F2F2F2;
`
