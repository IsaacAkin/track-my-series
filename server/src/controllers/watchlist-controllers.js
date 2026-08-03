import { getAllTitles, getTitlesWithStatus } from "../../database.js";

export const fetchAllWatchlistTitles = async (req, res) => {
    try {
        const titles = await getAllTitles();

        res.json({ titles });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch titles.'
        });
    }
}

/** gets all titles with the specified status and renders them on the specified page */
export const fetchWatchlistTitles = async (req, res) => {
    try {
        const { watchStatus } = req.params;
    
        if (!verifyStatus(watchStatus)) {
            return res.status(404).json({
                message: `${watchStatus} not found`
            });
        };
    
        const titles = await getTitlesWithStatus(watchStatus);
        
        res.json({ titles });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch titles.'
        });
    }
}

/** checks to see if the specified collection is a valid collection */
const verifyStatus = (status) => {
    const views = [
        'planning',
        'watching',
        'paused',
        'completed'
    ];

    if (!views.includes(status)) {
        return false;
    }

    return true;
}