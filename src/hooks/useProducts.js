import { useCallback, useState } from "react";
import productService from "../services/productService";

function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await productService.getAll();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createProduct = async (product) => {
        const createdProduct = await productService.create(product);

        setProducts((currentProducts) => [
            ...currentProducts,
            createdProduct,
        ]);

        return createdProduct;
    };

    const updateProduct = async (id, product) => {
        const updatedProduct = await productService.update(id, product);

        setProducts((currentProducts) =>
            currentProducts.map((currentProduct) =>
                currentProduct.id === id
                    ? updatedProduct
                    : currentProduct
            )
        );

        return updatedProduct;
    };

    const deleteProduct = async (id) => {
        await productService.remove(id);

        setProducts((currentProducts) =>
            currentProducts.filter((product) => product.id !== id)
        );
    };

    return {
        products,
        loading,
        error,
        loadProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    };
}

export default useProducts;