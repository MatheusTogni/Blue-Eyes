<template>
    <q-page>
        <div class="q-pa-md">
            <NadaAqui v-if="!storeCompras.compras.length" />

            <q-list v-else class="compras">
                <div v-for="compra in storeCompras.compras" :key="compra.id" class="compra-item">
                    <CompraItem :compra="compra" />
                </div>
            </q-list>
        </div>

        <q-footer class="bg-transparent">
            <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                <TotalCompras v-if="storeCompras.compras.length" />
            </transition>
            <AddCompra />
        </q-footer>
    </q-page>
</template>

<script setup>
import { useStoreCompras } from "src/stores/storeCompras";
import TotalCompras from "src/components/TotalCompras.vue";
import AddCompra from "src/components/AddCompra.vue";
import CompraItem from "src/components/CompraItem.vue";
import NadaAqui from "src/components/NadaAqui.vue";

const storeCompras = useStoreCompras();
</script>