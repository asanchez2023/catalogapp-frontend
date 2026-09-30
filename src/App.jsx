import { useState } from "react";
import ProductsPage from "./pages/ProductsPage";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((currentMode) => !currentMode);
    };

    return (
        <div className={darkMode ? "app dark-mode" : "app"}>
            <ProductsPage
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
            />
        </div>
    );
}

export default App;