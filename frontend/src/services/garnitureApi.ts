const BASE_URL = "http://localhost:9090/garniture";


export const getAllGarniture = async (): Promise<any[]> => {
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
