<template>
    <q-slide-item @right="onRight" left-color="positive" right-color="negative">


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
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const storeEntradas = useStoreEntradas()
const $q = useQuasar()

const props = defineProps({
    entrada: {
        type: Object,
        required: true
    }
})

const onRight = ({ reset }) => {
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
</script>