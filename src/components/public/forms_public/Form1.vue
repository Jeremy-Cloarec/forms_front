<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const gotToHome = () => {
    router.push('/')
}

</script>

<template>
    <div>
        <h1>Form 1</h1>
        <button @click="gotToHome">Go to Home</button>
    </div>
</template>