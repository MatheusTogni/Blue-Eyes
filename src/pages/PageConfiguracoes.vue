<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>
        <q-item-label header>Entradas</q-item-label>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Prompt para Deletar</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle 
            v-model="storeConfiguracoes.configuracoes.promptParaDeletar"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useStoreConfiguracoes } from 'src/stores/storeConfiguracoes';


const storeConfiguracoes = useStoreConfiguracoes()
</script>
