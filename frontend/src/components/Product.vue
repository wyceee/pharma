<template>
  <div class="product-header">
    <h1 class="product-title">🧪 Create Product</h1>
    <p class="product-subtitle">Register a new pharmaceutical product</p>
  </div>

  <div class="product-card">
    <div class="product-card-content">
      <form class="product-form" @submit.prevent="createProduct">
        <div class="form-group">
          <label for="batchNumber" class="form-label">Batch Number</label>
          <input id="batchNumber" v-model="form.batchNumber" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="name" class="form-label">Product Name</label>
          <input id="name" v-model="form.name" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="ingredients" class="form-label">Ingredients</label>
          <input id="ingredients" v-model="form.ingredients" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="manufacturer" class="form-label">Manufacturer</label>
          <input id="manufacturer" v-model="form.manufacturer" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="manufactureDate" class="form-label">Manufacture Date</label>
          <input id="manufactureDate" type="date" v-model="form.manufactureDate" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="expiryDate" class="form-label">Expiry Date</label>
          <input id="expiryDate" type="date" v-model="form.expiryDate" class="form-input" required />
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-button" :disabled="loading">
            <span v-if="loading" class="loader"></span>
            <span v-else>Create Product</span>
          </button>
        </div>
      </form>

      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createProduct as createProductAPI } from '../service/productService'

const loading = ref(false)
const error = ref('')
const form = ref({
  batchNumber: '',
  name: '',
  ingredients: '',
  manufacturer: '',
  manufactureDate: '',
  expiryDate: ''
})

async function createProduct() {
  loading.value = true
  error.value = ''
  try {
    const identityName = localStorage.getItem('identityName')
    await createProductAPI({ ...form.value, identityName })
    alert(`Product for batch #${form.value.batchNumber} created.`)
    form.value = {
      batchNumber: '',
      name: "",
      ingredients: '',
      manufacturer: '',
      manufactureDate: '',
      expiryDate: ''
    }
  } catch (err: any) {
    let msg = err.message || 'Failed to create product.'
    const match = msg.match(/Product with batch number [^,|]+/)
    if (match && match[0]) {
      msg = match[0].trim()
    }
    error.value = msg
    alert(msg)
  }
  loading.value = false
}
</script>

<style scoped>
.product-header {
  margin-bottom: 2rem;
}

.product-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.product-subtitle {
  margin-top: 0.5rem;
  color: #4b5563;
  font-size: 1rem;
}

.product-card {
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #00432a;
  border-radius: 0.5rem;
}

.product-card-content {
  padding: 1.25rem 1rem 1.5rem;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  outline-offset: 2px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  position: relative;
  margin-left: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #00432a;
  border: none;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgb(37 99 235 / 0.5);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fca5a5;
  border-radius: 0.375rem;
}
</style>