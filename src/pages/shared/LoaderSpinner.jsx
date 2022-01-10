import Loader from 'react-loader-spinner'
import styled from 'styled-components'


const LoaderSpinner = ({ type, color, height, width }) => {
	return (
		<Container>
			<Loader
				type={type || 'ThreeDots'}
				color={color || '#52B6FF'}
				height={height || width || '100'}
				width={width || height || '100'}
			/>
		</Container>
	)
}


export default LoaderSpinner


const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
