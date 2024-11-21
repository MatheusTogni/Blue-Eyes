import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "src/service/apiService.js";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { useStoreTodos } from "src/stores/storeTodos";
import { useStoreSemana } from "src/stores/storeSemana";

export const useStoreDashboard = defineStore("dashboard", () => {
  const storeEntradas = useStoreEntradas();
  const storeTodos = useStoreTodos();
  const storeSemana = useStoreSemana();

  const metaGastos = ref(0); // Meta inicial (carregada do backend)

  // Total de gastos da tela de entradas
  const totalGastos = computed(() => {
    return storeEntradas.entradas.reduce(
      (acc, entrada) => acc + entrada.quantidade,
      0
    );
  });

  // Progresso dos gastos em relação à meta
  const progressoGastos = computed(() => {
    if (metaGastos.value > 0) {
      return (Math.abs(totalGastos.value) / metaGastos.value) * 100;
    }
    return 0;
  });  

  // Tarefas prioritárias (primeiras 3 não concluídas)
  const tarefasPrioritarias = computed(() =>
    storeTodos.todos.filter((todo) => !todo.concluido).slice(0, 3)
  );

  // Progresso das tarefas (percentual concluído)
  const totalTarefas = computed(() => storeTodos.todos.length);
  const tarefasConcluidas = computed(
    () => storeTodos.todos.filter((todo) => todo.concluido).length
  );
  const progressoTarefas = computed(() => {
    if (totalTarefas.value > 0) {
      return (tarefasConcluidas.value / totalTarefas.value) * 100;
    }
    return 0;
  });

  // Eventos do dia
  const diaAtual = computed(() => {
    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return diasSemana[new Date().getDay()];
  });
  const eventosDoDia = computed(
    () => storeSemana.eventosSemana[diaAtual.value] || []
  );

  // Função para carregar a meta de gastos do backend
  const loadMetaGastos = async () => {
    try {
      const response = await api.get("/configuracoes");
      metaGastos.value = response.data.metaGastos || 0;
    } catch (error) {
      console.error("Erro ao carregar a meta de gastos:", error);
    }
  };
  

  // Função para salvar a meta de gastos no backend
  const saveMetaGastos = async (novaMeta) => {
    try {
      // Atualiza a meta localmente
      metaGastos.value = novaMeta;
  
      // Atualiza a configuração no backend
      await api.put("/configuracoes", {
        metaGastos: novaMeta, // Atualiza a meta
      });
  
      console.log("Meta de gastos salva com sucesso no backend!");
    } catch (error) {
      console.error("Erro ao salvar a meta de gastos:", error);
      throw error;
    }
  };
  
  
  

  return {
    metaGastos,
    totalGastos,
    progressoGastos,
    tarefasPrioritarias,
    totalTarefas,
    tarefasConcluidas,
    progressoTarefas,
    diaAtual,
    eventosDoDia,
    loadMetaGastos,
    saveMetaGastos,
  };
});
