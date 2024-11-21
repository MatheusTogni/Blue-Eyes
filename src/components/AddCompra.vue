<template>
  <q-form @submit="addCompraFormSubmit" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
    <div class="col">
      <q-input v-model="compraForm.descricao" dense outlined bg-color="white" placeholder="Descrição da Compra" />
    </div>
    <div class="col">
      <q-input
        v-model.number="compraForm.valor"
        dense
        outlined
        bg-color="white"
        type="number"
        placeholder="Valor"
        :before="[{ label: 'R$' }]" 
        input-class="text-right"
        step="0.01"
      />
    </div>
    <div class="col col-auto">
      <q-btn color="primary" type="submit" icon="add" round />
    </div>
  </q-form>
</template>

<script setup>
import { reactive } from "vue";
import { useStoreCompras } from "src/stores/storeCompras";

const storeCompras = useStoreCompras();

const compraForm = reactive({
  descricao: "",
  valor: null,
});

const addCompraFormSubmit = () => {
  storeCompras.addCompra(compraForm);
  compraForm.descricao = ""; 
  compraForm.valor = null; 
};
</script>
