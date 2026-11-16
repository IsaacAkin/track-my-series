import { useState } from "react";
import Modal from "../Modal.jsx";
import { removeTitleFromDatabase } from "../../services/api.js"

// A button that removes a title from the database when clicked
export default function DeleteTitleButton({ title, setTitle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }

    const deteleTitle = async () => {
        setLoading(true);
        
        try {
            const response = await removeTitleFromDatabase(title._id, title.media_type);

            if (!response.ok) {
                console.log(response.message);
            }

            setTitle(null); // currentTitle state is set to null for Title component re-render
            closeModal();
            console.log(response.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {error && <p>Error deleting title</p>}
            {loading && <p>Deleting...</p>}
            {!loading && <button onClick={openModal}>🗑️</button>}
            <Modal isOpen={isOpen} onClose={closeModal}>
              <p>Are you sure you want to delete "{title.title}" from your watchlist?</p>
                <div className="modal-button-container" style={{
                    'display': "flex",
                    'justifyContent': "center"
                }}>
                    <button type="button" onClick={deteleTitle}>Yes</button>
                    <button type="button" onClick={closeModal}>No</button>
                </div>  
            </Modal>
        </div>
    )   
}