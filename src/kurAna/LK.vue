<script setup>
import { reactive, defineProps, defineEmits } from "vue";

const props = defineProps(["user"]);
const emit = defineEmits(["RegistorEmit", "logoutEmit"]);

const local = reactive({
  username: "",
  password: "",
  errorUsername: false,
  errorPassword: false,
});

function check() {
  let passCheck = true;

  // Проверка: имя пользователя — латинские буквы, минимум 3 символа
  if (!/^[a-zA-Z0-9_]{3,}$/.test(local.username)) {
    local.errorUsername = true;
    passCheck = false;
  } else {
    local.errorUsername = false;
  }

  // Проверка: пароль — минимум 6 символов
  if (local.password.length < 6) {
    local.errorPassword = true;
    passCheck = false;
  } else {
    local.errorPassword = false;
  }

  if (passCheck) {
    emit("RegistorEmit", {
      username: local.username,
      password: local.password,
    });
  }
}
</script>

<template>
  <div class="container">
    <div v-if="!props.user" class="form-box">
      <h1>Регистрация</h1>

      <label>
        Имя пользователя:
        <input type="text" v-model="local.username" placeholder="Например: user123" />
      </label>
      <div class="error" v-if="local.errorUsername">Имя должно быть минимум 3 символа и содержать только латиницу/цифры</div>

      <label>
        Пароль:
        <input type="password" v-model="local.password" placeholder="Не менее 6 символов" />
      </label>
      <div class="error" v-if="local.errorPassword">Пароль должен быть не менее 6 символов</div>

      <button class="btn" @click="check">Зарегистрироваться</button>
    </div>

    <div v-else class="profile-box">
      <h1>Личный кабинет</h1>
      <p><strong>Имя пользователя:</strong> {{ props.user.username }}</p>
      <p><strong>Пароль:</strong> ********</p>
      <button class="btn logout" @click="$emit('logoutEmit')">Выйти</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.form-box label {
  display: block;
  margin-bottom: 12px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.error {
  color: #d60000;
  font-size: 0.9em;
  margin-bottom: 12px;
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #3478f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 16px;
  transition: background 0.2s ease;
}

.btn:hover {
  background-color: #245dc1;
}

.logout {
  background-color: #e74c3c;
}

.logout:hover {
  background-color: #c0392b;
}

.profile-box {
  text-align: center;
}
</style>
