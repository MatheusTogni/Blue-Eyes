import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { uid, Notify } from "quasar";
import api from "src/service/apiService.js";


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
      entradas.value = response.data;
    } catch (error) {
      console.error("Erro ao carregar entradas:", error);
    }
  };

  const addEntrada = async (adicionarEntradaForm) => {
    const novaEntrada = Object.assign({}, adicionarEntradaForm, {
      id: uid(),
      pago: false,
    });
    try {
      await api.post("/entradas", novaEntrada);
      entradas.value.push(novaEntrada);
    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
    }
  };

  const deletarEntrada = async (entradaId) => {
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
  };

  const updateEntrada = async (entradaId, updates) => {
    try {
      await api.put(`/entradas/${entradaId}`, updates);
      const index = entradas.value.findIndex(
        (entrada) => entrada.id === entradaId
      );
      if (index !== -1) Object.assign(entradas.value[index], updates);
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
