<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStoreConfiguracoes } from 'src/stores/storeConfiguracoes';
import { useStoreEntradas } from 'src/stores/storeEntradas';
import { useStoreTodos } from './stores/storeTodos';

defineOptions({
  name: 'App'
});

const storeEntradas = useStoreEntradas(),
  storeConfiguracoes = useStoreConfiguracoes(),
  storeTodos = useStoreTodos()

onMounted(() => {
  storeEntradas.loadEntradas();
  storeConfiguracoes.loadConfiguracoes();
  storeTodos.loadTodos();
});

</script>
