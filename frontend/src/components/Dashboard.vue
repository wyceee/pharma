<template>
  <div v-if="currentPage === 'dashboard'">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Welcome to the Pharmaceutical Supply Chain Management System</p>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon blue">
          <Package class="stat-icon-svg" />
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalProducts }}</h3>
          <p>Total Products</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <Truck class="stat-icon-svg" />
        </div>
        <div class="stat-content">
          <h3>{{ stats.shippedProducts }}</h3>
          <p>Shipped Products</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon yellow">
          <AlertTriangle class="stat-icon-svg" />
        </div>
        <div class="stat-content">
          <h3>{{ stats.pendingShipments }}</h3>
          <p>Pending Shipments</p>
        </div>
      </div>
    </div>

    <div class="recent-activity">
      <div class="recent-activity-header">
        <h2>Recent Activity</h2>
      </div>
      <div class="recent-activity-body">
        <div v-for="activity in recentActivity" :key="activity.id" class="recent-activity-item">
          <div class="recent-activity-icon">
            <Package class="recent-activity-icon-svg" />
          </div>
          <div class="recent-activity-content">
            <p class="recent-activity-action">{{ activity.action }}</p>
            <p class="recent-activity-details">{{ activity.details }}</p>
          </div>
          <div class="recent-activity-time">{{ activity.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Package,
  Truck,
  AlertTriangle
} from 'lucide-vue-next'

import { ref } from 'vue'

const currentPage = ref('dashboard')

const stats = ref({
  totalProducts: 156,
  shippedProducts: 89,
  pendingShipments: 67
})

const recentActivity = ref([
  {
    id: 1,
    action: 'Product Created',
    details: 'Batch #PH2024001 - Paracetamol 500mg',
    time: '2 hours ago'
  },
  {
    id: 2,
    action: 'Product Shipped',
    details: 'Batch #PH2024002 shipped to MedDistrib Corp',
    time: '4 hours ago'
  },
  {
    id: 3,
    action: 'Temperature Alert',
    details: 'Batch #PH2024003 - Temperature exceeded threshold',
    time: '6 hours ago'
  }
])
</script>

<style scoped>

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
  background: rgba(255,255,255,0.85);
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

.recent-activity {
  border-radius: 0.5rem;
  border: 1px solid #00432a;
  background: rgba(255,255,255,0.9);
  box-shadow: 0px 1px 3px rgba(0,0,0,.08);
}

.recent-activity-header {
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.recent-activity-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.recent-activity-body {
  padding: 1rem 1.25rem;
}

.recent-activity-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.recent-activity-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ebf8ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recent-activity-icon-svg {
  width: 0.85rem;
  height: 0.85rem;
  color: #2563eb;
}

.recent-activity-content {
  flex: 1;
  margin-left: 0.75rem;
}

.recent-activity-action {
  font-size: 0.85rem;
  font-weight: 500;
  color: #111827;
}

.recent-activity-details {
  font-size: 0.85rem;
  color: #6b7280;
}

.recent-activity-time {
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
