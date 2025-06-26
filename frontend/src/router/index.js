import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "@/components/Dashboard.vue";
import Product from "@/components/Product.vue";
import Shipment from "@/components/Shipment.vue";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/product', name: 'Product', component: Product },
    { path: '/shipment', name: 'Shipment', component: Shipment },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;