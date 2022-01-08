import styled from 'styled-components'

import Footer, { footerHeight } from '../shared/Footer'
import Header, { headerHeight } from '../shared/Header'


const PageContainer = ({ children }) => {
	return (
		<>
			<Header />

			<Container>
				{children}
			</Container>

			<Footer />
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
