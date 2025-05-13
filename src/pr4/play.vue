<script setup>
import { ref, reactive, onMounted } from "vue";

const props = defineProps(["goals", "speed", "size", "allowMove"]);
const timeLeft = ref(30);
const targets = reactive([]);
const gameOver = ref(false);
const resultMessage = ref("");
const intervalId = ref(null);
const settingsModal = ref(false);
const gameStarted = ref(false);
const local = reactive({ results: [] });

const speedMap = { "низкая": 1, "средняя": 2, "высокая": 3 };
const sizeMap = { "небольшой": "20px", "средний": "30px", "большой": "40px" };

function startGame() {
    emit("startGame")
    targets.length = 0;
    for (let i = 0; i < props.goals; i++) {
        targets.push({
            id: i,
            x: Math.random() * 80,
            y: Math.random() * 80,
        });
    }
    timeLeft.value = 30;
    gameOver.value = false;
    resultMessage.value = "";
    gameStarted.value = true;
    intervalId.value = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
            endGame("Время вышло! Вы проиграли.");
        }
    }, 1000);
    moveTargets();
}

function moveTargets() {
    setInterval(() => {
        targets.forEach(target => {
            target.x = Math.max(0, Math.min(80, target.x + (Math.random() - 0.5) * 10 * speedMap[props.speed]));
            target.y = Math.max(0, Math.min(80, target.y + (Math.random() - 0.5) * 10 * speedMap[props.speed]));
        });
    }, 1000);
}

function hitTarget(index) {
    targets.splice(index, 1);
    timeLeft.value += 3;
    if (targets.length === 0) {
        endGame(`Вы победили! Оставшееся время: ${timeLeft.value} сек.`);
    }
}

function endGame(message) {
    clearInterval(intervalId.value);
    gameOver.value = true;
    resultMessage.value = message;
    gameStarted.value = false;
    
    local.results.push({
        goals: props.goals,
        speed: props.speed,
        size: props.size,
        timeLeft: timeLeft.value,
        result: message
    });

    emit('updateResults', {
        goals: props.goals,
        speed: props.speed,
        size: props.size,
        timeLeft: timeLeft.value,
        result: message,
        allowMove: true
    })
}
const emit = defineEmits([
    'updateResults',
    'startGame'
])

</script>

<template>
    <div class="game-container">
        <h1>Игра</h1>
        <button v-if="!gameStarted" @click="startGame">Начать играть</button>
        <h3 v-if="gameStarted">Время: {{ timeLeft }} сек</h3>
        <div class="game-field" v-if="gameStarted">
            <div v-for="(target, index) in targets" :key="target.id"
                 class="target" 
                 :style="{ left: target.x + '%', top: target.y + '%', width: sizeMap[props.size], height: sizeMap[props.size] }"
                 @click="hitTarget(index)"></div>
        </div>
        <div v-if="gameOver" class="modal">
            <p>{{ resultMessage }}</p>
            <button @click="startGame">Играть снова</button>
        </div>
    </div>
    
    <div class="settings-container">
        <button @click="settingsModal = true">Проверить настройки</button>
        <div v-if="settingsModal" class="modal">
            <h3>Выбранные настройки</h3>
            <p>Целей: {{ props.goals }}</p>
            <p>Скорость: {{ props.speed }}</p>
            <p>Размер: {{ props.size }}</p>
            <button @click="settingsModal = false">Закрыть</button>
        </div>
    </div>

    <div class="results-container">
        
        <ul>
            <li v-for="(result, index) in local.results" :key="index">
                <h2>Результаты игр</h2>
                <strong>Целей:</strong> {{ result.goals }}, 
                <strong>Скорость:</strong> {{ result.speed }}, 
                <strong>Размер:</strong> {{ result.size }}, 
                <strong>Оставшееся время:</strong> {{ result.timeLeft }} сек, 
                <strong>Результат:</strong> {{ result.result }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.game-container {
    text-align: center;
}
.game-field {
    position: relative;
    width: 80vw;
    height: 60vh;
    margin: 20px auto;
    background-color: #f0f0f0;
    border: 2px solid #333;
    overflow: hidden;
}
.target {
    position: absolute;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.5s;
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 2px solid black;
    text-align: center;
}
.settings-container {
    text-align: center;
    margin-top: 20px;
}
.results-container {
    text-align: center;
    margin-top: 20px;
}
.results-container ul {
    list-style-type: none;
    padding: 0;
}
.results-container li {
    background: #f8f8f8;
    padding: 10px;
    margin: 5px auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    max-width: 600px;
}
</style>