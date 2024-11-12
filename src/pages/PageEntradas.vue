<template>
  <q-page>
    <div class="q-pa-md">
      <NadaAqui v-if="!storeEntradas.entradas.length"/>
      <q-list v-else bordered separator>
        <Entrada v-for="entrada in storeEntradas.entradas" :key="entrada.id" :entrada="entrada"/>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <Total />
      <AddEntrada />
    </q-footer>
  </q-page>
</template>

<script setup>
import { useStoreEntradas } from "src/stores/storeEntradas";
import Total from "src/components/Total.vue"
import AddEntrada from "src/components/AddEntrada.vue";
import Entrada from "src/components/Entrada.vue";
import NadaAqui from "src/components/NadaAqui.vue";

const storeEntradas = useStoreEntradas()
</script>