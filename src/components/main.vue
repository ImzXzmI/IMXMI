<script setup>
import { reactive } from "vue";
import reg from "./log.vue";
import test from "./test.vue";
import dis from "./display.vue";

const local = reactive({
  curPage: 1,
  user: [],
  curUserIndx: "",
  showModal1: false,
  showModal: false,
});

function regE(data) {
  local.user.push(data);
  local.curUserIndx = local.user.length - 1;
}

function disE(data) {
  local.user.splice(data, 1);
  if (local.curUserIndx > data) {
    local.curUserIndx -= 1;
  } else if (local.curUserIndx == data) {
    local.curUserIndx = "";
  }
}

function handleUserChange() {
  if (local.curUserIndx === "") {
    local.showModal1 = true; // Показываем модальное окно, если выбрана "Нет пользователя"
  }
}



function goToTest() {
  // Проверяем, выбран ли пользователь
  if (local.curUserIndx === "") {
    local.showModal1 = true; // Показываем модальное окно
  } else {

    local.curPage = 3; // Переходим к тесту
  }
}


function closeModal1() {
  local.showModal1 = false;
}
</script>

<template>
  <div class="header">
    <div class="menu">
      <button @click="local.curPage = 1" :class="{menuIt: local.curPage == 1}">Рег</button>
      <button @click="local.curPage = 2" :class="{menuIt: local.curPage == 2}">Польз</button>
      <button @click="goToTest">Тест</button>
    </div>
    <select v-model="local.curUserIndx" @change="handleUserChange">
    <option value="">Нет пользователя</option>
    <option :value="index" v-for="(elem, index) in local.user" :key="index">{{ elem.name }}</option>
  </select>
  </div>

  <div>
    <reg 
      v-if="local.curPage == 1"
      @RegistorEmit="regE"/>

    <dis
      v-if="local.curPage == 2"
      :user="local.user"
      :curUser="local.curUserIndx"
      @deleteEmit="disE"/>

    <test 
      v-if="local.curPage == 3"
      :user="local.user"
      :curUser="local.curUserIndx"
      @TestEmit="(data)=>local.user[local.curUserIndx].results.push(data)"
      @redirectToRegistration="local.curPage = 1" />
  </div>

  <!-- Модальное окно -->
  <div v-if="local.showModal1" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal1">&times;</span>
      <p>Пожалуйста, выберите пользователя, чтобы пройти тест.</p>
    </div>
  </div>
  <!-- Модальное окно -->
</template>

<style scoped>
.header {
  display: flex;
  min-width: 1300px;
}

.menu {
  min-width: 1000px;
  display: flex;
  justify-content: space-around;
}

.menuIt {
  border-color: aqua;
  border-width: 5px;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}
.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
