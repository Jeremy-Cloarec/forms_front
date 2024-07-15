<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const goToForm1 = () => {
    router.push('/form1')
}
</script>

<template>
    <div>
        <h1>Client Home</h1>
        <button @click="goToForm1">Go to form form1</button>
    </div>
</template>