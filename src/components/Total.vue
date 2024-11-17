<template>
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3 items-center">
        <div class="col text-grey-7 text-h6">
            Total:
        </div>
        <div :class="usoQuantidadeClasseCor(storeEntradas.total)" class="col text-h6 text-right">
            <div class="row">
                <div class="col">
                    {{ usoCifrao(storeEntradas.total) }}
                </div>
            </div>
            <div v-if="storeEntradas.totalPago" class="row">
                <div class="col text-caption text-grey-6">
                    Pago:
                    <span class="text-weight-bold" :class="usoQuantidadeClasseCor(storeEntradas.totalPago)">
                        {{ usoCifrao(storeEntradas.totalPago) }}
                    </span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useStoreEntradas } from "src/stores/storeEntradas";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const storeEntradas = useStoreEntradas()
</script>