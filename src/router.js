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


    { path: "/admin/131-a", component: () => import("./components/admin/forms_admin/131-a.vue") },
    { path: "/admin/132-ff", component: () => import("./components/admin/forms_admin/132-ff.vue") },

    { path: "/admin/133-gg", component: () => import("./components/admin/forms_admin/133-gg.vue") },
    
    { path: "/admin/134-aa", component: () => import("./components/admin/forms_admin/134-aa.vue") },

    { path: "/admin/135-bb", component: () => import("./components/admin/forms_admin/135-bb.vue") },

    { path: "/admin/136-bb", component: () => import("./components/admin/forms_admin/136-bb.vue") },

    { path: "/admin/137-bb", component: () => import("./components/admin/forms_admin/137-bb.vue") },

    { path: "/admin/138-tt", component: () => import("./components/admin/forms_admin/138-tt.vue") },
// Les nouvelles routes seront ajoutées au-dessus de cette ligne

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