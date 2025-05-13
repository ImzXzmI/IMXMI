<script setup>
import { reactive } from 'vue';

const props = defineProps({
    user: Array, 
    curUser: "", 
});

const emit = defineEmits(['deleteEmit']);
const local = reactive({
    userRes: []
});

if (props.user && props.user.length > 0) {
    props.user.forEach(element => {
        let summ = 0;
        if (element.results && element.results.length > 0) {
            element.results.forEach(smth => {
                summ += smth;
            });
            let averageScore = summ / element.results.length;
            local.userRes.push(averageScore);
            // Выводим результат в консоль
            console.log(`Средний балл для ${element.name}: ${averageScore}`);
        } else {
            local.userRes.push(0); // Если нет результатов, добавляем 0
            console.log(`Нет результатов для ${element.name}`); // Сообщение для отсутствия результатов
        }
    });
}

function del(index) {
    emit('deleteEmit', index);
}
</script>

<template>
    <div class="panel">
        <div class="card" 
        v-for="(elem,index) in props.user"
        :key="index"
        :class="{active: index === props.curUser}">
            <div class="cardSect">
                <div>{{ index + 1 }} : {{ elem.name }}</div>
                <button @click="del(index)">Удалить</button>
            </div>
            <div class="cardSectMid">
                <div>{{ elem.gender }}</div>
                <div>{{ elem.age }}</div>
            </div>
            <div class="cardSect">
                {{ local.userRes[index] }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel {
    margin-top: 50px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
}
.card {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    border: 2px solid;
    border-radius: 10px;
}
.active {
    background-color: pink;
    border-color: blueviolet;
}









</style>