<template>
    <div class="login-page">
      <q-card class="login-card">
        <q-card-section>
          <img src="path/to/your/image.png" alt="Logo" class="login-logo" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="login" label="Usuário" dense outlined autofocus />
          <q-input v-model="senha" label="Senha" type="password" dense outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Entrar" color="primary" @click="handleLogin" />
          <q-btn label="Registrar" flat color="primary" @click="handleRegister" />
        </q-card-actions>
      </q-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useStoreAuth } from "src/stores/storeAuth";
  import { Notify } from "quasar";
  
  const router = useRouter();
  const storeAuth = useStoreAuth();
  
  const login = ref("");
  const senha = ref("");
  
  // Função de login
  const handleLogin = async () => {
    if (!login.value || !senha.value) {
      Notify.create({
        message: "Preencha todos os campos!",
        type: "negative",
        position: "top-right",
      });
      return;
    }
  
    try {
      await storeAuth.loginUser(login.value, senha.value);
      Notify.create({
        message: "Login realizado com sucesso!",
        type: "positive",
        position: "top-right",
      });
      router.push("/dashboard"); // Redireciona para o dashboard
    } catch (error) {
      Notify.create({
        message: error.message || "Erro ao realizar login.",
        type: "negative",
        position: "top-right",
      });
    }
  };
  
  // Função de registro
  const handleRegister = async () => {
    if (!login.value || !senha.value) {
      Notify.create({
        message: "Preencha todos os campos!",
        type: "negative",
        position: "top-right",
      });
      return;
    }
  
    try {
      await storeAuth.registerUser(login.value, senha.value);
      Notify.create({
        message: "Usuário registrado com sucesso! Faça login para continuar.",
        type: "positive",
        position: "top-right",
      });
    } catch (error) {
      Notify.create({
        message: error.message || "Erro ao registrar usuário.",
        type: "negative",
        position: "top-right",
      });
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-card {
    width: 350px;
    padding: 20px;
  }
  
  .login-logo {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  </style>
  