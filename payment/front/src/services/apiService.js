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
  registerMerchant: async (merchantData, contactData) => {
    try {
      console.log(merchantData, contactData)
      const response = await apiClient.post("/register", merchantData, contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      console.log(data);
      const response = await apiClient.post("/login", JSON.stringify(data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
