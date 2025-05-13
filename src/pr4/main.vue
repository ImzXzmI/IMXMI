<script setup>
import { reactive, ref } from "vue";
import nastoyki from "./nastoyki.vue";
import play from "./play.vue";
import state from "./state.vue";

const local = reactive({
  curPage: 1,
  user: [],
  curUserIndx: "",
  goals: null,
  speed: "",
  size: "",
  results: [],
  allowMove: true,
});

const showModal = ref(false); // Управление отображением модального окна

function changePage(page) {
  if (local.allowMove) {
    local.curPage=page
  }
}
function regE(data) {
  local.goals = data.goals;
  local.speed = data.speed;
  local.size = data.size;
  console.log("Настройки обновлены:", local);
}

function updateResults(newResult) {
  local.results.push(newResult);
  local.allowMove=true
}

// Проверка перед переходом в игру
function goToGame() {
  if (local.allowMove) {
    if (!local.goals || !local.speed || !local.size) {
    showModal.value = true; // Показываем предупреждение
  } else {
    local.curPage = 2;
  }
  }
  
}

// Закрытие модального окна
function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div class="header">
    <div class="menu">
      <button @click="changePage(1)" :class="{menuIt: local.curPage == 1}">Настройки</button>
      <button @click="goToGame" :class="{menuIt: local.curPage == 2}">Игра</button>
      <button @click="changePage(3)" :class="{menuIt: local.curPage == 3}">Статистика</button>
    </div>
  </div>

  <div>
    <nastoyki v-if="local.curPage == 1" @SettingsEmit="regE" />
    <play
      v-if="local.curPage == 2"
      :user="local.user"
      :curUser="local.curUserIndx"
      :speed="local.speed"
      :goals="local.goals"
      :size="local.size"
      :results="local.results"
      @updateResults="updateResults"
      @startGame="local.allowMove=false"
    />
    <state v-if="local.curPage == 3" :results="local.results" />
  </div>

  <!-- Модальное окно с предупреждением -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>Перед началом игры установите настройки!</p>
      <button @click="closeModal">OK</button>
    </div>
  </div>
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

/* Модальное окно */
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
