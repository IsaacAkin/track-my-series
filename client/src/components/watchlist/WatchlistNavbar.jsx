import { NavLink } from "react-router";

export default function WatchlistNavbar() {
    return (
        <nav className="navbar">
            <NavLink to={'.'} end className={({ isActive }) => isActive ? 'active-link' : ''}>All Titles</NavLink>
            <NavLink to={'watching'} className={({ isActive }) => isActive ? 'active-link' : ''}>Watching</NavLink>
            <NavLink to={'paused'} className={({ isActive }) => isActive ? 'active-link' : ''}>Paused</NavLink>
            <NavLink to={'completed'} className={({ isActive }) => isActive ? 'active-link' : ''}>Completed</NavLink>
            <NavLink to={'planning'} className={({ isActive }) => isActive ? 'active-link' : ''}>Planning</NavLink>
        </nav>
    )
}