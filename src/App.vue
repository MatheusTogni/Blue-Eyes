<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useStoreEntradas } from "./stores/storeEntradas";
import { useStoreTodos } from "./stores/storeTodos";
import { useStoreCompras } from "./stores/storeCompras";
import { useStoreSemana } from "./stores/storeSemana";
import { useStoreAuth } from "./stores/storeAuth";
import { useRouter } from "vue-router";

const storeEntradas = useStoreEntradas();
const storeTodos = useStoreTodos();
const storeCompras = useStoreCompras();
const storeSemana = useStoreSemana();
const storeAuth = useStoreAuth();
const router = useRouter();

onMounted(() => {
  storeEntradas.loadEntradas();
  storeTodos.loadTodos();
  storeCompras.loadCompras();
  storeSemana.loadEventos();

  if (!storeAuth.currentUser) {
    router.push("/login");
  }
});
</script>

