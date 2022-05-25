import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../../context/auth";
import { ReactComponent as UserCircle} from '../../../assets/circle-user.svg'

export default function NavLinks() {
  const { user, logout } = useAuth()
  return (
    <>
      <li>
        <NavLink to='/'>All Users</NavLink>
      </li>
      {user &&
        <>
          <li>
            <NavLink to={`/${user.id}/places`}>My Places</NavLink>
          </li>
          <li>
            <NavLink to='/places/new'>Add Place</NavLink>
          </li>
        </>
      }
      <li>
        {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost rounded-btn">
                <UserCircle className="w-7 h-7" fill="currentColor"/>
                <span className='ml-2'>{user.name}</span>
              </label>
              <ul tabIndex="0" className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li><button className='btn btn-ghost' onClick={logout}>Logout</button></li>
                <li>
                  <Link to='/places/new' className="btn btn-ghost">Share Place</Link>
                </li>
              </ul>
            </div>) : (
          <NavLink to='/auth'>Login</NavLink>
        )}
      </li>
    </>
  )
}