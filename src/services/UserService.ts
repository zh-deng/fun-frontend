import { User } from "../types/User";

const API_BASE_URL = "http://localhost:8080/api";

export const UserService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleResponse(response);
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`)
    return handleResponse(response);
  },

  create: async (userData: User) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  update: async(id: number, userData: User) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response)
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response)
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
}