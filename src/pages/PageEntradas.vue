<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <Entrada v-for="entrada in storeEntradas.entradas" :key="entrada.id" />
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <Total />
      <AddEntrada />
    </q-footer>
  </q-page>
</template>

<script setup>
import Total from "src/components/Total.vue"
import AddEntrada from "src/components/AddEntrada.vue";
import Entrada from "src/components/Entrada.vue";
</script>