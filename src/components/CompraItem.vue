<template>
  <div class="compra-item">
    <q-slide-item
      @right="({ reset }) => storeCompras.confirmDeleteCompra(compra.id, reset)"
      right-color="negative"
      class="rounded-borders"
    >
      <template v-slot:right>
        <q-icon name="delete" />
      </template>

      <q-item class="compra-item-content">
        <q-item-section>
          <div class="descricao">{{ compra.descricao }}</div>
        </q-item-section>
        <q-item-section side>
          <div class="valor">R$ {{ compra.valor | usoCifrao }}</div>
        </q-item-section>
      </q-item>
    </q-slide-item>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useStoreCompras } from "src/stores/storeCompras";
import { usoCifrao } from "src/uso/usoCifrao";

const storeCompras = useStoreCompras();

const props = defineProps({
  compra: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.compra-item {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
}

.compra-item:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.compra-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.descricao {
  font-size: 1.2em;
  font-weight: bold;
  color: #337FA3; /* Azul primário */
}

.valor {
  font-size: 1.2em;
  font-weight: bold;
  color: #43a047; /* Verde primário */
}
</style>
