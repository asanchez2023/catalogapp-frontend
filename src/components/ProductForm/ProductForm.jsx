import { useState } from "react";
import { validateProduct } from "../../utils/validation";
import "./ProductForm.css";
const emptyProduct = {
    name: "",
    description: "",
    price: "",
    stock: "",
};

function ProductForm({ product, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(() =>
    product
        ? {
              name: product.name || "",
              description: product.description || "",
              price: product.price ?? "",
              stock: product.stock ?? "",
          }
        : emptyProduct
);
    const [errors, setErrors] = useState({});

    const isEditing = Boolean(product);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateProduct(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await onSubmit({
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
        });

        if (!isEditing) {
            setFormData(emptyProduct);
        }

        setErrors({});
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? "Editar producto" : "Nuevo producto"}</h2>

            <div className="form-group">
                <label htmlFor="name">Nombre</label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                />

                {errors.name && (
                    <span className="field-error">{errors.name}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="description">Descripción</label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={255}
                    rows={4}
                />

                {errors.description && (
                    <span className="field-error">
                        {errors.description}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="price">Precio</label>

                <input
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                />

                {errors.price && (
                    <span className="field-error">{errors.price}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="stock">Stock</label>

                <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.stock}
                    onChange={handleChange}
                />

                {errors.stock && (
                    <span className="field-error">{errors.stock}</span>
                )}
            </div>

            <div className="form-actions">
                <button type="submit">
                    {isEditing ? "Actualizar" : "Crear producto"}
                </button>

                {isEditing && (
                    <button type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

export default ProductForm;