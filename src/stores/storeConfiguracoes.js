import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStoreConfiguracoes = defineStore("configuracoes", () => {
  const configuracoes = reactive({
    promptParaDeletar: true
  })

  return { configuracoes };
});
 