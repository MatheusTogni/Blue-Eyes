<template>
  <q-page>
    <div class="q-pa-md">
      <NadaAqui v-if="!storeEntradas.entradas.length" />
      <q-list v-else bordered separator>

        <Sortable :list="storeEntradas.entradas" item-key="id" tag="div">
          <template #item="{element, index}">
            <Entrada :key="element.id" :entrada="element" />
          </template>
        </Sortable>


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
import { Sortable } from 'sortablejs-vue3'

const storeEntradas = useStoreEntradas()
</script>