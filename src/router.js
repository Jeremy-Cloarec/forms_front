import { createRouter, createWebHistory } from "vue-router";
import HomeAdmin from "./components/admin/HomeAdmin.vue";
import FormBuilder from "./components/admin/FormBuilder.vue";
import Form1 from "./components/public/forms_public/FormPublic.vue";
import HomePublic from "./components/public/HomePublic.vue";
import FormAdmin from "./components/admin/forms_admin/FormAdmin.vue";
import FormPublic from "./components/public/forms_public/FormPublic.vue";

const routes = [
    { path: "/", component: HomePublic },
    { path: "/form1", component: Form1 },
    { path: "/admin", component: HomeAdmin },
    { path: "/admin/form-builder", component: FormBuilder },
    {path: "/admin/form-admin/:id", component: FormAdmin},
    {path: "/form/:id", component: FormPublic},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router