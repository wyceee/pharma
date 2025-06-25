<template>
  <!-- Navbar content goes here -->
  <nav class="navbar">
    <!-- Example: Logo and navigation links -->
    <img src="@/assets/Pharma.png" alt="PharmaChain Logo" class="navbar-logo" />
    <ul class="navbar-links">
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="#">Shipments</a></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// No login logic needed
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #ffffff;
  color: #00432a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
}
.navbar-logo {
  height: 55px;
  width: auto;
  display: block;
}
.navbar-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}
.navbar-links li a {
  color: #000000;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.navbar-links li a:hover {
  color: #a5b4fc;
}
</style>
