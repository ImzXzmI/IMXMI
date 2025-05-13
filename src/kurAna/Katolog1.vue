<script setup>
import { ref, computed, defineEmits } from "vue";

const props = defineProps({
  products: Array, // Список товаров
});

const emit = defineEmits(["addToCart", "openCart"]); // Определяем события

const selectedProduct = ref(null);
const cartCounts = ref({}); // Хранит количество добавленных товаров

// Открытие карточки товара
function openProduct(product) {
  selectedProduct.value = product;
}

// Закрытие карточки товара
function closeProduct() {
  selectedProduct.value = null;
}

// Переход в корзину
function goToCart() {
  emit("openCart"); // Вызываем событие открытия корзины
}

// Добавление товара в корзину
function handleAddToCart(product) {
  if (!cartCounts.value[product.id]) {
    cartCounts.value[product.id] = 1;
  } else {
    cartCounts.value[product.id]++;
  }
  emit("addToCart", product); // Передаем товар в родительский компонент
}
</script>

<template>
  <div>
    <!-- Подробная информация о товаре -->
    <div v-if="selectedProduct" class="product-detail-modal">
      <div class="overlay" @click="closeProduct"></div>
      <div class="product-detail">
        <button class="back-button" @click="closeProduct">Назад</button>
        <img :src="selectedProduct.image" :alt="selectedProduct.name" class="large-image" />
        <h2>{{ selectedProduct.name }}</h2>
        <p><strong>Цена:</strong> {{ selectedProduct.price }} ₽</p>
        <p>{{ selectedProduct.description }}</p>
        <button @click="handleAddToCart(selectedProduct)" class="add-to-cart-button">
          Добавить в корзину
          <span v-if="cartCounts[selectedProduct.id]">({{ cartCounts[selectedProduct.id] }})</span>
        </button>
      </div>
    </div>

    <!-- Каталог товаров -->
    <div v-else class="catalog">
      <h1 class="catalog-title">Каталог товаров</h1>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image"/>
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }} ₽</p>
          <button @click="openProduct(product)" class="view-button">Подробнее</button>
          <button @click="handleAddToCart(product)" class="add-to-cart-button">
            Добавить в корзину
            <span v-if="cartCounts[product.id]">({{ cartCounts[product.id] }})</span>
          </button>
        </div>
      </div>
      <button @click="goToCart" class="cart-button">Перейти в корзину</button>
    </div>
  </div>
</template>

<style scoped>
/* Общие стили */
button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

/* Каталог */
.catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.catalog-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 20px;
}

.product-card {
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-name {
  font-size: 18px;
  margin: 10px;
}

.product-price {
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
}

.view-button,
.add-to-cart-button {
  background-color: #4CAF50;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
}

.view-button {
  background-color: #007bff;
}

.add-to-cart-button {
  background-color: #28a745;
}

.cart-button {
  background-color: #007bff;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
}

.cart-button:hover {
  background-color: #0056b3;
}

/* Модальное окно */
.product-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.product-detail {
  background-color: white;
  padding: 30px;
  max-width: 600px;
  width: 80%;
  border-radius: 8px;
  position: relative;
}

.large-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  color: #007bff;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.back-button:hover {
  text-decoration: underline;
}
</style>


