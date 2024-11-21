<template>
  <div class="login-page">
    <q-card class="login-card">
      <q-card-section>
        <img src="/src/assets/dragon.jpg" alt="Logo" class="login-logo" />
      </q-card-section>
      <q-card-section>
        <q-input class="login" v-model="login" label="Usuário" dense outlined autofocus />
        <q-input class="senha" v-model="senha" label="Senha" type="password" dense outlined />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Entrar" color="primary" @click="handleLogin" />
        <q-btn label="Registrar" flat color="primary" @click="showRegisterDialog = true" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="showRegisterDialog">
      <q-card style="max-width: 400px">
        <q-card-section>
          <div class="text-h6">Registrar Novo Usuário</div>
        </q-card-section>
        <q-card-section>
          <q-input class="register-login" v-model="registerLogin" label="Usuário" dense outlined autofocus />
          <q-input class="register-senha" v-model="registerSenha" label="Senha" type="password" dense outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" @click="showRegisterDialog = false" />
          <q-btn flat label="Registrar" color="primary" @click="handleRegister" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

const showRegisterDialog = ref(false);
const registerLogin = ref("");
const registerSenha = ref("");

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
    router.push("/dashboard"); 
  } catch (error) {
    Notify.create({
      message: error.message || "Erro ao realizar login.",
      type: "negative",
      position: "top-right",
    });
  }
};

const handleRegister = async () => {
  if (!registerLogin.value || !registerSenha.value) {
    Notify.create({
      message: "Preencha todos os campos para registrar!",
      type: "negative",
      position: "top-right",
    });
    return;
  }

  try {
    await storeAuth.registerUser(registerLogin.value, registerSenha.value);
    Notify.create({
      message: "Usuário registrado com sucesso! Faça login para continuar.",
      type: "positive",
      position: "top-right",
    });
    showRegisterDialog.value = false; 
    registerLogin.value = "";
    registerSenha.value = "";
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
  background-color: #56aad1;
}

.login-card {
  width: 350px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 40px;
}

.login-logo {
  width: 100%;
  height: auto;
  margin-bottom: 1px;
  border: 1px solid #193155;
  border-radius: 50px;
}

.login {
  margin-bottom: 15px;

}

.register-login {
  margin-bottom: 10px;
}
</style>
