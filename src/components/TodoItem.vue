<template>
    <q-item>
      <q-item-section>
        <q-checkbox
          v-model="todo.concluido"
          @update:model-value="toggleConcluido"
          color="green"
          keep-color
        />
      </q-item-section>
      <q-item-section>{{ todo.descricao }}</q-item-section>
      <q-item-section side>
        <q-icon name="reorder" class="handle" color="primary" />
      </q-item-section>
    </q-item>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  import { useStoreTodos } from "src/stores/storeTodos";
  
  const storeTodos = useStoreTodos();
  
  const props = defineProps({
    todo: {
      type: Object,
      required: true,
    },
  });
  
  const toggleConcluido = () => {
    storeTodos.updateTodo(props.todo.id, { concluido: props.todo.concluido });
  };
  </script>
  