<template>
  <div>
    <div class="shipment-header">
      <h1 class="shipment-title">📦 Ship Product</h1>
      <p class="shipment-subtitle">Dispatch a product shipment</p>
    </div>

    <div class="shipment-card">
      <div class="shipment-card-content">
        <form class="shipment-form" @submit.prevent="shipProduct">
          <div class="form-group">
            <label for="productSelect" class="form-label">Select Product</label>
            <select id="productSelect" v-model="selectedProductId" class="form-select" @change="fillProductData">
              <option value="" disabled>Select a product</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.batchNumber }} - {{ product.manufacturer }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="batchNumber" class="form-label">Batch Number</label>
            <input
                id="batchNumber"
                v-model="form.batchNumber"
                class="form-input"
                placeholder="Batch Number"
                required
            />
          </div>

          <div class="form-group">
            <label for="distributorName" class="form-label">Distributor Name</label>
            <input
                id="distributorName"
                v-model="form.distributorName"
                class="form-input"
                placeholder="Distributor Name"
                required
            />
          </div>

          <div class="form-group">
            <label for="temperatureChecks" class="form-label">Temperature Checks</label>
            <input
                id="temperatureChecks"
                v-model="form.temperatureChecks"
                class="form-input"
                placeholder="Temperature Checks"
                required
            />
          </div>

          <div class="form-group">
            <label for="shippingDate" class="form-label">Shipping Date</label>
            <input
                id="shippingDate"
                v-model="form.shippingDate"
                type="date"
                class="form-input"
                required
            />
          </div>

          <div class="form-group">
            <label for="manufacturer" class="form-label">Manufacturer</label>
            <input
                id="manufacturer"
                v-model="form.manufacturer"
                class="form-input"
                placeholder="Manufacturer"
                readonly
            />
          </div>

          <div class="form-group">
            <label for="ingredients" class="form-label">Ingredients</label>
            <input
                id="ingredients"
                v-model="form.ingredients"
                class="form-input"
                placeholder="Ingredients"
                readonly
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-button">
              Submit Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const products = ref([
  { id: 1, batchNumber: 'BN-001', manufacturer: 'Pharma A', ingredients: 'Water, Glycerin' },
  { id: 2, batchNumber: 'BN-002', manufacturer: 'Pharma B', ingredients: 'Alcohol, Saline' },
  { id: 3, batchNumber: 'BN-003', manufacturer: 'Pharma C', ingredients: 'Herbs, Minerals' }
])

const selectedProductId = ref('')

const form = ref({
  batchNumber: '',
  distributorName: '',
  temperatureChecks: '',
  shippingDate: '',
  manufacturer: '',
  ingredients: ''
})

function fillProductData() {
  const selected = products.value.find(p => p.id === Number(selectedProductId.value))
  if (selected) {
    form.value.batchNumber = selected.batchNumber
    form.value.manufacturer = selected.manufacturer
    form.value.ingredients = selected.ingredients
  }
}

function shipProduct() {
  console.log('Shipping product:', form.value);
  alert(`Shipment submitted for batch #${form.value.batchNumber}`);

  form.value = {
    batchNumber: '',
    distributorName: '',
    temperatureChecks: '',
    shippingDate: '',
    manufacturer: '',
    ingredients: ''
  }
  selectedProductId.value = ''
}
</script>

<style scoped>
.shipment-header {
  margin-bottom: 2rem;
}

.shipment-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.shipment-subtitle {
  margin-top: 0.5rem;
  color: #4b5563;
  font-size: 1rem;
}

.shipment-card {
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #00432a;
  border-radius: 0.5rem;
}

.shipment-card-content {
  padding: 1.25rem 1rem 1.5rem;
}

.shipment-form {
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

.form-select,
.form-input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  outline-offset: 2px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus {
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