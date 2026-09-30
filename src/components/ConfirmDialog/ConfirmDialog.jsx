import "./ConfirmDialog.css";

function ConfirmDialog({ isOpen, product, onConfirm, onCancel }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Confirmar eliminación</h2>

                <p>
                    ¿Está seguro de eliminar el producto{" "}
                    <strong>{product?.name}</strong>?
                </p>

                <div className="dialog-actions">
                    <button type="button" onClick={onCancel}>
                        Cancelar
                    </button>

                    <button type="button" onClick={onConfirm}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;