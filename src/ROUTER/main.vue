<script setup>

import { RouterLink, RouterView } from 'vue-router';




</script>

<template>
    <div>MAIN</div>


    <RouterLink :to="{ name: 'pageOne' }">Page 1</RouterLink>
    <RouterLink :to="{ name: 'pagetwo' }">Page 2</RouterLink>
    <RouterLink :to="{ name: 'pagethree' }">Page 3</RouterLink>

    <RouterView />

    <!-- <button @click="UseUsers.addUsers"></button> -->
</template>

<style scoped></style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    s