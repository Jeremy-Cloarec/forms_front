<script setup>

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const gotToHome = () => {
    router.push('/')
}

</script>

<template>
    <div>
        <h1>Form 1</h1>
        <p>Current route: {{ route.fullPath }}</p>
        <button @click="gotToHome">Go to Home</button>
    </div>
</template>