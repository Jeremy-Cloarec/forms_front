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

        <button @click="router.push('/admin/107-aa')">Go to 107-aa</button>

        <button @click="router.push('/admin/109-yy')">Go to 109-yy</button>
       
                <button @click="router.push('/admin/111-lolo')">Go to 111-lolo</button>
            
                <button @click="router.push('/admin/112-ww')">Go to 112-ww</button>
             <!-- Add button to new form befor this line -->
    </div>
</template>