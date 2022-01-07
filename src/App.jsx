import { useState } from 'react'
import PagesRoutes from './Routes'

import UserContext from './contexts/UserContext'


const App = () => {
	const [userInfo, setUserInfo] = useState({})
	
	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			<PagesRoutes />
		</UserContext.Provider>
	)
}


export default App
