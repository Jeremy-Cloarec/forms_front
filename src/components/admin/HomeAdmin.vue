<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const goToFormBuilder = () => {
    router.push('/admin/form-builder')
}
</script>

<template>
    <div class="container-admin">
        <h1>Admin Home</h1>
        <button @click="goToFormBuilder" class="form-builder">Go to form builder
        </button>
        <div class="container-news-forms">
            <h2>News forms</h2>



            <button @click="router.push('/admin/152-hello')">Go to Hello</button>
<!-- insert above -->
        </div>
    </div>
</template>

<style>
.container-admin {
    padding: 16px
}

.form-builder {
    background-color: black;
    color: white;
}

.container-news-forms {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: rgb(233, 233, 233);
    padding: 16px;
    max-width: 800px;
    margin: auto;
    margin-top: 34px;
    border-radius: 12px;
}
</style>