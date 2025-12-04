const BASE_URL = "http://localhost:9091/produit";


export const getAllProduits = async (): Promise<any[]> => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch produits');
    }
    const data = await response.json();
    return data;
};

export const getProduitById = async (id: number): Promise<any> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch produit");
    }

    return response.json();
};

export const getProduitByQuery = async (query: string): Promise<any[]> => {
    const response = await fetch(`${BASE_URL}/search/${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch produit");
    }

    return response.json();
};
