<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
        <div class="absolute-center">
        <q-icon name="fa-solid fa-dragon"/>
          Blue Eyes
        </div>
        </q-toolbar-title>
      
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      show-if-above
      bordered
      :width="200"
      :breakpoint="767"
    >
      <q-list>
        <q-item-label
        class="text-white"
          header
        >
          Opções de Navegação
        </q-item-label>

        <NavBar
          v-for="link in navBar"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from 'src/components/NavBar.vue'

defineOptions({
  name: 'MainLayout'
})

const navBar = [
  {
    title: 'Gastos',
    icon: 'paid ',
    link: '/entries'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    link: '/settings'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
