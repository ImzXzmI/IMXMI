import {createRouter, createWebHistory} from "vue-router"

import p1 from "./ROUTER/one.vue"
import p2 from "./ROUTER/two.vue"
import p3 from "./ROUTER/three.vue"

const routes = [
    {path: "/",component: p1, name:"pageOne"},
    {path: "/two",component: p2, name:"pagetwo"},
    {path: "/three",component: p3, name:"pagethree"},
]

export const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)