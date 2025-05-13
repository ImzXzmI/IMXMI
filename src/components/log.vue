<script setup>
import { reactive } from "vue";

const emit = defineEmits(["RegistorEmit"]);

const local = reactive({
    name : "",
    gender : "",
    age : "",
    results: [],
    Errorname : false,
    Errorgender : false,
    Errorage : false,
});

function check() {
    let passChock = true;

    if (!/^[А-Я][а-я]+$/.test(local.name)) {
        local.Errorname = true;
        passChock = false;
    } else {
        local.Errorname = false;
    }

    if (!local.gender) {
        local.Errorgender = true;
        passChock = false;
    } else {
        local.Errorgender = false;
    }

    if (!(local.age <= 100 && local.age >= 5)) {
        local.Errorage = true;
        passChock = false;
    } else {
        local.Errorage = false;
    }

    if (passChock) {
        emit("RegistorEmit", {
            name : local.name,
            gender : local.gender,
            age : local.age,
            results : [],
        });

        local.name = "";
        local.gender = "";
        local.age = "";
    }
}
</script>

<template>
    <h1>Добавить акк</h1>
    <div>
        <input type="text" placeholder="name" v-model="local.name">
        <div class="error" v-if="local.Errorname">Одним словом с заглавной!</div>
        <div>
            <div>Пол</div>
            <div><input type="radio" value="жен" id="gender-1" v-model="local.gender">жен<label></label></div>
            <div><input type="radio" value="муж" id="gender-2" v-model="local.gender">муж<label></label></div>
            <div><input type="radio" value="никто" id="gender-3" v-model="local.gender">никто<label></label></div>
        </div>
        <div class="error" v-if="local.Errorgender">Вы кто?</div>
        <input type="number" placeholder="Возраст" v-model="local.age">
        <div class="error" v-if="local.Errorage">Выберите норм возраст</div>
        <div>
            <button @click="check">Подтвердить</button>
        </div>
    </div>
</template>
<style scoped>
.error {
    color:red
}
</style>