import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
	
  html {
		font-family: 'Lexend Deca', sans-serif;
		font-style: normal;
		font-weight: normal;
		color: #666666;
    background-color: #FFFFFF;
  }
	
	button, input {
		border-width: 0px;
		font-family: 'Lexend Deca', sans-serif;
		font-style: normal;
		font-weight: normal;
		color: #666666;
    background-color: #FFFFFF;
	}

	a {
		text-decoration: none;
	}

	strong {
		font-weight: bold;
	}
`


export default GlobalStyle
