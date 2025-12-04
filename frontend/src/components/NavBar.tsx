import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function NavBar() {

    const { cart } = useCart();


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Internship Demo App
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
          <ul className="navbar-nav ms-auto">
        <Link to="/cart" className="position-relative">
          <i className="fa-solid fa-cart-shopping fa-2x"></i>

          {cart.length > 0 && (
            <span
              className="badge bg-danger position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: "0.75rem" }}
            >
              {cart.length}
            </span>
          )}
        </Link>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Log-in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/produits">
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
