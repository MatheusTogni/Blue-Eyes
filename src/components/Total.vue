<template>
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
            Total:
        </div>
        <div :class="usoQuantidadeClasseCor(storeEntradas.total)" class="col text-h6 text-right">
            {{ usoCifrao(storeEntradas.total) }}
        </div>
    </div>
</template>

<script setup>
import { useStoreEntradas } from "src/stores/storeEntradas";
import { usoCifrao } from "src/uso/usoCifrao"
import { usoQuantidadeClasseCor } from "src/uso/usoQuantidadeClasseCor";

const storeEntradas = useStoreEntradas()
</script>