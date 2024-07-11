<template>
  <header>
    <h1>Form builder</h1>
  </header>
  <main>
    <FormBuilder />
  </main>
</template>

<script setup>

import FormBuilder from './components/FormBuilder.vue';

</script>

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
