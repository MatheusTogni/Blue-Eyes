import { defineStore } from "pinia";
import { ref } from "vue";
import { uid, Notify, Dialog } from "quasar";
import api from "src/service/apiService.js";
import { useStoreConfiguracoes } from "./storeConfiguracoes"; 

export const useStoreTodos = defineStore("todos", () => {
  const todos = ref([]);
  const storeConfiguracoes = useStoreConfiguracoes(); 

  const loadTodos = async () => {
    try {
      const response = await api.get("/todos");
      todos.value = response.data;
    } catch (error) {
      console.error("Erro ao carregar afazeres:", error);
    }
  };

  const addTodo = async (todoForm) => {
    if (!todoForm.descricao || todoForm.descricao.trim() === "") {
      Notify.create({
        message: "A descrição da tarefa não pode estar vazia.",
        type: "negative",
        position: "top-right",
      });
      return;
    }

    const novoTodo = {
      id: uid(),
      descricao: todoForm.descricao.trim(), 
      concluido: false,
    };

    try {
      await api.post("/todos", novoTodo);
      todos.value.push(novoTodo);
    } catch (error) {
      console.error("Erro ao adicionar afazer:", error);
    }
  };

  const updateTodo = async (todoId, updates) => {
    try {
      const currentTodo = todos.value.find((todo) => todo.id === todoId);
      if (!currentTodo) {
        console.error("Afazer não encontrado para atualização.");
        return;
      }

      const updatedTodo = { ...currentTodo, ...updates };

      await api.put(`/todos/${todoId}`, updatedTodo);

      Object.assign(currentTodo, updatedTodo);
    } catch (error) {
      console.error("Erro ao atualizar afazer:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await api.delete(`/todos/${todoId}`);
      const index = todos.value.findIndex((todo) => todo.id === todoId);
      if (index !== -1) todos.value.splice(index, 1);

      Notify.create({
        message: "Afazer excluído",
        type: "positive",
        position: "top-right",
      });
    } catch (error) {
      console.error("Erro ao deletar afazer:", error);
    }
  };

  const confirmDeleteTodo = async (todoId, reset) => {
    const promptParaDeletar =
      storeConfiguracoes.configuracoes.todos?.promptParaDeletar;

    if (promptParaDeletar) {
      Dialog.create({
        title: "Deletar Tarefa",
        message: "Você tem certeza que deseja excluir esta tarefa?",
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
          await deleteTodo(todoId); 
        })
        .onCancel(() => {
          if (reset) reset(); 
        });
    } else {
      await deleteTodo(todoId); 
      if (reset) reset();
    }
  };

  return {
    todos,
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    confirmDeleteTodo,
  };
});
