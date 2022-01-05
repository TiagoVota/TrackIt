import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ResetStyleCSS from './styles/ResetStyleCSS'
import GlobalStyle from './styles/GlobalStyle'

import Login from './pages/shared/Header'
import SignUp from './pages/homepage'
import Habits from './pages/seats'
import Today from './pages/sessions'
import History from './pages/success'


const PagesRoutes = () => {
	return (
		<Router>
			<ResetStyleCSS />
			<GlobalStyle />

			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/cadastro' element={<SignUp />} />
				<Route path='/habitos' element={<Habits />} />
				<Route path='/hoje' element={<Today />} />
				<Route path='/historico' element={<History />} />
			</Routes>
		</Router>
	)
}


export default PagesRoutes
