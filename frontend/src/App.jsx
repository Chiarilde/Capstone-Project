import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import VenueList from "./components/venue/VenueList.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    element={
                        <ProtectedRoutes>
                            <Outlet />
                        </ProtectedRoutes>
                    }
                >
                    <Route path="/" element={<VenueList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function ProtectedRoutes({ children }) {
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default App;
