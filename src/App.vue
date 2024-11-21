<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useStoreConfiguracoes } from "src/stores/storeConfiguracoes";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { useStoreTodos } from "./stores/storeTodos";
import { useStoreCompras } from "./stores/storeCompras"; // Importa o store de compras
import { useStoreSemana } from "./stores/storeSemana"; // Importa o store de semana

defineOptions({
  name: "App",
});

const storeEntradas = useStoreEntradas(),
  storeConfiguracoes = useStoreConfiguracoes(),
  storeTodos = useStoreTodos(),
  storeCompras = useStoreCompras(), // Adiciona o store de compras
  storeSemana = useStoreSemana(); // Adiciona o store de semana

onMounted(() => {
  storeEntradas.loadEntradas();
  storeConfiguracoes.loadConfiguracoes();
  storeTodos.loadTodos();
  storeCompras.loadCompras(); // Carrega as compras
  storeSemana.loadEventos(); // Carrega os eventos da semana
});
</script>
