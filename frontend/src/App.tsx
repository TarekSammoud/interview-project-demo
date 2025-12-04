import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";
import Login from "./pages/login";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/produits"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout-success"
            element={
              <ProtectedRoute>
                <CheckoutSuccess />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
