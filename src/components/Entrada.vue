<template>
    <q-slide-item @right="onRight($event, entrada)"
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

</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntradas } from "src/stores/storeEntradas";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const storeEntradas = useStoreEntradas()
const $q = useQuasar()

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