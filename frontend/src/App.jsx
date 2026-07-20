import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import VenueList from "./components/venue/VenueList.jsx";
import BookingPage from "./components/booking/BookingPage.jsx";

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
                    <Route path="/reservations" element={<BookingPage />} />
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
