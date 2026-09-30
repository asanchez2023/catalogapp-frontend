import "./ProductTable.css";

function ProductTable({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                No hay productos registrados.
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description || "-"}</td>
                            <td>
                                Q {Number(product.price).toFixed(2)}
                            </td>
                            <td>{product.stock}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => onEdit(product)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(product)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;