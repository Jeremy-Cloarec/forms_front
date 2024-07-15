<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const goToFormBuilder = () => {
    router.push('/admin/form-builder')
}

</script>

<template>
    <div>
        <h1>Admin Home</h1>
        <button @click="goToFormBuilder">Go to form builder</button>
    </div>
</template>