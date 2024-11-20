<template>
    <q-form @submit="addTodoFormSubmit" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
      <div class="col">
        <q-input v-model="todoForm.descricao" dense outlined bg-color="white" placeholder="Adicionar Novo Afazer" />
      </div>
      <div class="col col-auto">
        <q-btn color="primary" type="submit" icon="add" round></q-btn>
      </div>
    </q-form>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import { useStoreTodos } from "src/stores/storeTodos";
  
  const storeTodos = useStoreTodos();
  
  const todoForm = reactive({
    descricao: "",
  });
  
  const addTodoFormSubmit = () => {
    storeTodos.addTodo(todoForm);
    todoForm.descricao = ""; // Limpa o formulário
  };
  </script>
  