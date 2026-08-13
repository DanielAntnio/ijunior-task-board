import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !(error.request.responseURL as string).includes("/auth/")
    ) {
      window.location.href = "/login";
    }

    const message = error.response?.data?.error;

    return Promise.reject(
      new Error(
        `A comunicação com a api falhou com status ${error.response?.status ?? 500} e a seguinte mensagem:\n${message}`,
      ) ?? error,
    );
  },
);
