import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "@/components/Dashboard.vue";
import Product from "@/components/Product.vue";
import Shipment from "@/components/Shipment.vue";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { roles: ['Manufacturer', 'Distributor'] } },
    { path: '/product', name: 'Product', component: Product, meta: { roles: ['Manufacturer'] } },
    { path: '/shipment', name: 'Shipment', component: Shipment, meta: { roles: ['Distributor'] } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('role');

    if (to.name === 'Login' && role) {
        return next({ name: 'Dashboard' });
    }

    if (to.meta && to.meta.roles) {
        if (!role || !to.meta.roles.includes(role)) {
            if (role) {
                return next({ name: 'Dashboard' });
            } else {
                return next({ name: 'Home' });
            }
        }
    }
    next();
});

export default router;