import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAllGarniture } from "../services/garnitureApi";
import { useAuthContext } from "../context/AuthContext";
import { goToCheckOut, createCommande } from "../services/commandeApi";
import { useCart } from "../context/CartContext";

interface Garniture {
    id: number;
    nom: string;
    type: "SAUCE" | "LEGUME" | "FROMAGE";
    prix: number;
}

interface Produit {
    id: number;
    nom: string;
    prix: number;
    media: string;
}

export interface ProductCardProps {
    produit: Produit;
    userId: number | null;
    token: string | null;
    createCommande: (payload: { produitId: number; garnitureIds?: number[] }) => Promise<any>;
}


const ProductCard: React.FC<ProductCardProps> = ({ produit }) => {
    const { token, userId } = useAuthContext();
    const [modalShow, setModalShow] = useState(false);
    const [selectedGarnitures, setSelectedGarnitures] = useState<number[]>([]);
    const [availableGarnitures, setAvailableGarnitures] = useState<Garniture[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checkoutStarted, setCheckoutStarted] = useState(false);


    const { addToCart } = useCart();


    useEffect(() => {
        const loadGarnitures = async () => {
            try {
                const fetched = await getAllGarniture();
                setAvailableGarnitures(fetched);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch garnitures");
            }
        };
        loadGarnitures();
    }, []);

    const handleAddToCart = () => {
        const cartItem = {
            produit: { id: produit.id, nom: produit.nom, prix: produit.prix, media: produit.media },
            garnitures: selectedGarnitures.map(id => {
                const garn = availableGarnitures.find(g => g.id === id);
                return { id: id, prix: garn?.prix || 0, nom:garn?.nom };
            })
        };

        addToCart(cartItem);
        setModalShow(false);
    };

    // Group garnitures by type
    const groupedGarnitures = availableGarnitures.reduce<Record<string, Garniture[]>>(
        (acc, g) => {
            if (!acc[g.type]) acc[g.type] = [];
            acc[g.type].push(g);
            return acc;
        },
        {}
    );

    const totalPrice = selectedGarnitures.reduce((sum, id) => {
        const garn = availableGarnitures.find((g) => g.id === id);
        return sum + (garn ? garn.prix : 0);
    }, produit.prix);

    const handlePay = async () => {

        if (!token || !userId) {
            setError("You must be logged in");
            return;
        }
        if (checkoutStarted) return;
        setCheckoutStarted(true);

        try {
            setLoading(true);
            // Save pending order in localStorage for after payment
            const pendingCommande = [
                {
                    produit: { id: produit.id },
                    garnitures: selectedGarnitures.map((id) => ({ id })),
                },
            ];
            localStorage.setItem("pendingCommande", JSON.stringify(pendingCommande));

            const checkoutUrl = await goToCheckOut(token, totalPrice);
            window.location.href = checkoutUrl; // redirect to Stripe
        } catch (err: any) {
            setError(err.message || "Failed to start checkout");
            setCheckoutStarted(false);

        } finally {
            setLoading(false);
            setCheckoutStarted(false);

        }
    };

    return (
        <>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div
                    className="card h-100 shadow-sm"
                    onClick={() => setModalShow(true)}
                    style={{ cursor: "pointer" }}
                >
                    <img
                        src={`http://localhost:9091/api/file/${produit.media}`}
                        className="card-img-top"
                        alt={produit.nom}
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{produit.nom}</h5>
                        <p className="card-text">{produit.prix}€</p>
                    </div>
                </div>
            </div>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{produit.nom}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap">
                        <div style={{ flex: 1, minWidth: "250px", marginRight: "20px" }}>
                            <img
                                src={`http://localhost:9091/api/file/${produit.media}`}
                                alt={produit.nom}
                                className="img-fluid rounded mb-2"
                            />
                            <h5>{produit.nom}</h5>
                            <p>{produit.prix}€</p>
                        </div>

                        <div style={{ flex: 2, minWidth: "300px" }}>
                            {error && <div className="alert alert-danger">{error}</div>}

                            {Object.entries(groupedGarnitures).map(([type, garnList]) => (
                                <div className="mb-3" key={type}>
                                    <label className="form-label">{type}</label>
                                    {garnList.map((garn) => (
                                        <div className="form-check" key={garn.id}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={garn.id}
                                                id={`garn-${garn.id}`}
                                                checked={selectedGarnitures.includes(garn.id)}
                                                onChange={(e) => {
                                                    const id = garn.id;
                                                    if (e.target.checked) {
                                                        setSelectedGarnitures([...selectedGarnitures, id]);
                                                    } else {
                                                        setSelectedGarnitures(
                                                            selectedGarnitures.filter((gId) => gId !== id)
                                                        );
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor={`garn-${garn.id}`}>
                                                {garn.nom} ({garn.prix}€)
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <div className="mb-3">
                                <h5>Total: {totalPrice.toFixed(2)} €</h5>
                            </div>

                            <div className="d-flex gap-2">
                                <Button variant="primary" onClick={handleAddToCart}>
                                    Ajouter au panier
                                </Button>

                                <Button variant="success" disabled={loading} onClick={handlePay}>
                                    Checkout ({totalPrice.toFixed(2)} €)
                                </Button>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProductCard;
