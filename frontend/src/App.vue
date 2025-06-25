<script setup>
import Dashboard from './components/Dashboard.vue'
import Navbar from "@/components/Navbar.vue";
</script>

<template>
<Navbar />
<div class="main-container">
  <Dashboard />
</div>
</template>

<style scoped>
.main-container {
  flex: 1;
  margin: 3rem 2rem;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background: #ABBAAB;
  background: linear-gradient(90deg, rgba(171, 186, 171, 1) 0%, rgba(255, 255, 255, 1) 100%);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>
