import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import api from "src/service/apiService.js";

export const useStoreConfiguracoes = defineStore("configuracoes", () => {
  const configuracoes = reactive({
    promptParaDeletar: true, // Valor inicial
  });

  const loadConfiguracoes = async () => {
    try {
      const response = await api.get("/configuracoes");
      Object.assign(configuracoes, response.data); // Atualiza localmente com os dados da API
    } catch (error) {
      console.error("Erro ao carregar configurações:", error);
    }
  };

  const saveConfiguracoes = async () => {
    try {
      // Atualiza a configuração no JSON Web Server
      await api.put("/configuracoes", { ...configuracoes });
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    }
  };

  // Sincroniza automaticamente as configurações sempre que elas mudarem
  watch(
    configuracoes,
    async () => {
      await saveConfiguracoes();
    },
    { deep: true }
  );

  return { configuracoes, loadConfiguracoes, saveConfiguracoes };
});
