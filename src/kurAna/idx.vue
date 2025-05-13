<script setup>
import { ref, reactive, computed } from "vue";
import Glavnay from "./Glavnay.vue";
import Katolog1 from "./Katolog1.vue";
import Katolog2 from "./Katolog2.vue";
import Dostavka from "./Dostavka.vue";
import Korsina from "./Korsina.vue";
import LK from "./LK.vue";

const showSidebar = ref(true);
const selectedAvatar = ref("https://cdn-icons-png.flaticon.com/512/9131/9131529.png");

const avatarOptions = [
  "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
  "https://cdn-icons-png.flaticon.com/512/9131/9131531.png",
  "https://cdn-icons-png.flaticon.com/512/9131/9131534.png",
  "https://cdn-icons-png.flaticon.com/512/9131/9131536.png"
];

const local = reactive({
  curPage: 1,
  user: null,
  cart: [],
  products: [
    { id: 1, name: "L'Air du Temps", price: 6500, image: "air-du-temps.jpg", description: "Флоральный аромат с нотами розы и гвоздики", reviews: ["Нежный и стойкий!", "Любимый аромат."] },
    { id: 2, name: "Bleu de Chanel", price: 8200, image: "bleu.jpg", description: "Свежий древесно-пряный аромат", reviews: ["Очень стильный!", "Идеален на каждый день."] },
    { id: 3, name: "Black Opium", price: 7400, image: "opium.jpg", description: "Гурманский аромат с кофейной нотой", reviews: ["Сладкий и сексуальный!", "Вау-эффект гарантирован."] },
  ],
});

function registerUser(data) {
  local.user = data;
  localStorage.setItem("user", JSON.stringify(data));
}

function logoutUser() {
  local.user = null;
  localStorage.removeItem("user");
}

const authButtonText = computed(() => (local.user ? local.user.username : "Войти"));

function addToCart(product) {
  const existing = local.cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    local.cart.push({ ...product, quantity: 1 });
  }
}

const cartGrouped = computed(() => {
  return local.cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));
});

const totalAmount = computed(() => {
  return cartGrouped.value.reduce((sum, item) => sum + item.totalPrice, 0);
});

function openCart() {
  local.curPage = 5;
}

function openCatalog() {
  local.curPage = 2;
}

function placeOrder() {
  alert(`Заказ оформлен на сумму ${totalAmount.value} ₽`);
}
</script>

<template>
  <button v-if="!showSidebar" @click="showSidebar = true" class="show-sidebar-btn">☰</button>

  <div class="app-wrapper">
    <!-- Основной контент -->
    <div class="main-content">
      <div class="header">
        <div class="menu">
          <button @click="local.curPage = 1" :class="{ menuIt: local.curPage == 1 }">🏪 О магазине</button>
          <button @click="openCatalog" :class="{ menuIt: local.curPage == 2 }">💐 Каталог</button>
          <button @click="local.curPage = 3" :class="{ menuIt: local.curPage == 3 }">🎨 Ароматы на заказ</button>
          <button @click="local.curPage = 4" :class="{ menuIt: local.curPage == 4 }">🚚 Доставка</button>
          <button @click="openCart" :class="{ menuIt: local.curPage == 5 }">🛒 Корзина</button>
          <button @click="local.curPage = 6" :class="{ menuIt: local.curPage == 6 }">👤 {{ authButtonText }}</button>
        </div>
      </div>

      <div>
        <Glavnay v-if="local.curPage == 1" />
        <Katolog1 v-if="local.curPage == 2" :products="local.products" @addToCart="addToCart" @openCart="openCart" />
        <Katolog2 v-if="local.curPage == 3" />
        <Dostavka v-if="local.curPage == 4" />
        <Korsina v-if="local.curPage == 5" :cart="local.cart" @updateCart="(newCart) => local.cart = newCart" @openCatalog="openCatalog" />
        <LK v-if="local.curPage == 6" :user="local.user" @RegistorEmit="registerUser" @logoutEmit="logoutUser" />
      </div>
    </div>

    <!-- Sidebar -->
    <div v-if="showSidebar" class="sidebar">
      <button class="hide-btn" @click="showSidebar = false">✖</button>

      <div class="profile">
        <h3>👤 Профиль</h3>
        <div v-if="local.user">
          <img :src="selectedAvatar" alt="avatar" class="avatar" />
          <p>{{ local.user.username }}</p>
          <div class="avatar-picker">
            <p>Выбор аватара:</p>
            <div class="avatars">
              <img
                v-for="(img, index) in avatarOptions"
                :key="index"
                :src="img"
                class="avatar-option"
                :class="{ selected: selectedAvatar === img }"
                @click="selectedAvatar = img"
              />
            </div>
          </div>
        </div>
        <p v-else>Не авторизован</p>
      </div>

      <h4 style="margin-top: 20px;">🛒 Корзина</h4>
      <ul>
        <li v-for="item in cartGrouped" :key="item.id">
          {{ item.name }} — {{ item.price }} ₽ (x{{ item.quantity }}) — {{ item.totalPrice }} ₽
        </li>
        <li v-if="cartGrouped.length === 0">Пусто</li>
      </ul>
      <div v-if="cartGrouped.length > 0">
        <p><strong>Итого: {{ totalAmount }} ₽</strong></p>
        <button @click="placeOrder" class="order-button">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
  background-color: #f9fafc;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.sidebar {
  width: 260px;
  background-color: #ffffff;
  padding: 20px;
  border-left: 1px solid #ddd;
  border-right: none;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05);
}

.hide-btn {
  align-self: flex-end;
  margin-bottom: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
}

.show-sidebar-btn {
  position: fixed;
  top: 20px;
  right: 10px;
  z-index: 1000;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #ccc;
}

.avatar-picker {
  margin-top: 10px;
}

.avatars {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.avatar-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.2s;
}

.avatar-option:hover {
  border-color: #007bff;
}

.selected {
  border-color: #007bff;
}

.header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.menu {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.menu button {
  padding: 10px 16px;
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.menu button:hover {
  background-color: #f0f0f0;
}

.menuIt {
  border-color: #00bcd4;
  background-color: #e0f7fa;
}

.order-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.order-button:hover {
  background-color: #218838;
}
</style>
