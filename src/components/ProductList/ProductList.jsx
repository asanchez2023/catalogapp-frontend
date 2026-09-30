import ProductTable from "../ProductTable/ProductTable";
import "./ProductList.css";

function ProductList({ products, loading, error, onEdit, onDelete }) {
    if (loading) {
        return <p className="list-loading">Cargando productos...</p>;
    }

    if (error) {
        return <p className="list-error">{error}</p>;
    }

    return (
        <ProductTable
            products={products}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
}

export default ProductList;