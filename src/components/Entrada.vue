<template>
    <q-slide-item @left="onLeft" @right="onRight" left-color="positive" right-color="negative"
        :class="{ 'bg-grey-2 ': entrada.pago }">

        <template v-slot:left>
            <q-icon name='done' />
        </template>
        <template v-slot:right>
            <q-icon name="delete" />
        </template>

        <q-item>
            <q-item-section class="text-weight-bold"
                :class="[usoQuantidadeClasseCor(entrada.quantidade), { 'text-strike': entrada.pago }]">
                {{ entrada.nome }}
                <q-popup-edit @save="onNomeUpdate" :model-value="entrada.nome" v-slot="scope" :cover="false"
                    :offset="[16, 12]" anchor="top left" auto-save buttons label-set="Ok" label-cancel="Cancelar">
                    <q-input v-model="scope.value" @keyup.center="scope.set"
                        input-class="text-weight-bold letter-spacing-none " autofocus dense />
                </q-popup-edit>
            </q-item-section>

            <q-item-section class="text-weight-bold" side
                :class="[usoQuantidadeClasseCor(entrada.quantidade), { 'text-strike': entrada.pago }]">
                {{ usoCifrao(entrada.quantidade) }}
                <q-popup-edit @save="onQuantidadeUpdate" :model-value="entrada.quantidade" v-slot="scope" :cover="false"
                    :offset="[16, 12]" anchor="top left" auto-save buttons label-set="Ok" label-cancel="Cancelar">
                    <q-input v-model.number="scope.value" @keyup.center="scope.set"
                        input-class="text-weight-bold letter-spacing-none text-right" type="number" step="0.01"
                        autofocus dense />
                </q-popup-edit>
            </q-item-section>

            <q-item-section v-if="storeEntradas.opcoes.sort" side>
                <q-icon class="handle" name="reorder" color="primary" />
            </q-item-section>
        </q-item>

    </q-slide-item>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { useStoreConfiguracoes } from "src/stores/storeConfiguracoes";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const storeEntradas = useStoreEntradas(),
    storeConfiguracoes = useStoreConfiguracoes()
const $q = useQuasar()

const props = defineProps({
    entrada: {
        type: Object,
        required: true
    }
})

const onLeft = ({ reset }) => {
    storeEntradas.updateEntrada(props.entrada.id, { pago: !props.entrada.pago })
    reset()
}

const onRight = ({ reset }) => {
    if (storeConfiguracoes.configuracoes.promptParaDeletar) promptParaDeletar
        (reset)
    else storeEntradas.deletarEntrada(props.entrada.id)
}

const promptParaDeletar = reset => {
    $q.dialog({
        title: 'Deletar Entrada',
        message: `Você gostaria de deletar essa entrada?
    <div class="q-mt-md text-weight-bold ${usoQuantidadeClasseCor(props.entrada.quantidade)}">
      ${props.entrada.nome} : ${usoCifrao(props.entrada.quantidade)}
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
        storeEntradas.deletarEntrada(props.entrada.id)
    }).onCancel(() => {
        reset()
    })
}

const onNomeUpdate = value => {
    storeEntradas.updateEntrada(props.entrada.id, { nome: value })
}

const onQuantidadeUpdate = value => {
    storeEntradas.updateEntrada(props.entrada.id, { quantidade: value })
}


</script>