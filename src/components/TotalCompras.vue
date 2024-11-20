<template>
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3 items-center">
        <div class="col text-grey-7 text-h6">
            Total: R$ {{ storeCompras.total }}
        </div>
        <div class="col col-auto">
            <q-btn color="primary" label="Finalizar" @click="storeCompras.finalizarCompras" />
        </div>
    </div>
</template>

<script setup>
import { useStoreCompras } from "src/stores/storeCompras";

const storeCompras = useStoreCompras();
</script>



<style scoped>
.compra-total {
    border-top: 2px solid #e0e0e0;
    margin-top: 16px;
    padding-top: 8px;
}

.total-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
}

.text-primary {
    font-weight: bold;
}

.total-value {
    margin-left: 8px;
}
</style>