export function validateProduct(product) {
    const errors = {};

    if (!product.name || product.name.trim() === "") {
        errors.name = "El nombre del producto es obligatorio";
    } else if (product.name.trim().length < 2) {
        errors.name = "El nombre debe tener al menos 2 caracteres";
    } else if (product.name.trim().length > 100) {
        errors.name = "El nombre no puede exceder 100 caracteres";
    }

    if (product.description && product.description.length > 255) {
        errors.description = "La descripción no puede exceder 255 caracteres";
    }

    if (product.price === "" || product.price === null) {
        errors.price = "El precio es obligatorio";
    } else if (Number(product.price) < 0.01) {
        errors.price = "El precio debe ser mayor que cero";
    }

    if (product.stock === "" || product.stock === null) {
        errors.stock = "El stock es obligatorio";
    } else if (!Number.isInteger(Number(product.stock))) {
        errors.stock = "El stock debe ser un número entero";
    } else if (Number(product.stock) < 0) {
        errors.stock = "El stock no puede ser negativo";
    }

    return errors;
}