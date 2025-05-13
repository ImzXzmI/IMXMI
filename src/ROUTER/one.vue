<script setup>


</script>

<template>
    <div>page 1</div>

    <div v-for="(user, index) in users">
        {{ user.id }}
        {{ user.name }}
    </div>
</template>

<style scoped></style>