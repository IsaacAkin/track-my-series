import { createBrowserRouter } from "react-router";
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Title from './pages/Title.jsx';
import Watchlist from './pages/watchlist/Watchlist.jsx';
import Watching from './pages/watchlist/Watching.jsx';
import Paused from './pages/watchlist/Paused.jsx';
import Completed from './pages/watchlist/Completed.jsx';
import Planning from './pages/watchlist/Planning.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        path: 'search',
        Component: Search,
    },
    {
        path: 'title/:id',
        Component: Title,
    },
    {
        path: 'watchlist',
        Component: Watchlist,
        children: [
            { index: true, Component: Watching },
            { path: 'paused', Component: Paused },
            { path: 'completed', Component: Completed },
            { path: 'planning', Component: Planning }
        ]
    }
])