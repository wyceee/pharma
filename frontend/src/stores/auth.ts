import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const role = ref<string | null>(localStorage.getItem('role'));

    function setRole(newRole: string | null) {
        role.value = newRole;
        if (newRole) {
            localStorage.setItem('role', newRole);
        } else {
            localStorage.removeItem('role');
        }
    }

    return { role, setRole };
});