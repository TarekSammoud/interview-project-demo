import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { createCommande } from "../services/commandeApi";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
    const { token, userId } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const createOrderAfterPayment = async () => {
            if (!token || !userId) return;

            try {
                const pendingCommande = JSON.parse(localStorage.getItem("pendingCommande") || "[]");

                if (pendingCommande.length === 0) return;

                await createCommande(token, {
                    customer: { id: userId },
                    commandeProduits: pendingCommande.map((p: any) => ({
                        produit: { id: p.produit.id },
                        garnitures: p.garnitures,
                    })),
                });

                localStorage.removeItem("pendingCommande");
                alert("Commande successfully created!");
                navigate("/produits");
            } catch (err: any) {
                console.error(err);
                alert("Failed to create commande after payment");
            }
        };

        createOrderAfterPayment();
    }, [token, userId, navigate]);

    return <div>Processing your payment...</div>;
}
