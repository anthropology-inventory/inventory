import { NavLink } from 'react-router-dom'
import {
  BsHouse,
  BsClipboardData,
  BsClipboardPlus,
  BsPersonLock,
  BsBoxArrowRight
} from 'react-icons/bs'

const NavBar = () => {
  const isLoggedIn = !!localStorage.getItem('token')

  return (
    <header id="navbar">
      <a id="nav-logo" href="/">
        GRC Anthropology
      </a>
      <div>
        {isLoggedIn ? (
          <>
            <NavLink to="/" className="nav-link">
              <BsHouse />
              Dashboard
            </NavLink>
            <NavLink to="/SpecimensExplorer" className="nav-link">
              <BsClipboardData />
              View Inventory
            </NavLink>
            <NavLink to="/AddArtifact" className="nav-link">
              <BsClipboardPlus />
              Manage Inventory
            </NavLink>
            <NavLink to="/logout" className="nav-link">
              <BsBoxArrowRight />
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/LoginForm" className="nav-link">
              <BsPersonLock />
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default NavBar
