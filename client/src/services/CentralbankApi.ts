export interface ApiError {
  message: string;
  status?: number;
}

export type TransactionStamp = {
  animal: string;
  metal: string | null;
  image_url: string;
};

export interface TransactionResponse {
  transaction_id: number;
  amount: number;
  stamp: TransactionStamp | null;
}

export interface PayoutResponse {
  transaction_id: number;
  amount: number;
}

const API_BASE_URL =
  import.meta.env.VITE_CENTRALBANK_API_URL?.replace(/\/+$/, "") ?? "";
const API_KEY = import.meta.env.VITE_CENTRALBANK_API_KEY;
const USE_MOCK_BANK = import.meta.env.VITE_USE_MOCK_BANK === "true";

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
  if (USE_MOCK_BANK) {
    console.log("Mock transaction", {
      identityToken,
      amount,
    });

    return {
      transaction_id: Date.now(),
      amount,
      stamp: {
        animal: "lion",
        metal: null,
        image_url: "https://example.com/stamp.png",
      },
    };
  }

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
): Promise<PayoutResponse> {
  if (USE_MOCK_BANK) {
    console.log("Mock payout", {
      transactionId,
      amount,
    });

    return {
      transaction_id: Number(transactionId),
      amount,
    };
  }

  return request<PayoutResponse>(`/transactions/${transactionId}/payout`, {
    method: "POST",
    body: JSON.stringify({
      amount,
      api_key: API_KEY,
    }),
  });
}
