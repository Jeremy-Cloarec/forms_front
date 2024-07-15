<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/admin">Admin</RouterLink>
  </nav>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  gap: 1.5em;
}

main {
  flex: 1;
  width: 100%;
}
</style>
