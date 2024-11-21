import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { uid, Notify, Dialog } from "quasar"; 
import api from "src/service/apiService.js";
import { useStoreConfiguracoes } from "src/stores/storeConfiguracoes"; 

export const useStoreEntradas = defineStore("entradas", () => {
  const entradas = ref([]);

  const opcoes = reactive({
    sort: false,
  });

  const total = computed(() => {
    return entradas.value.reduce((accumulator, { quantidade }) => {
      return accumulator + quantidade;
    }, 0);
  });

  const totalPago = computed(() => {
    return entradas.value.reduce((accumulator, { quantidade, pago }) => {
      return pago ? accumulator + quantidade : accumulator;
    }, 0);
  });

  const loadEntradas = async () => {
    try {
      const response = await api.get("/entradas");
      entradas.value = response.data.map((entrada) => ({
        ...entrada,
        pago: entrada.pago ?? false, 
      }));
    } catch (error) {
      console.error("Erro ao carregar entradas:", error);
    }
  };

  const addEntrada = async (novaEntrada) => {
    try {
      const entrada = {
        id: uid(),
        nome: novaEntrada.nome?.trim() || "Compras", 
        quantidade: novaEntrada.quantidade || 0,
        pago: novaEntrada.pago ?? false,
      };
  
      await api.post("/entradas", entrada);
  
      entradas.value.push(entrada);

    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
      Notify.create({
        message: "Erro ao adicionar entrada. Tente novamente.",
        type: "negative",
        position: "top-right",
      });
    }
  };
  
  
  const deletarEntrada = async (entradaId) => {
    const storeConfiguracoes = useStoreConfiguracoes(); 

    if (storeConfiguracoes.configuracoes.entradas.promptParaDeletar) {
      Dialog.create({
        title: "Deletar Entrada",
        message: "Você tem certeza que deseja excluir esta entrada?",
        cancel: true,
        persistent: true,
        ok: {
          label: "Deletar",
          color: "negative",
        },
        cancel: {
          label: "Cancelar",
          color: "primary",
        },
      }).onOk(async () => {
        try {
          await api.delete(`/entradas/${entradaId}`);
          const index = entradas.value.findIndex(
            (entrada) => entrada.id === entradaId
          );
          if (index !== -1) entradas.value.splice(index, 1);
          Notify.create({
            message: "Entrada Deletada",
            position: "top-right",
            type: "positive",
          });
        } catch (error) {
          console.error("Erro ao deletar entrada:", error);
        }
      });
    } else {
      try {
        await api.delete(`/entradas/${entradaId}`);
        const index = entradas.value.findIndex(
          (entrada) => entrada.id === entradaId
        );
        if (index !== -1) entradas.value.splice(index, 1);
        Notify.create({
          message: "Entrada Deletada",
          position: "top-right",
          type: "positive",
        });
      } catch (error) {
        console.error("Erro ao deletar entrada:", error);
      }
    }
  };

  const updateEntrada = async (entradaId, updates) => {
    try {
      const currentEntrada = entradas.value.find(
        (entrada) => entrada.id === entradaId
      );
      if (!currentEntrada) return;

      const updatedEntrada = { ...currentEntrada, ...updates };
      await api.put(`/entradas/${entradaId}`, updatedEntrada);

      const index = entradas.value.findIndex(
        (entrada) => entrada.id === entradaId
      );
      if (index !== -1) {
        entradas.value[index] = { ...entradas.value[index], ...updates };
      }
    } catch (error) {
      console.error("Erro ao atualizar entrada:", error);
    }
  };

  return {
    entradas,
    opcoes,
    total,
    totalPago,
    loadEntradas,
    addEntrada,
    deletarEntrada,
    updateEntrada,
  };
});
