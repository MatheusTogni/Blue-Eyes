<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>

        <q-item v-for="entrada in entradas" :key="entrada.id">
          <q-item-section class="text-weight-bold" :class="usoQuantidadeClasseCor(entrada.quantidade)">
            {{ entrada.nome }}
          </q-item-section>

          <q-item-section class="text-weight-bold" side :class="usoQuantidadeClasseCor(entrada.quantidade)">
            {{ usoCifrao(entrada.quantidade) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer>
      <div class="row q-pa-sm q-col-gutter-sm">
        <div class="col">
          <q-input dense outlined bg-color="white" placeholder="Nome" />
        </div>
        <div class="col">
          <q-input input-class="text-right" placeholder="Quantidade" bg-color="white" type="number" step="0.01" outlined
            dense />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" icon="add" round></q-btn>
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const entradas = ref([
  {
    id: "id1",
    nome: "Salário",
    quantidade: 3000,
  },
  {
    id: "id2",
    nome: "Aluguel",
    quantidade: -499,
  },
  {
    id: "id3",
    nome: "Celular",
    quantidade: -250,
  },
  {
    id: "id4",
    nome: "    Nesconhecido",
    quantidade: 0,
  },
]);
</script>
