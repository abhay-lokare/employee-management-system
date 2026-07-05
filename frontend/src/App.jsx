import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/dashboard/Home";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={
                    <DashboardLayout>

                        <Home />

                    </DashboardLayout>
                }
            />

        </Routes>

    );

}

export default App;