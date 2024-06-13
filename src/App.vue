<script setup>
import PRVelo from './components/forms/PRVelo.vue'
</script>
<template>
  <div>
    <header>
      <h1>Form test</h1>
    </header>
    <main>
      <PRVelo />
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  gap: 1.5em;
}
main {
  padding: 2em;
}
</style>
