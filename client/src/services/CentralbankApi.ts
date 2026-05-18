export interface ApiError {
  message: string;
  status?: number;
}

export interface TransactionResponse {
  id: string;
  stamp: string;
}

const API_BASE_URL = import.meta.env.VITE_CENTRALBANK_API_URL;
const API_KEY = import.meta.env.VITE_CENTRALBANK_API_KEY;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw {
      message:
        response.status === 401
          ? "Your session has expired. Please return to Tivoli."
          : "Centralbank request failed.",
      status: response.status,
    } satisfies ApiError;
  }

  return response.json() as Promise<T>;
}

export async function createTransaction(
  identityToken: string,
  amount: number,
): Promise<TransactionResponse> {
  return request<TransactionResponse>("/transactions", {
    method: "POST",
    body: JSON.stringify({
      identity_token: identityToken,
      amount,
      api_key: API_KEY,
    }),
  });
}

export async function createPayout(
  transactionId: string,
  amount: number,
): Promise<void> {
  await request(`/transactions/${transactionId}/payout`, {
    method: "POST",
    body: JSON.stringify({
      amount,
      api_key: API_KEY,
    }),
  });
}
