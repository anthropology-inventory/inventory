import { HashRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// pages & components
import NavBar from './components/Navbar.jsx'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        {<ProtectedRoutes />}
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
