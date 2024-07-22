import { createRouter, createWebHistory } from "vue-router";
import HomeAdmin from "./components/admin/HomeAdmin.vue";
import FormBuilder from "./components/admin/FormBuilder.vue";

import Form1 from "./components/public/forms_public/Form1.vue";
import HomePublic from "./components/public/HomePublic.vue";

const routes = [
    { path: "/", component: HomePublic },
    { path: "/form1", component: Form1 },
    { path: "/admin", component: HomeAdmin },
    { path: "/admin/form-builder", component: FormBuilder },


    { path: "/admin/123-aa", component: () => import("./components/admin/forms_admin/123-aa.vue") },

    { path: "/admin/124-aaa", component: () => import("./components/admin/forms_admin/124-aaa.vue") },

    { path: "/admin/127-a", component: () => import("./components/admin/forms_admin/127-a.vue") },

    { path: "/admin/128-yoyo", component: () => import("./components/admin/forms_admin/128-yoyo.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router