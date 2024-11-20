<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStoreConfiguracoes } from 'src/stores/storeConfiguracoes';
import { useStoreEntradas } from 'src/stores/storeEntradas';

defineOptions({
  name: 'App'
});

const storeEntradas = useStoreEntradas(),
  storeConfiguracoes = useStoreConfiguracoes()

onMounted(() => {
  storeEntradas.loadEntradas();
  storeConfiguracoes.loadConfiguracoes();
});

</script>
