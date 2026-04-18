import { NavLink } from 'react-router-dom'
import {
  BsHouse,
  BsClipboardData,
  BsClipboardPlus,
  BsPersonLock,
  BsPersonPlus,
  BsBoxArrowRight,
  BsGlobeAsiaAustralia 
} from 'react-icons/bs'

/**
 * NavBar component renders the navigation header for the application.
 * Displays different navigation links depending on whether the user is logged in.
 * The login state is determined by the presence of a 'token' in localStorage.
 *
 * @component
 * @returns {JSX.Element} The navigation bar JSX element.
 *
 * @example
 * <NavBar />
 */
const NavBar = () => {
  const isLoggedIn = !!localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.isAdmin

  return (
    <header id="navbar">
      <div>
      <BsGlobeAsiaAustralia />
      <a id="nav-logo" href="/">
        Anthropology Tracker @ GRC
      </a>
      </div>
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

            {isAdmin && (
              <NavLink to="/ManageUsers" className="nav-link">
                <BsPersonPlus />
                Manage Users
              </NavLink>
            )}

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