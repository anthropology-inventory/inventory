import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard.jsx'
import SpecimensExplorer from '../pages/SpecimensExplorer.jsx'
import FossilForm from '../pages/forms/FossilForm.jsx'
import SpecimenDetail from '../pages/SpecimenDetail.jsx'
import LoginForm from '../pages/forms/LoginForm.jsx'
import Logout from '../pages/Logout.jsx'

function ProtectedRoutes() {
  let loggedIn = localStorage.getItem('user') && localStorage.getItem('token')
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
