import request from "./api";

const productService = {
    getAll: () => {
        return request("/products");
    },

    getById: (id) => {
        return request(`/products/${id}`);
    },

    create: (product) => {
        return request("/products", {
            method: "POST",
            body: JSON.stringify(product),
        });
    },

    update: (id, product) => {
        return request(`/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(product),
        });
    },

    remove: (id) => {
        return request(`/products/${id}`, {
            method: "DELETE",
        });
    },
};

export default productService;