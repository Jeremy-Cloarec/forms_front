import { createRouter, createWebHistory } from "vue-router";
import HomeAdmin from "./components/admin/HomeAdmin.vue";
import FormBuilder from "./components/admin/FormBuilder.vue";
import FormTest from "./components/admin/forms_admin/FormTest.vue";
import Form1 from "./components/public/forms_public/Form1.vue";
import HomePublic from "./components/public/HomePublic.vue";

const routes = [
    { path: "/", component: HomePublic },
    { path: "/form1", component: Form1 },
    { path: "/admin", component: HomeAdmin },
    { path: "/admin/form-builder", component: FormBuilder },
    { path: "/admin/form-test", component: FormTest },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router