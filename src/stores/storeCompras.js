import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { uid, Notify, Dialog } from "quasar";
import api from "src/service/apiService.js";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { useStoreConfiguracoes } from "src/stores/storeConfiguracoes"; 

export const useStoreCompras = defineStore("compras", () => {
  const compras = ref([]);
  const storeEntradas = useStoreEntradas(); 
  const storeConfiguracoes = useStoreConfiguracoes(); 

  const loadCompras = async () => {
    try {
      const response = await api.get("/compras");
      compras.value = response.data.map((compra) => ({
        id: compra.id,
        descricao: compra.descricao || "Sem descrição", 
        valor: compra.valor || 0, 
      }));
    } catch (error) {
      console.error("Erro ao carregar compras:", error);
    }
  };

  const addCompra = async (compraForm) => {
    const novaCompra = {
      id: uid(),
      descricao: compraForm.descricao || "Sem descrição", 
      valor: compraForm.valor || 0,
    };
    try {
      await api.post("/compras", novaCompra);
      compras.value.push(novaCompra); 
    } catch (error) {
      console.error("Erro ao adicionar compra:", error);
    }
  };

  const confirmDeleteCompra = async (compraId, reset) => {
    const promptParaDeletar =
      storeConfiguracoes.configuracoes.compras?.promptParaDeletar ?? false;

    if (promptParaDeletar) {
      Dialog.create({
        title: "Deletar Compra",
        message: "Você tem certeza que deseja excluir esta compra?",
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
      })
        .onOk(async () => {
          await deleteCompra(compraId);
        })
        .onCancel(() => {
          if (reset) reset(); 
        });
    } else {
      await deleteCompra(compraId);
      if (reset) reset(); 
    }
  };

  const updateCompra = async (compraId, updates) => {
    try {
      const currentCompra = compras.value.find((compra) => compra.id === compraId);
      if (!currentCompra) return;
  
      const updatedCompra = { ...currentCompra, ...updates };
      await api.put(`/compras/${compraId}`, updatedCompra);
  
      const index = compras.value.findIndex((compra) => compra.id === compraId);
      if (index !== -1) {
        compras.value[index] = updatedCompra;
      }
  
      Notify.create({
        message: "Compra atualizada com sucesso",
        type: "positive",
        position: "top-right",
      });
    } catch (error) {
      console.error("Erro ao atualizar compra:", error);
      Notify.create({
        message: "Erro ao atualizar compra",
        type: "negative",
        position: "top-right",
      });
    }
  };
  

  const deleteCompra = async (compraId) => {
    try {
      await api.delete(`/compras/${compraId}`);
      compras.value = compras.value.filter((compra) => compra.id !== compraId);
      Notify.create({
        message: "Compra excluída",
        type: "positive",
        position: "top-right",
      });
    } catch (error) {
      console.error("Erro ao deletar compra:", error);
    }
  };

  const finalizarCompras = async () => {
    const total = compras.value.reduce((acc, compra) => acc + compra.valor, 0);
  
    if (total === 0) {
      Notify.create({
        message: "Nenhuma compra para finalizar",
        type: "warning",
        position: "top-right",
      });
      return;
    }
  
    // Cria o objeto da entrada com o total negativo
    const novaEntrada = {
      id: uid(),
      nome: "Compras", // Descrição padrão
      quantidade: -Math.abs(total), // Sempre garante que o valor será negativo
      pago: false,
    };
  
    try {
      // Salva a entrada diretamente no backend
      await api.post("/entradas", novaEntrada);
  
      // Atualiza localmente o store de entradas
      storeEntradas.entradas.push(novaEntrada);
  
      // Limpa a lista de compras no backend e localmente
      for (const compra of compras.value) {
        await api.delete(`/compras/${compra.id}`);
      }
      compras.value = [];
  
      Notify.create({
        message: "Compras finalizadas com sucesso",
        type: "positive",
        position: "top-right",
      });
    } catch (error) {
      console.error("Erro ao finalizar compras:", error);
      Notify.create({
        message: "Erro ao finalizar compras. Tente novamente.",
        type: "negative",
        position: "top-right",
      });
    }
  };
  

  const total = computed(() => {
    return compras.value.reduce((acc, compra) => acc + compra.valor, 0);
  });

  return {
    compras,
    total,
    loadCompras,
    addCompra,
    deleteCompra,
    finalizarCompras,
    updateCompra,
    confirmDeleteCompra,
  };
});
