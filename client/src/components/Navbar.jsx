import { NavLink } from "react-router";

export default function Navbar() {
    return(
        <header style={{
            border: '2px solid black',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 10px 0 10px'
        }}>
            <span>
                <NavLink to={'/'} style={{ textDecoration: 'none'}}>
                    <h1>Track My Series</h1>
                </NavLink>
            </span>
            <nav className="navbar" style={{
                border: '1px solid red',
                display: 'flex',
                justifyContent: 'space-between',
                justifySelf: 'center',
                alignSelf: 'center'
            }}>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
                <NavLink to={'/watchlist'} className={({ isActive }) => isActive ? 'active-link' : ''}>Watchlist</NavLink>
            </nav>
        </header>
    )
}