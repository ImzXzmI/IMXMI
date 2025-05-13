<script setup>
import { reactive } from "vue";

const emit = defineEmits(["SettingsEmit"]);

const local = reactive({
    goals: null,
    speed: "",
    size: "",
    ErrorGoals: false,
    ErrorSpeed: false,
    ErrorSize: false,
});

function check() {
    let passCheck = true;

    if (!local.goals) {
        local.ErrorGoals = true;
        passCheck = false;
        console.log("dfdsfsffsdf")
    } else {
        local.ErrorGoals = false;
    }

    if (!local.speed) {
        local.ErrorSpeed = true;
        passCheck = false;
        console.log("dfdsfsffsdqwqwqwqwqwf")
    } else {
        local.ErrorSpeed = false;
    }

    if (!local.size) {
        local.ErrorSize = true;
        passCheck = false;
        console.log("dfdsfsffsasdadasdadadadadf")
    } else {
        local.ErrorSize = false;
    }

    if (passCheck) {
        emit("SettingsEmit", {
            goals: local.goals,
            speed: local.speed,
            size: local.size,
        });

        local.goals = "";
        local.speed = "";
        local.size = "";
    }
}
</script>

<template>
    <h1>Настройки</h1>
    <div class="block">
        <div class="block1">
            <h3>Количество целей</h3>
            <div><input type="radio" value="5" id="goals-1" v-model="local.goals">5<label></label></div>
            <div><input type="radio" value="10" id="goals-2" v-model="local.goals">10<label></label></div>
            <div><input type="radio" value="20" id="goals-3" v-model="local.goals">20<label></label></div>
        </div>
        <div class="error" v-if="local.ErrorGoals">Выберите количество целей!</div>

        <div class="block2">
            <h3>Скорость</h3>
            <div><input type="radio" value="низкая" id="speed-1" v-model="local.speed">низкая<label></label></div>
            <div><input type="radio" value="средняя" id="speed-2" v-model="local.speed">средняя<label></label></div>
            <div><input type="radio" value="высокая" id="speed-3" v-model="local.speed">высокая<label></label></div>
        </div>
        <div class="error" v-if="local.ErrorSpeed">Выберите скорость!</div>

        <div class="block3">
            <h3>Размер</h3>
            <div><input type="radio" value="небольшой" id="size-1" v-model="local.size">небольшой<label></label></div>
            <div><input type="radio" value="средний" id="size-2" v-model="local.size">средний<label></label></div>
            <div><input type="radio" value="большой" id="size-3" v-model="local.size">большой<label></label></div>
        </div>
        <div class="error" v-if="local.ErrorSize">Выберите размер!</div>

        <button @click="check">Подтвердить</button>
    </div>
</template>

<style scoped>
.error {
    color: red;
}

.block {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 30px auto;
    max-width: 600px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.columns {
    display: flex;
    justify-content: space-between;
}

.block1, .block2, .block3 {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 10px;
}

.block > div {
    margin-bottom: 20px;
}

h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
}

h3 {
    font-size: 18px;
    color: #666;
}

input[type="radio"] {
    margin-right: 10px;
}

label {
    cursor: pointer;
}

button {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: pink;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #ff69b4;
}
</style>