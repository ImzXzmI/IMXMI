<script setup>
import { reactive, computed } from "vue";

const props = defineProps({
  results: Array
});

const filter = reactive({
  goals: "",
  speed: "",
  size: "",
});

const filteredResults = computed(() => {
  return props.results.filter((game) => {
    return (
      (filter.goals === "" || game.goals == filter.goals) &&
      (filter.speed === "" || game.speed === filter.speed) &&
      (filter.size === "" || game.size === filter.size)
    );
  });
});


function endGame(gameResult) {
  emit("gameResultEmit", gameResult);
}
</script>

<template>
  <div class="stats-container">
    <h1>Статистика игр</h1>

    <div class="filters">
      <label>Целей:
        <select v-model="filter.goals">
          <option value="">Все</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <label>Скорость:
        <select v-model="filter.speed">
          <option value="">Все</option>
          <option value="низкая">Низкая</option>
          <option value="средняя">Средняя</option>
          <option value="высокая">Высокая</option>
        </select>
      </label>
      <label>Размер:
        <select v-model="filter.size">
          <option value="">Все</option>
          <option value="небольшой">Небольшой</option>
          <option value="средний">Средний</option>
          <option value="большой">Большой</option>
        </select>
      </label>
    </div>

    <table>
      <thead>
        <tr>
          <th>№ Игры</th>
          <th>Целей</th>
          <th>Скорость</th>
          <th>Размер</th>
          <th>Результат (Очки)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(local, index) in filteredResults" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ local.goals }}</td>
          <td>{{ local.speed }}</td>
          <td>{{ local.size }}</td>
          <td>{{ local.result }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="filteredResults.length === 0">Нет данных о завершенных играх.</p>
  </div>

</template>

<style scoped>
.stats-container {
  text-align: center;
  padding: 20px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

select {
  padding: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 10px;
}
</style>

