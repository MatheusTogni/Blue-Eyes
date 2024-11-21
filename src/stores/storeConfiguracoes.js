import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import api from "src/service/apiService.js";

export const useStoreConfiguracoes = defineStore("configuracoes", () => {
  
  const configuracoes = reactive({
    entradas: {
      promptParaDeletar: true,
    },
    todos: {
      promptParaDeletar: true,
    },
    compras: {
      promptParaDeletar: true, 
    },
  });
  

  const loadConfiguracoes = async () => {
    try {
      const response = await api.get("/configuracoes");
      Object.assign(configuracoes, response.data); 
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
  };

  const saveConfiguracoes = async () => {
    try {
      await api.put("/configuracoes", configuracoes);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    }
  };

  watch(
    configuracoes,
    async () => {
      await saveConfiguracoes();
    },
    { deep: true }
  );

  return { configuracoes, loadConfiguracoes, saveConfiguracoes };
});
