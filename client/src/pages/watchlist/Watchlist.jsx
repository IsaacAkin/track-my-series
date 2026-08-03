import { Outlet } from "react-router";
import Navbar from "../../components/Navbar.jsx";
import WatchlistNavbar from '../../components/WatchlistNavbar.jsx'
import '../../styles/watchlist.css';

export default function Watchlist() {
    return(
        <div className="app">
            <Navbar />
            <div>
                <WatchlistNavbar />
                <div className="app">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}