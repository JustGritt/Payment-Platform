// apiService.js
import axios from "axios";
import { userState } from "../contexts/User";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Remplacez cette URL par l'URL de votre serveur API
  headers: {
    "Content-Type": "application/json",

  },
});


// apiClient.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${userState.token}`;
//   return config;
// });

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

  login: async (data) => {
    try {
      console.log(data);
      const response = await apiClient.post("/login", JSON.stringify(data));
      return response;
    } catch (error) {
      throw error;
    }
  },

  adminLogin: async (data) => {
    try {
      console.log(data);
      const response = await apiClient.post("/admin404", JSON.stringify(data));
      return response;
    } catch (error) {
      throw error;
    }
  },

  getAllMerchants: async () => {
    try {
      const response = await apiClient.get("/merchants");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  regenerateToken: async () => {
    try {

        apiClient.interceptors.request.use(config => {
          console.log(userState.token)
          config.headers.Authorization = `Bearer ${userState.token}`;
          return config;
        });

      const response = await apiClient.get("/regenerateToken");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
