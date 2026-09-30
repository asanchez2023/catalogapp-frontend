import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import ProductList from "../components/ProductList/ProductList";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import Toast from "../components/Toast/Toast";
import useProducts from "../hooks/useProducts";

function ProductsPage({ darkMode, onToggleDarkMode }) {
const {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = useProducts();

    useEffect(() => {
         loadProducts();
        }, [loadProducts]);

    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({
            message,
            type,
        });
    };

    const handleSubmit = async (product) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, product);
                setEditingProduct(null);
                showToast("Producto actualizado correctamente");
            } else {
                await createProduct(product);
                showToast("Producto creado correctamente");
            }
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDeleteRequest = (product) => {
        setProductToDelete(product);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) {
            return;
        }

        try {
            await deleteProduct(productToDelete.id);

            showToast("Producto eliminado correctamente");
        } catch (err) {
            showToast(err.message, "error");
        } finally {
            setProductToDelete(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    return (
        <main className="products-page">
            <header className="page-header">
    <div>
        <h1>Catálogo de Productos</h1>
        <p>Administración de productos</p>
    </div>

    <button
        type="button"
        className="theme-toggle"
        onClick={onToggleDarkMode}
        aria-label="Cambiar tema"
    >
        {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
    </button>
</header>

            <section className="form-section">
                <ProductForm
                    key={editingProduct?.id ?? "new"}
                    product={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                    />
            </section>

            <section className="list-section">
                <ProductList
                    products={products}
                    loading={loading}
                    error={error}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                />
            </section>

            <ConfirmDialog
                isOpen={Boolean(productToDelete)}
                product={productToDelete}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setProductToDelete(null)}
            />

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast({
                        message: "",
                        type: "success",
                    })
                }
            />
        </main>
    );
}

export default ProductsPage;