import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import api from "src/service/apiService.js";

export const useStoreConfiguracoes = defineStore("configuracoes", () => {
  const configuracoes = reactive({
    entradas: {
      promptParaDeletar: true, // Valor inicial para Entradas
    },
    todos: {
      promptParaDeletar: true, // Valor inicial para Tarefas
    },
  });

  const loadConfiguracoes = async () => {
    try {
      const response = await api.get("/configuracoes");
      Object.assign(configuracoes, response.data); // Atualiza localmente
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

  // Salva as configurações automaticamente ao alterar
  watch(
    configuracoes,
    async () => {
      await saveConfiguracoes();
    },
    { deep: true }
  );

  return { configuracoes, loadConfiguracoes, saveConfiguracoes };
});
