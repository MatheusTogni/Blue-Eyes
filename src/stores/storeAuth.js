import { defineStore } from "pinia";
import { ref } from "vue";
import api from "src/service/apiService.js";

export const useStoreAuth = defineStore("auth", () => {
  const currentUser = ref(null);

  const registerUser = async (username, password) => {
    try {
      const response = await api.get(`/usuarios?username=${username}`);
      if (response.data.length > 0) {
        throw new Error("Usuário já existe.");
      }

      await api.post("/usuarios", { username, password });
      return true;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await api.get(
        `/usuarios?username=${username}&password=${password}`
      );
      if (response.data.length === 0) {
        throw new Error("Usuário ou senha incorretos.");
      }

      currentUser.value = response.data[0];
      return true;
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      throw error;
    }
  };

  const isAuthenticated = () => {
    return currentUser.value !== null;
  };

  const logoutUser = () => {
    currentUser.value = null;
  };

  return {
    currentUser,
    registerUser,
    loginUser,
    isAuthenticated,
    logoutUser,
  };
});
