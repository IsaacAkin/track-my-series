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
        const { status } = req.params;
    
        if (!verifyStatus(status)) {
            return res.status(404).json({
                message: `${status} not found`
            });
        };
    
        const titles = await getTitlesWithStatus(status);
        
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
        'plan-to-watch',
        'watching',
        'on-hold',
        'completed'
    ];

    if (!views.includes(status)) {
        return false;
    }

    return true;
}