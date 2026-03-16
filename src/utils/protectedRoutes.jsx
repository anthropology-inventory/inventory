import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard.jsx'
import SpecimensExplorer from '../pages/SpecimensExplorer.jsx'
import FossilForm from '../pages/forms/FossilForm.jsx'
import SpecimenDetail from '../pages/SpecimenDetail.jsx'
import LoginForm from '../pages/forms/LoginForm.jsx'
import Logout from '../pages/Logout.jsx'
import CreateUserForm from '../pages/forms/CreateUserForm.jsx'
import ManageUsers from '../pages/ManageUsers.jsx'

function ProtectedRoutes() {
  const loggedIn = localStorage.getItem('user') && localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.isAdmin

  return (
    <div>
      { loggedIn ? 
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard/>} 
            />
            <Route 
              path="/Dashboard" 
              element={<Dashboard/>} 
            />
            <Route 
              path="/SpecimensExplorer" 
              element={<SpecimensExplorer/>} 
            />
            <Route 
              path="/specimen/:id" 
              element={<SpecimenDetail/>} 
            />
            <Route 
              path="/AddArtifact" 
              element={
                <FossilForm
                mode='add'
              />} 
            />
            <Route 
              path="/UpdateArtifact/:id" 
              element={
              <FossilForm
                mode='update'
              />
              } 
            />
            <Route path="/LoginForm" element={<Dashboard/>}/>
            <Route 
              path="/Logout" 
              element={<Logout/>} 
            />
            <Route
              path="/CreateUser"
              element={isAdmin ? <CreateUserForm /> : <Navigate to='/' replace />}
            />
            <Route
              path="/ManageUsers"
              element={isAdmin ? <ManageUsers /> : <Navigate to='/' replace />}
            />
          </Routes>
        : 
          <Routes>
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route 
              path="*" 
              element={<Navigate to='/LoginForm' replace />}
            />
          </Routes>
      }
    </div>
  )
}

export default ProtectedRoutes