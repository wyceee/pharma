<template>
  <nav class="navbar">
    <img src="@/assets/Pharma.png" alt="PharmaChain Logo" class="navbar-logo" />
    <ul class="navbar-links">
      <li>
        <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
      </li>
      <li v-if="auth.role === 'Manufacturer' || auth.role === 'Distributor'">
        <router-link to="/dashboard" class="nav-link" exact-active-class="active">Dashboard</router-link>
      </li>
      <li v-if="auth.role === 'Manufacturer'">
        <router-link to="/product" class="nav-link" exact-active-class="active">Products</router-link>
      </li>
      <li v-if="auth.role === 'Distributor'">
        <router-link to="/shipment" class="nav-link" exact-active-class="active">Shipments</router-link>
      </li>
      <li v-if="!auth.role">
        <router-link to="/login" class="nav-link" exact-active-class="active">Login</router-link>
      </li>
      <li v-if="auth.role">
        <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.setRole(null);
  localStorage.removeItem('token');
  router.push('/login');
};
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
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-links .nav-link {
  color: #000;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
  padding-bottom: 2px;
}

.navbar-links .nav-link:hover {
  color: #8CC342;
}

.navbar-links .nav-link.active {
  color: #8CC342;
  font-weight: 600;
  border-bottom: 2px solid #8CC342;
}
</style>