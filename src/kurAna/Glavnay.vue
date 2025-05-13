<script setup>
import { ref } from "vue";

// Слайдер
const currentSlide = ref(0);
const slides = [
  "path_to_your_image1.jpg", // Замените на ваши реальные изображения
  "path_to_your_image2.jpg",
  "path_to_your_image3.jpg",
];

function prevSlide() {
  currentSlide.value = (currentSlide.value === 0) ? slides.length - 1 : currentSlide.value - 1;
}

function nextSlide() {
  currentSlide.value = (currentSlide.value === slides.length - 1) ? 0 : currentSlide.value + 1;
}
</script>

<template>
  <div class="about-page">
    <!-- Слайдер -->
    <section class="slider">
      <div class="slider-container">
        <img :src="slides[currentSlide]" alt="Slide" class="slider-image" />
      </div>
      <div class="slider-nav">
        <button class="prev" @click="prevSlide">❮</button>
        <button class="next" @click="nextSlide">❯</button>
      </div>
    </section>

    <h1>О нас</h1>
    <section class="intro">
      <p>
        Мы - эксперты в мире парфюмерии, создающие уникальные ароматы, которые открывают новый мир ощущений. Наши парфюмы — это не просто запахи, это искусство, которое сочетает в себе лучшие традиции и инновационные подходы.
      </p>
    </section>

    <section class="process">
      <h2>Процесс создания аромата</h2>
      <p>
        Мы начинаем с тщательного выбора компонентов, чтобы создать композицию, которая будет потрясать. Каждый аромат — это результат кропотливой работы с природными и синтетическими ингредиентами.
      </p>

      <div class="grid">
        <div class="process-step">
          <h3>Выбор ингредиентов</h3>
          <p>
            Мы работаем только с лучшими ингредиентами — натуральными эссенциями, редкими маслами и ароматами, которые становятся основой наших парфюмов.
          </p>
          <div class="image-placeholder">
            <p>Здесь будет изображение ингредиентов.</p>
          </div>
        </div>

        <div class="process-step">
          <h3>Смешивание и тестирование</h3>
          <p>
            После выбора компонентов мы начинаем смешивание и тестирование разных сочетаний, чтобы найти идеальную гармонию для каждого аромата.
          </p>
          <div class="image-placeholder">
            <p>Здесь будет изображение процесса смешивания.</p>
          </div>
        </div>

        <div class="process-step">
          <h3>Упаковка и финал</h3>
          <p>
            После окончательной доработки, ароматы помещаются в стильные флаконы, готовые стать частью вашей коллекции парфюмерии.
          </p>
          <div class="image-placeholder">
            <p>Здесь будет изображение флаконов.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="why-us">
      <h2>Почему выбирают нас?</h2>
      <p>
        Мы предлагаем не только эксклюзивные ароматы, но и индивидуальные рекомендации, которые помогут вам выбрать парфюм, идеально подходящий для вашего стиля жизни.
      </p>
      <div class="image-placeholder">
        <p>Здесь будет изображение наших флаконов.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Стили для слайдера */
.slider {
  position: relative;
  max-width: 100%;
  margin-bottom: 40px;
  overflow: hidden;
}

.slider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.slider-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.slider-nav {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.prev, .next {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2em;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.prev:hover, .next:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* Стили для страницы "О нас" */
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

h1, h2, h3 {
  color: #333;
  text-align: center;
}

.intro p, .process p, .why-us p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  text-align: center;
}

h2 {
  margin-top: 40px;
  font-size: 24px;
}

h3 {
  margin-top: 20px;
  font-size: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
}

.process-step {
  text-align: center;
}

.image-placeholder {
  margin-top: 20px;
  height: 200px;
  background-color: #f4f4f4;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
}

.image-placeholder p {
  margin: 0;
}
</style>

