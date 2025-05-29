import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard.jsx'
import SpecimensExplorer from '../pages/SpecimensExplorer.jsx'
import AddArtifact from '../pages/AddArtifact.jsx'
import SpecimenDetail from '../pages/SpecimenDetail.jsx'
import UpdateProduct from '../pages/UpdateProduct.jsx'
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
              element={<AddArtifact/>} 
            />
            <Route 
              path="/UpdateProduct/:id" 
              element={<UpdateProduct/>} 
            />
            <Route path="/LoginForm" element={<LoginForm/>}/>
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
