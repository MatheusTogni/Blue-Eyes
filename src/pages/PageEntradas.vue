<template>
  <q-page>
    <div class="q-pa-md">
      <NadaAqui v-if="!storeEntradas.entradas.length" />
      <q-list v-else class="entradas">

        <Sortable @end="storeEntradas.sortEnd" :list="storeEntradas.entradas" :options="{ handle: '.handle' }"
          item-key="id" tag="div">
          <template #item="{ element, index }">
            <Entrada :key="element.id" :entrada="element" />
          </template>
        </Sortable>


      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <Total v-if="storeEntradas.entradas.length" />
      </transition>
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