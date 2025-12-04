import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { cart } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          My Resto
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <Link to="/produits" className="nav-link">
                Produits
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/login" className="nav-link">
                Connexion
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative">
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                {cart.length > 0 && (
                  <span
                    className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.75rem", width: "1.2rem", height: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
