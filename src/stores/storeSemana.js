import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar"; // Adicione esta linha
import api from "src/service/apiService.js";

export const useStoreSemana = defineStore("semana", () => {
  const eventosSemana = ref({
    Domingo: [],
    Segunda: [],
    Terça: [],
    Quarta: [],
    Quinta: [],
    Sexta: [],
    Sábado: [],
  });

  const loadEventos = async () => {
    try {
      const response = await api.get("/eventos");
      const eventosOrganizados = {
        Domingo: [],
        Segunda: [],
        Terça: [],
        Quarta: [],
        Quinta: [],
        Sexta: [],
        Sábado: [],
      };

      // Organiza os eventos por dia
      response.data.forEach((evento) => {
        if (eventosOrganizados[evento.dia]) {
          eventosOrganizados[evento.dia].push(evento.descricao);
        }
      });

      eventosSemana.value = eventosOrganizados;
    } catch (error) {
      console.error("Erro ao carregar eventos da semana:", error);
    }
  };

  const addEvento = async (dia, eventoDescricao) => {
    if (!eventoDescricao.trim()) return;

    const novoEvento = { dia, descricao: eventoDescricao.trim() };
    try {
      // Adiciona o evento como um item separado no JSON Server
      await api.post("/eventos", novoEvento);

      // Atualiza localmente a lista de eventos
      if (!eventosSemana.value[dia]) {
        eventosSemana.value[dia] = [];
      }
      eventosSemana.value[dia].push(eventoDescricao.trim());
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  const updateEvento = async (dia, eventoAntigo, eventoNovo) => {
    try {
      // Busca o evento correspondente no backend
      const response = await api.get(`/eventos?dia=${dia}&descricao=${eventoAntigo}`);
      const evento = response.data[0]; // Obtém o primeiro evento correspondente
  
      if (!evento) throw new Error("Evento não encontrado para atualização!");
  
      // Atualiza o evento no backend
      await api.put(`/eventos/${evento.id}`, { dia, descricao: eventoNovo });
  
      // Atualiza o evento localmente
      const eventos = eventosSemana.value[dia];
      const index = eventos.findIndex((e) => e === eventoAntigo);
      if (index !== -1) {
        eventos[index] = eventoNovo;
      }
  
      Notify.create({
        message: "Evento atualizado com sucesso!",
        type: "positive",
        position: "top-right",
      });
  
      return true; // Indica sucesso
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
  
      Notify.create({
        message: "Erro ao atualizar evento. Verifique a API.",
        type: "negative",
        position: "top-right",
      });
  
      return false; // Indica falha
    }
  };
  
  
  
  

  const deleteEvento = async (dia, eventoDescricao) => {
    try {
      // Busca o evento correspondente no backend
      const response = await api.get(`/eventos?dia=${dia}&descricao=${eventoDescricao}`);
      const evento = response.data[0]; // Pega o primeiro evento correspondente
  
      if (!evento) throw new Error("Evento não encontrado para exclusão!");
  
      // Exclui o evento no backend
      await api.delete(`/eventos/${evento.id}`);
  
      // Remove localmente
      eventosSemana.value[dia] = eventosSemana.value[dia].filter((e) => e !== eventoDescricao);
  
      // Exibe notificação de sucesso
      Notify.create({
        message: "Evento excluído com sucesso!",
        type: "positive",
        position: "top-right",
      });
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      Notify.create({
        message: "Erro ao excluir evento. Verifique a API.",
        type: "negative",
        position: "top-right",
      });
    }
  };
  
  
  

  return {
    eventosSemana,
    loadEventos,
    addEvento,
    updateEvento,
    deleteEvento,
  };
});
