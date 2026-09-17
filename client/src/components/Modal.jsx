export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div onClose={onClose} className="modal" style={{
            'border': '1px, solid, white',
            'textAlign': 'center'
        }}>
            <div className="modal-body" style={{
                    'display': "flex",
                    "flexDirection": "column",
                    'alignItems': "center"
            }}>
                {children}
            </div>
        </div>
    )
}