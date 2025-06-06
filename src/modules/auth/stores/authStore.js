import { getUser } from "@/modules/auth/services/authService";
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {

    const user = ref(null);

    const isLoggedIn = computed(() => {
        return user.value !== null;
    });
 
    const setUser = (newUser) => {
        user.value = newUser;
    }

    const resetUser = () => {
        user.value = null;
    }

    const userHasRole = (role) => {
        if (!user.value || !user.value.roles) {
            return false;
        }
        return user.value.roles.some(r => r.name === role);
    }

    const fetchUser = async () => {
        try {
            const response = await getUser();
            setUser(response);
        } catch (error) {
            user.value = null;
        }
    }

    return {
        user,
        fetchUser,
        setUser,
        resetUser,
        userHasRole,
        isLoggedIn,
    };
});