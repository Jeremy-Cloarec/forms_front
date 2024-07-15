<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const goToFormBuilder = () => {
    router.push('/admin/form-builder')
}

const goToFormTest = () => {
    router.push('/admin/form-test')
}

</script>

<template>
    <div>
        <h1>Admin Home</h1>
        <button @click="goToFormBuilder">Go to form builder</button>
        <button @click="goToFormTest">Go to form test</button>
    </div>
</template>