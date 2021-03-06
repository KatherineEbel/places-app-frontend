import {Link, Outlet} from 'react-router-dom';
import NavLinks from "./NavLinks";
import {useRef } from "react";

export default function MainNavigation() {
  const drawerToggleRef = useRef(null)
  return (
    <div className="drawer">
      <input ref={drawerToggleRef} id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content w-full flex flex-col">
        <div className="navbar bg-base-300 w-full">
          <aside className="flex-none md:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </aside>
          <Link to='/' className="flex-1 px-2 mx-2 text-2xl">
            <h1>YourPlaces</h1>
          </Link>
          <nav className="flex-none hidden md:block">
            <ul className="menu menu-horizontal p-0 bg-base-100">
              <NavLinks/>
            </ul>
          </nav>
        </div>
        <Outlet/>
      </div>
      <nav className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 max-w-xs overflow-y-auto bg-base-100">
          <NavLinks drawerToggleRef={drawerToggleRef}/>
        </ul>
      </nav>
    </div>)
}