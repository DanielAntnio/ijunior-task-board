import type { User } from "../types/api";
import { api } from "./api";

export async function apiLogin(email: string, password: string) {
  const response = await api.post<{ user: User }>("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function apiRegister(email: string, password: string) {
  const response = await api.post<{ user: User }>("/auth/register", {
    email,
    password,
  });

  return response.data;
}

export async function apiRefresh() {
  const response = await api.post<{ user: User }>("/auth/refresh");

  return response.data;
}

export async function apiLogout() {
  const response = await api.post<{ message: string }>("/auth/logout");

  return response.data;
}

export async function apiMe() {
  const response = await api.get<{ user: User }>("/auth/me");

  return response.data;
}
