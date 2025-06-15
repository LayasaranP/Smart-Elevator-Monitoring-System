import { useState } from 'react'
import Title from './components/Navbar/Title'
import Monitoring from './components/Navbar/Monitoring'
import Navbar from './components/Navbar/Navbar'
import UserContext from './context'

const App = () => {

    const [username, setUsername] = useState("")

  return (
    <div className="container bg-gradient-to-br from-slate-900 via-blue-900 to-blue-900 min-h-screen min-w-screen">
  <div>
    <Title />
    <Monitoring />
    <UserContext.Provider value={{ username, setUsername }}>
      <Navbar />
    </UserContext.Provider>
  </div>
</div>

  )
}

export default App
