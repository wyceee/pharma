<template>
  <div v-if="currentPage === 'dashboard'">
    <div v-if="loading" class="dashboard-header">
      <h1>Loading dashboard...</h1>
    </div>
    <div v-else-if="error" class="dashboard-header">
      <h1>Error</h1>
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Pharmaceutical Supply Chain Management System</p>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon blue">
            <Package class="stat-icon-svg"/>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalProducts }}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <Truck class="stat-icon-svg"/>
          </div>
          <div class="stat-content">
            <h3>{{ stats.shippedProducts }}</h3>
            <p>Shipped Products</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">
            <AlertTriangle class="stat-icon-svg"/>
          </div>
          <div class="stat-content">
            <h3>{{ stats.pendingShipments }}</h3>
            <p>Pending Shipments</p>
          </div>
        </div>
      </div>

        <div class="recent-activity-body">
          <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="recent-activity-item"
              @click="toggleExpand(activity.id)"
              :aria-expanded="expandedId === activity.id"
          >
            <div class="expand-btn">
              <svg
                  class="expand-icon"
                  :class="{ rotated: expandedId === activity.id }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="10"
                  height="10"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
                class="recent-activity-icon"
                :style="{ backgroundColor: getActivityBg(activity.action) }"
            >
              <component
                  :is="getActivityIcon(activity.action).icon"
                  class="recent-activity-icon-svg"
                  :style="{ color: getActivityIcon(activity.action).color }"
              />
            </div>
            <div class="recent-activity-content">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <p class="recent-activity-action">{{ activity.action }}</p>
                  <p class="recent-activity-details">Batch: {{ activity.product.batchNumber }}</p>
                </div>
              </div>
              <div
                  v-show="expandedId === activity.id"
                  class="recent-activity-product-details"
              >
                <p><strong>Ingredients:</strong> {{ activity.product.ingredients }}</p>
                <p><strong>Manufacturer:</strong> {{ activity.product.manufacturer }}</p>
                <p><strong>Manufacture Date:</strong> {{ activity.product.manufactureDate }}</p>
                <p><strong>Expiry Date:</strong> {{ activity.product.expiryDate }}</p>
                <p v-if="activity.product.distributor"><strong>Distributor:</strong> {{ activity.product.distributor }}</p>
                <p v-if="activity.product.pharmacy"><strong>Pharmacy:</strong> {{ activity.product.pharmacy }}</p>
                <p v-if="activity.product.temperatureChecks"><strong>Temp Checks:</strong> {{ activity.product.temperatureChecks }}</p>
                <p v-if="activity.product.remarks"><strong>Remarks:</strong> {{ activity.product.remarks }}</p>
              </div>
            </div>
            <div class="recent-activity-time">{{ activity.time }}</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, Truck, AlertTriangle } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { getDashboardStats } from '@/service/dashboardService'

const currentPage = ref('dashboard')
const stats = ref({
  totalProducts: 0,
  shippedProducts: 0,
  pendingShipments: 0
})
type Activity = {
  id: string
  action: string
  details: string
  time: string
  product?: any
}
const recentActivity = ref<Activity[]>([])
const loading = ref(true)
const error = ref('')

const expandedId = ref<string | null>(null);

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id;
}

function getActivityIcon(action: string) {
  if (action === 'SHIPPED') return { icon: Truck, color: '#b23838' };
  if (action === 'CREATED') return { icon: Package, color: '#2563eb' };
  if (action === 'INSPECTED') return { icon: AlertTriangle, color: '#f59e42' };
  return { icon: Package, color: '#2563eb' };
}

function getActivityBg(action: string) {
  if (action === 'SHIPPED') return '#fde8e8';
  if (action === 'CREATED') return '#ebf8ff';
  if (action === 'INSPECTED') return '#fef3c7';
  return '#ebf8ff';
}

onMounted(async () => {
  loading.value = true
  try {
    const data = await getDashboardStats()
    stats.value = data.stats
    recentActivity.value = data.recentActivity
  } catch (err: any) {
    error.value = err.message || 'Failed to load dashboard data'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.expand-btn:hover {
  background: #e0e7ef;
  border-color: #2563eb;
}

.expand-icon {
  width: 10px !important;
  height: 10px !important;
  color: #2563eb;
  transition: transform 0.3s;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.recent-activity-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.recent-activity-item:hover {
  background-color: #f3f4f6;
}

.expand-icon {
  color: #2563eb;
  transition: transform 0.3s;
  width: 20px;
  height: 20px;
  margin: 0;
  display: block;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.dashboard-header {
  margin-bottom: 4rem;
}

.dashboard-header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.25rem;
}

.dashboard-header p {
  color: #4b5563;
  font-size: 0.95rem;
}

.stats-cards {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #00432a;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.stat-icon {
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.stat-icon.blue {
  background-color: #ebf8ff;
}

.stat-icon.green {
  background-color: #d1fae5;
}

.stat-icon.yellow {
  background-color: #fef3c7;
}

.stat-icon-svg {
  width: 1.25rem;
  height: 1.25rem;
}

.stat-content {
  margin-left: 0.75rem;
}

.stat-content h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.stat-content p {
  color: #4b5563;
  font-size: 0.9rem;
}

.recent-activity-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.recent-activity-body {
  padding: 1rem 1.25rem;
  background: #fff;
}

.recent-activity-body {
  padding: 1rem 1.25rem;
}

.recent-activity-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.recent-activity-icon {
  flex-shrink: 0;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #ebf8ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recent-activity-icon-svg {
  width: 1.1rem;
  height: 1.1rem;
  color: #2563eb;
}

.recent-activity-content {
  flex: 1;
  margin-left: 0.75rem;
}

.recent-activity-action {
  font-size: 1rem;
  font-weight: bold;
  color: #111827;
}

.recent-activity-details {
  font-size: 1rem;
}

.recent-activity-time {
  font-size: 0.8rem;
  color: #6b7280;
}
</style>