<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered>
        <q-item-label header>Configurações</q-item-label>

        <!-- Configuração de Entradas -->
        <q-item>
          <q-item-section>
            <q-item-label>Prompt para Deletar Entradas</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle 
              v-model="storeConfiguracoes.configuracoes.entradas.promptParaDeletar" 
              color="primary" 
            />
          </q-item-section>
        </q-item>

        <!-- Configuração de Tarefas -->
        <q-item>
          <q-item-section>
            <q-item-label>Prompt para Deletar Tarefas</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle 
              v-model="storeConfiguracoes.configuracoes.todos.promptParaDeletar" 
              color="secondary" 
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useStoreConfiguracoes } from "src/stores/storeConfiguracoes";

const storeConfiguracoes = useStoreConfiguracoes();
</script>
