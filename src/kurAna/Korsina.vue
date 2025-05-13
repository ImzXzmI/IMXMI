<script setup>
import { computed, defineEmits } from "vue";

// Пропсы от родителя
const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
});

// Эмиты для обновления корзины и перехода в каталог
const emit = defineEmits(["updateCart", "openCatalog"]);

// Общая сумма
const totalPrice = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Функция изменения количества
function updateQuantity(product, change) {
  const updatedCart = props.cart.map(item => ({ ...item })); // создаём копию

  const index = updatedCart.findIndex(item => item.id === product.id);
  if (index !== -1) {
    updatedCart[index].quantity += change;

    // Если кол-во <= 0, удаляем товар из корзины
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }
  }

  emit("updateCart", updatedCart);
}

// Оформление заказа
function placeOrder() {
  alert("Заказ оформлен! Спасибо за покупку.");
  emit("updateCart", []);
}
</script>


<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="cart.length > 0">
      <ul class="cart-list">
        <li v-for="(product, index) in cart" :key="index" class="cart-item">
          <img :src="product.image" :alt="product.name" class="cart-image" />
          <div class="cart-info">
            <p class="cart-name">{{ product.name }}</p>
            <p class="cart-price">Цена: {{ product.price }} ₽</p>
            <p class="cart-quantity">
              Количество:
              <button @click="updateQuantity(product, -1)">−</button>
              {{ product.quantity }}
              <button @click="updateQuantity(product, 1)">+</button>
            </p>
            <p class="cart-total">
              Сумма: {{ product.price * product.quantity }} ₽
            </p>
          </div>
        </li>
      </ul>
      <h2 class="cart-total-price">Общая сумма: {{ totalPrice }} ₽</h2>
      <button class="order-button" @click="placeOrder">Оформить заказ</button>
    </div>

    <div v-else>
      <p>Ваша корзина пуста.</p>
    </div>

    <button class="catalog-button" @click="$emit('openCatalog')">Перейти в каталог</button>
  </div>
</template>

<style scoped>
.cart-page {
  text-align: center;
  padding: 20px;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.cart-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-info {
  text-align: left;
}

.cart-name {
  font-weight: bold;
}

.cart-price,
.cart-quantity,
.cart-total {
  font-size: 14px;
  color: #555;
}

.cart-quantity button {
  margin: 0 5px;
  padding: 2px 6px;
  font-size: 14px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
}

.cart-quantity button:hover {
  background-color: #bbb;
}

.cart-total-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.order-button {
  background-color: #4caf50;
  color: white;
}

.order-button:hover {
  background-color: #45a049;
}

.catalog-button {
  background-color: #007bff;
  color: white;
}

.catalog-button:hover {
  background-color: #0056b3;
}
</style>
