<script setup>

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToFormBuilder = () => {
    router.push('/admin/form-builder')
}

</script>

<template>
    <div>
        <h1>Admin Home</h1>
        <p>Current route: {{ route.fullPath }}</p>
        <button @click="goToFormBuilder">Go to form builder</button>
    </div>
</template>