import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ResetStyleCSS from './styles/ResetStyleCSS'
import GlobalStyle from './styles/GlobalStyle'

import Login from './pages/login'
import SignUp from './pages/signUp'
import Habits from './pages/habits'
import Today from './pages/today'
import History from './pages/history'


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
