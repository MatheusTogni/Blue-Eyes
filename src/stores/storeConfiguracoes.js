import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { walk } from "vue/compiler-sfc";

export const useStoreConfiguracoes = defineStore("configuracoes", () => {
  const configuracoes = reactive({
    promptParaDeletar: true
  })

  watch(configuracoes, () => {
    saveConfiguracoes()
  })

  return { configuracoes, saveConfiguracoes };
});
 