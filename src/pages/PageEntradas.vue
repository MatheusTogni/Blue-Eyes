<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item v-for="entrada in storeEntradas.entradas" :key="entrada.id" @right="onRight($event, entrada)"
          right-color="negative">
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section class="text-weight-bold" :class="usoQuantidadeClasseCor(entrada.quantidade)">
              {{ entrada.nome }}
            </q-item-section>

            <q-item-section class="text-weight-bold" side :class="usoQuantidadeClasseCor(entrada.quantidade)">
              {{ usoCifrao(entrada.quantidade) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Total:
        </div>
        <div :class="usoQuantidadeClasseCor(storeEntradas.total)" class="col text-h6 text-right">
          {{ usoCifrao(storeEntradas.total) }}
        </div>
      </div>
      <q-form @submit="addEntradaFormSubmit" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input v-model="adicionarEntradaForm.nome" ref="nomeRef" dense outlined bg-color="white"
            placeholder="Nome" />
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
import { ref, reactive } from "vue";
import { useQuasar } from "quasar";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const storeEntradas = useStoreEntradas()
const $q = useQuasar()
const nomeRef = ref(null)

const adicionarFormDefault = {
  nome: '',
  quantidade: null
}

const adicionarEntradaForm = reactive({
  ...adicionarFormDefault
})

const adicionarFormReset = () => {
  adicionarEntradaForm.nome = ''
  adicionarEntradaForm.quantidade = null
  nomeRef.value.focus()
}

const addEntradaFormSubmit = () => {
  storeEntradas.addEntrada(adicionarEntradaForm)
  adicionarFormReset()
}

const onRight = ({ reset }, entrada) => {
  $q.dialog({
    title: 'Deletar Entrada',
    message: `Você gostaria de deletar essa entrada?
    <div class="q-mt-md text-weight-bold ${usoQuantidadeClasseCor(entrada.quantidade)}">
      ${entrada.nome} : ${usoCifrao(entrada.quantidade)}
      </div>
      `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Deletar',
      color: 'negative',
    },
    cancel: {
      label: 'Cancelar',
      color: 'primary',
    }
  }).onOk(() => {
    storeEntradas.deletarEntrada(entrada.id)
  }).onCancel(() => {
    reset()
  })
}
</script>