// apiService.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Remplacez cette URL par l'URL de votre serveur API
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Ajoutez ici les fonctions pour appeler les différentes routes de votre API
  registerMerchant: async (data) => {
    try {
      console.log(data)
      const response = await apiClient.post("/register", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
