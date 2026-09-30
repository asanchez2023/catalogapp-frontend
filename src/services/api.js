const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        let errorMessage = `Error HTTP ${response.status}`;

        try {
            const errorBody = await response.json();

            if (errorBody.message) {
                errorMessage = errorBody.message;
            }
        } catch {
            // La respuesta no contiene JSON
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export default request;