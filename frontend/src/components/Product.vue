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
          <button type="submit" class="submit-button">Create Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  batchNumber: '',
  ingredients: '',
  manufacturer: '',
  manufactureDate: '',
  expiryDate: ''
})

function createProduct() {
  console.log('Product created:', form.value)
  alert(`Product for batch #${form.value.batchNumber} created.`)
  form.value = {
    batchNumber: '',
    ingredients: '',
    manufacturer: '',
    manufactureDate: '',
    expiryDate: ''
  }
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

.submit-button:hover {
  background-color: #013526;
}

.submit-button:focus {
  outline: 2px solid #00432a;
  outline-offset: 2px;
}
</style>