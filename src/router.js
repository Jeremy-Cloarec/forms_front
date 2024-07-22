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


    { path: "/admin/104-lalala", component: () => import("./components/admin/forms_admin/104-lalala.vue") },

    { path: "/admin/105-jj", component: () => import("./components/admin/forms_admin/105-jj.vue") },

    { path: "/admin/106-a", component: () => import("./components/admin/forms_admin/106-a.vue") },

    { path: "/admin/107-aa", component: () => import("./components/admin/forms_admin/107-aa.vue") },

    { path: "/admin/109-yy", component: () => import("./components/admin/forms_admin/109-yy.vue") },

    { path: "/admin/111-lolo", component: () => import("./components/admin/forms_admin/111-lolo.vue") },

    { path: "/admin/112-ww", component: () => import("./components/admin/forms_admin/112-ww.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router