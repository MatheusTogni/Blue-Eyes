import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar"; 
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
      await api.post("/eventos", novoEvento);

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
      const response = await api.get(`/eventos?dia=${dia}&descricao=${eventoAntigo}`);
      const evento = response.data[0]; 
  
      if (!evento) throw new Error("Evento não encontrado para atualização!");
  
      await api.put(`/eventos/${evento.id}`, { dia, descricao: eventoNovo });
  
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
  
      return true; 
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
  
      Notify.create({
        message: "Erro ao atualizar evento. Verifique a API.",
        type: "negative",
        position: "top-right",
      });
  
      return false; 
    }
  };

  const deleteEvento = async (dia, eventoDescricao) => {
    try {
      const response = await api.get(`/eventos?dia=${dia}&descricao=${eventoDescricao}`);
      const evento = response.data[0]; 
  
      if (!evento) throw new Error("Evento não encontrado para exclusão!");
  
      await api.delete(`/eventos/${evento.id}`);
  
      eventosSemana.value[dia] = eventosSemana.value[dia].filter((e) => e !== eventoDescricao);
  
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
