<script setup>
import { reactive } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    user: Array,
    curUser: String 
});

const emit = defineEmits(['TestEmit', 'redirectToRegistration']);

const local = reactive({
    questions: [
        "Вопрос 1 (Введите текст)",
        "Вопрос 2 (Введите число)",
        "Вопрос 3 (Выберите вариант)",
        "Вопрос 4 (Да/Нет)",
        "Вопрос 5 (Введите текст)",
        "Вопрос 6 (Чек-бокс)",
        "Вопрос 7 (Выберите один из вариантов)",
        "Вопрос 8 (Введите число)",
        "Вопрос 9 (Выберите ответ)",
        "Вопрос 10 (Введите текст)",
    ],
    models: ["", "", "", "", "","", "", "", "", ""],
    answers: ["text1", "yes", "b", "yes", "5",  "b", "b", "yes", "a", "text10"],
    showModal: false,
    showModalResult: false,
    result: 0
});

function check() {
    if (props.curUser !== "") {
        // Проверяем, все ли ответы пустые
        const allAnswersEmpty = local.models.every(answer => answer === "");
        
        if (allAnswersEmpty) {
            local.showEmptyModal = true; // Показываем модальное окно с подтверждением
        } else {
            let score = 0;
            for (let index = 0; index < local.models.length; index++) {
                if (local.models[index] === local.answers[index]) {
                    score += 1; 
                }
            }
            local.result = score; // Сохраняем результат для отображения
            
            emit('TestEmit', score); 

            // Очистка ответов
            local.models.fill(""); // Сбрасываем ответы
            local.showModalResult = true; // Показываем модальное окно с результатом
        }
    } else {
        local.showModal = true; // Показываем модальное окно с ошибкой
    }
}

// Метод, который вызывается при выборе "Да" в модальном окне
function submitEmptyForm() {
    let score = 0; // Считаем, что все ответы засчитаны
    local.result = score; // Сохраняем результат
    emit('TestEmit', score); 

    // Очистка ответов
    local.models.fill(""); // Сбрасываем ответы
    local.showModalResult = true; // Показываем модальное окно с результатом
    local.showEmptyModal = false; // Закрываем модальное окно с подтверждением
}

// Метод для закрытия модального окна с подтверждением
function closeEmptyModal() {
    local.showEmptyModal = false; // Закрываем модальное окно
}

function closeModal() {
    local.showModal = false;

    emit('redirectToRegistration');
}

function closeModal1() {

    local.showModalResult = false;

}


</script>

<template>
    <div>
        <h2>Пройдите тест</h2>
    <div class="questions">
        <div v-for="(elem, index) in local.questions" :key="index">
            <div>{{ elem }}</div>
            <input v-if="index === 0" type="text" v-model="local.models[index]" />
            <div v-if="index === 1">
                <input type="radio" v-model="local.models[index]" value="yes" /> Да
                <input type="radio" v-model="local.models[index]" value="no" /> Нет
            </div>
            <select v-if="index === 2" v-model="local.models[index]">
                <option value="a">Вариант A</option>
                <option value="b">Вариант B</option>
                <option value="c">Вариант C</option>
            </select>
            <div v-if="index === 3">
                <input type="radio" v-model="local.models[index]" value="yes" /> Да
                <input type="radio" v-model="local.models[index]" value="no" /> Нет
            </div>
            <input v-if="index === 4" type="text" v-model="local.models[index]" />
            <select v-if="index === 5" v-model="local.models[index]">
                <option value="a">Вариант A</option>
                <option value="b">Вариант B</option>
                <option value="c">Вариант C</option>
            </select>
            <select v-if="index === 6" v-model="local.models[index]">
                <option value="a">Вариант A</option>
                <option value="b">Вариант B</option>
                <option value="c">Вариант C</option>
            </select>
            <div v-if="index === 7">
                <input type="radio" v-model="local.models[index]" value="yes" /> Да
                <input type="radio" v-model="local.models[index]" value="no" /> Нет
            </div>
            <select v-if="index === 8" v-model="local.models[index]">
                <option value="a">Ответ A</option>
                <option value="b">Ответ B</option>
                <option value="c">Ответ C</option>
            </select>
            <input v-if="index === 9" type="text" v-model="local.models[index]" />
        </div>
    </div>
    <button @click="check">Проверить</button>

        <!-- Модальное окно с ошибкой -->
        <div v-if="local.showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <p>Пожалуйста, выберите пользователя для авторизации перед началом теста.</p>
                <button @click="closeModal">Перейти к регистрации</button>
            </div>
        </div>

         <!-- Модальное окно с подтверждением отправки пустого бланка -->
         <div v-if="local.showEmptyModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeEmptyModal">&times;</span>
                <p>Точно ли вы хотите отправить пустой бланк?</p>
                <button @click="submitEmptyForm">Да</button>
                <button @click="closeEmptyModal">Нет</button>
            </div>
        </div>

        <!-- Модальное окно с результатом -->
        <div v-if="local.showModalResult" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <p>Ваш результат: {{ local.result }} из {{ local.questions.length }}</p>
                <button @click="closeModal1">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.questions {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
}
.close {
    cursor: pointer;
}
</style>