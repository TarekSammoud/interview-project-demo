import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "react-bootstrap";
import { goToCheckOut } from "../services/commandeApi";
import type { CartItem } from "../types/cart";






export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token, userId } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum: number, item: CartItem) => {
    const garnituresTotal = item.garnitures.reduce(
      (gSum, g) => gSum + (g.prix || 0),
      0
    );
    return sum + item.produit.prix + garnituresTotal;
  }, 0);

  const handlePay = async () => {
    if (!token || !userId) {
      setError("Vous devez être connecté");
      return;
    }

    try {
      setLoading(true);

      // Prepare pendingCommande for backend
      const pendingCommande = cart.map((item: CartItem) => ({
        produit: { id: item.produit.id },
        garnitures: item.garnitures.map((g) => ({
          id: g.id,
          prix: g.prix,
          nom: g.nom,
        })),
      }));

      localStorage.setItem("pendingCommande", JSON.stringify(pendingCommande));

      // Pass total including garnitures
      const checkoutUrl = await goToCheckOut(token, total, { fromCart: true });
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(err.message || "Impossible de lancer le paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Votre panier</h2>

      {cart.length === 0 && <p>Votre panier est vide.</p>}

      {cart.map((item: CartItem, index:number) => {
        const garnituresNames = item.garnitures.map((g) => g.nom).join(", ");

        return (
          <div
            key={index}
            className="d-flex align-items-center border rounded p-3 mb-3 shadow-sm"
          >
            <img
              src={`http://localhost:9091/api/file/${item.produit.media ?? ""}`}
              alt={item.produit.nom}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            <div className="ms-3 flex-grow-1">
              <h5>{item.produit.nom}</h5>

              {item.garnitures.length > 0 && (
                <p className="text-muted mb-1">
                  Garnitures: {garnituresNames}
                </p>
              )}

              <strong>
                {(
                  item.produit.prix +
                  item.garnitures.reduce((gSum, g) => gSum + (g.prix || 0), 0)
                ).toFixed(2)}{" "}
                €
              </strong>
            </div>

            <Button variant="danger" onClick={() => removeFromCart(index)}>
              Supprimer
            </Button>
          </div>
        );
      })}

      {cart.length > 0 && (
        <div className="text-end mt-4">
          <h4>Total: {total.toFixed(2)} €</h4>

          <Button variant="success" disabled={loading} onClick={handlePay}>
            Checkout
          </Button>

          <Button variant="secondary" className="mt-2 ms-2" onClick={clearCart}>
            Vider panier
          </Button>
        </div>
      )}

      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
