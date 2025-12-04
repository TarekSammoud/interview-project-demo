import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Button } from "react-bootstrap";
import { goToCheckOut } from "../services/commandeApi";


export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { token, userId } = useAuthContext();
    const [loading, setLoading] = useState<any>(false)
    const [error, setError] = useState<any>("")


    const total = cart.reduce((sum, item) => sum + item.produit.prix, 0);

    const handlePay = async () => {
        if (!token || !userId) {
            setError("You must be logged in");
            return;
        }

        try {
            setLoading(true);

            const pendingCommande = cart.map((item) => ({
                produit: { id: item.produit.id },
                garnitures: item.garnitures.map((g) => ({ id: g.id })),
            }));

            localStorage.setItem("pendingCommande", JSON.stringify(pendingCommande));

            const total = cart.reduce((sum, item) => sum + item.produit.prix, 0);

            const checkoutUrl = await goToCheckOut(token, total + "", { fromCart: true });
            window.location.href = checkoutUrl;

        } catch (err: any) {
            setError(err.message || "Failed to start checkout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Votre panier</h2>

            {cart.length === 0 && <p>Votre panier est vide.</p>}

            {cart.map((item, index) => (
                <div
                    key={index}
                    className="d-flex align-items-center border rounded p-3 mb-3 shadow-sm"
                >

                    <img
                        src={`http://localhost:9090/api/file/${item.produit.media ?? ""}`}
                        alt={item.produit.nom}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                    />

                    <div className="ms-3 flex-grow-1">
                        <h5>{item.produit.nom}</h5>

                        {item.garnitures.length > 0 && (
                            <p className="text-muted mb-1">
                                {item.garnitures.length} garnitures
                            </p>
                        )}

                        <strong>{item.produit.prix.toFixed(2)} €</strong>
                    </div>

                    <Button variant="danger" onClick={() => removeFromCart(index)}>
                        Supprimer
                    </Button>
                </div>
            ))}

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
        </div>
    );
}
