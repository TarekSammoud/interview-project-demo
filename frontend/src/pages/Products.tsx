import { useEffect, useState, type FormEvent } from "react";
import { getAllProduits, getProduitByQuery } from "../services/produitApi";
import ProductCard from "../components/ProductCard";
import { createCommande as createCommandeService } from "../services/commandeApi";
import { useAuthContext } from "../context/AuthContext";

interface Produit {
    id: number;
    nom: string;
    prix: number;
    media: string;
}


function Products() {
    const { token, userId } = useAuthContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [produits, setProduits] = useState<Produit[]>([]);
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduits = async (): Promise<any> => {
            try {
                const fetchedProduits = await getAllProduits();
                setProduits(fetchedProduits);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch products ...");
            } finally {
                setLoading(false);
            }
        };
        loadProduits();
    }, []);

const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
        setLoading(true);

        if (!searchQuery.trim()) {
            const fetchedProduits = await getAllProduits();
            setProduits(fetchedProduits);
            setError("");
        } else {
            const results = await getProduitByQuery(searchQuery);
            setProduits(results);
            setError("");
        }
    } catch (err) {
        console.error(err);
        setError("Failed to search products...");
    } finally {
        setLoading(false);
    }
};



    const handleCreateCommande = async (payload: { produitId: number; garnitureIds?: number[] }) => {
        const commandePayload = {
            customer: { id: userId },
            commandeProduits: [
                {
                    produit: { id: payload.produitId },
                    garnitures: payload.garnitureIds?.map((id) => ({ id })) || [],
                },
            ],
            extras: [],
        };

        if (token)
            return createCommandeService(token, commandePayload);
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSearch} className="mb-4 d-flex">
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="row">
                    {produits.map((produit) => (
                        <ProductCard
                            produit={produit}
                            key={produit.id}
                            userId={userId}
                            token={token}
                            createCommande={handleCreateCommande}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;
