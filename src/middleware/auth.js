import { useAuthStore } from "@/modules/auth/stores/authStore"; 

export const authenticatedUser = async (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
        await authStore.fetchUser();
    }

    if (authStore.isLoggedIn) {
        next();
    } else {
        next({ name: 'login' });
    }
}

export const guestUser = async (to, from, next) => {

    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
        await authStore.fetchUser();
    }

    if (!authStore.isLoggedIn) {
        next();
    } else {
        next({ name: 'vehicles' });
    }
}