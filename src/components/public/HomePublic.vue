<script setup>

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToForm1 = () => {
    router.push('/form1')
}
</script>

<template>
    <div>
        <h1>Client Home</h1>
        <p>Current route: {{ route.fullPath }}</p>
        <button @click="goToForm1">Go to form form1</button>
    </div>
</template>