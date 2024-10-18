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
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Total:
        </div>
        <div :class="usoQuantidadeClasseCor(total)" class="col text-h6 text-right">
          {{ usoCifrao(total) }}
        </div>
      </div>
      <q-form @submit="addEntrada" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input v-model="adicionarEntradaForm.nome" dense outlined bg-color="white" placeholder="Nome" />
        </div>
        <div class="col">
          <q-input v-model.number="adicionarEntradaForm.quantidade" input-class="text-right" placeholder="Quantidade"
            bg-color="white" type="number" step="0.01" outlined dense />
        </div>
        <div class="col col-auto">
          <q-btn color="primary" type="submit" icon="add" round></q-btn>
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { uid } from "quasar";
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
    nome: "Desconhecido",
    quantidade: 0,
  },
])

const total = computed(() => {
  let total = 0
  entradas.value.forEach(entrada => {
    total = total + entrada.quantidade
  })
  return total
})

const adicionarFormDefault = {
  nome: '',
  quantidade: null
}

const adicionarEntradaForm = reactive({
  ...adicionarFormDefault
})

const adicionarFormReset = () => {
  Object.assign(adicionarEntradaForm, )
}

const addEntrada = () => {
 const novaEntrada = Object.assign({}, adicionarEntradaForm, { id: uid() })
  entradas.value.push(novaEntrada)
  adicionarFormReset()
}

</script>
