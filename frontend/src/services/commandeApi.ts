const BASE_URL = "http://localhost:9090/commande";
const API_URL = "http://localhost:9090";



export const createCommande = async (token: string, payload: any): Promise<any> => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create commande");
  }

  return response.json();
};


export const getCommandesByUserId = async (token: string, userId: number): Promise<any[]> => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch commandes');
  }

  return response.json();
};

export const goToCheckOut = async (
  token: string,
  amount: number,
  options?: { fromCart?: boolean } 
): Promise<string> => {
  const toPay = amount * 100;

  const params = new URLSearchParams();
  params.append("amount", toPay.toString());
  if (options?.fromCart) {
    params.append("fromCart", "true");
  }

  const response = await fetch(`${API_URL}/payment/checkout?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
  }

  const url = await response.text(); 

  if (!url) throw new Error("Checkout URL not provided");

  return url;
};

