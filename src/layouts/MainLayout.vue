<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center" @click="goToDashboard" style="cursor: pointer">
            <q-icon name="fa-solid fa-dragon" />
            Blue Eyes
          </div>
        </q-toolbar-title>

        <q-btn v-if="$route.fullPath === '/entries'" @click="storeEntradas.opcoes.sort = !storeEntradas.opcoes.sort"
          :label="!storeEntradas.opcoes.sort ? 'Organizar' : 'Feito'" flat dense />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-primary" show-if-above bordered :width="200" :breakpoint="767">
      <q-list>
        <q-item-label class="text-white" header>
          Opções de Navegação
        </q-item-label>

        <NavBar v-for="link in navBar" :key="link.title" v-bind="link" />

        <!-- Opção de Sair no Menu -->
        <q-item clickable v-ripple @click="logoutUser">
          <q-item-section avatar>
            <q-icon name="logout" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: white;">Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';
import { useStoreAuth } from "src/stores/storeAuth";
import { useStoreEntradas } from 'src/stores/storeEntradas';
import NavBar from 'src/components/NavBar.vue';

defineOptions({
  name: 'MainLayout'
});

const router = useRouter();
const storeAuth = useStoreAuth();
const storeEntradas = useStoreEntradas();

const navBar = [
  {
    title: 'Gastos',
    icon: 'paid ',
    link: '/entries'
  },
  {
    title: 'Afazeres',
    icon: 'done_all',
    link: '/todos'
  },
  {
    title: 'Compras',
    icon: 'shopping_cart',
    link: '/shopping'
  },
  {
    title: 'Semana',
    icon: 'calendar_month',
    link: '/week'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    link: '/settings'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToDashboard() {
  router.push("/dashboard");
}

function logoutUser() {
  storeAuth.currentUser = null; // Limpa o usuário atual no storeAuth
  router.push("/login"); // Redireciona para a tela de login
}
</script>

<style scoped>
.q-toolbar-title {
  cursor: pointer;
}

.logout-btn {
  color: #e53935; /* Vermelho para destacar o botão de logout */
}
</style>
