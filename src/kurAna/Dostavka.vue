<script setup>
import { ref } from 'vue';

const deliverySteps = [
  { id: 1, title: 'Размещение заказа', description: 'Выберите свой аромат и оформите заказ онлайн.' },
  { id: 2, title: 'Упаковка', description: 'Наши духи тщательно упаковываются для защиты и удобства доставки.' },
  { id: 3, title: 'Транспортировка', description: 'Доставка осуществляется с помощью надежных курьеров.' },
  { id: 4, title: 'Доставка', description: 'Духи доставляются прямо к вашей двери с особым вниманием.' },
];
</script>

<template>
  <div class="delivery-process">
    <h1>Процесс доставки духов</h1>

    <div class="steps">
      <div v-for="step in deliverySteps" :key="step.id" class="step">
        <h2>{{ step.title }}</h2>
        <p>{{ step.description }}</p>
        <div class="arrow-animation"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delivery-process {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.steps {
  margin-top: 30px;
}

.step {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.step:hover {
  transform: scale(1.05);
  background: #eef2ff;
}

h2 {
  color: #3478f6;
  font-size: 22px;
}

.arrow-animation {
  margin-top: 15px;
  width: 50px;
  height: 10px;
  background: #3478f6;
  animation: moveArrow 2s infinite;
}

@keyframes moveArrow {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
