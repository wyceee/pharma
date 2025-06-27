<template>
  <div class="login-screen">
    <div class="login-card">
      <div class="card-header">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="PharmaChain Logo" class="logo-img" />
        </div>
        <h1>Welcome to PharmaChain</h1>
        <p>Sign in to access the supply chain management system</p>
      </div>

      <form class="login-form" @submit="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-container">
            <User class="input-icon" />
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              v-model="username"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-container">
            <Lock class="input-icon" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model="password"
              required
            />
          </div>
        </div>

        <button class="sign-in-button" type="submit" :disabled="loading">
          <LogIn class="button-icon" />
          <span v-if="loading">Signing In...</span>
          <span v-else>Sign In</span>
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <div class="terms-footer">
        <p>
          By signing in, you agree to our
          <a href="#">Terms of Service</a> and
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>

    <div class="security-notice">
      <div class="security-box">
        <Shield class="security-icon" />
        <span>Secured by Hyperledger Fabric blockchain technology</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Shield,
  User,
  Lock,
  LogIn
} from 'lucide-vue-next'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/service/authenticationService';
import { useAuthStore } from '@/stores/auth';

const username = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');
const loading = ref<boolean>(false);
const router = useRouter();
const auth = useAuthStore();

type LoginResponse = {
  token: string;
  role: string;
};

const handleLogin = async (e: Event) => {
  e.preventDefault();
  error.value = '';
  loading.value = true;
  try {
    const data = await login(username.value, password.value) as LoginResponse;
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    auth.setRole(data.role);
    router.push('/dashboard');
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-screen {
  position: relative;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  position: relative;
  background-color: #fff;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 25rem;
  width: 100%;
  min-height: 27rem;
  box-shadow: 0px 10px 30px rgba(0,0,0,.1);
  margin-bottom: 5rem;
}
.card-header {
  text-align: center;
  margin-bottom: 2rem;
}
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.logo-img {
  width: 3.5rem;
  height: 3.5rem;
  padding: 0.5rem;
  object-fit: contain;
}
.card-header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
}
.card-header p {
  font-size: 0.875rem;
  color: #4b5563;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}
.input-container,
.select-container {
  position: relative;
}
.input-container input,
.select-container select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 3rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}
.input-container input:focus,
.select-container select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}
.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}
.sign-in-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: #013526;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
.sign-in-button:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}
.sign-in-button:hover:not(:disabled) {
  background-color: #00432a;
}
.button-icon {
  margin-right: 0.5rem;
}
.terms-footer {
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
}
.terms-footer a {
  color: #8CC342;
  text-decoration: none;
}
.terms-footer a:hover {
  color: #00432a;
}
.security-notice {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
}
.security-box {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #4b5563;
  background-color: rgba(255,255,255,0.8);
  padding: 0.75rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(4px);
  box-shadow: 0px 4px 12px rgba(0,0,0,.1);
}
.security-icon {
  margin-right: 0.5rem;
  color: #16a34a;
}
.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
}
</style>