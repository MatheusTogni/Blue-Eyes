<template>
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
</template>

<script setup>
import { useStoreEntradas } from "src/stores/storeEntradas";
import { ref, reactive } from "vue";

const nomeRef = ref(null)

const storeEntradas = useStoreEntradas()

const addEntradaFormSubmit = () => {
    storeEntradas.addEntrada(adicionarEntradaForm)
    adicionarFormReset()
}

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

</script>
