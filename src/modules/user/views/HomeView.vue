<template>
    <main class="flex flex-col items-center justify-center max-w-2xl mx-auto bg-gray-100 p-4 rounded-lg">

        <button @click="execute" class="flex items-center gap-1 text-primary group hover:text-primary/80 ml-auto">
            <IconLogout class="w-6 h-6 inline-block group-hover:text-primary/80" />
            <span>Salir</span>
        </button>


        <div class="flex items-center justify-center size-28 rounded-full bg-gray-200">
            <img v-if="user?.image" class="w-24 h-24 rounded-full object-cover" :src="user.image" alt="" srcset="">
            <IconUserFilled v-else class="w-24 h-24 text-secondary" />
        </div>

        <p class="mt-2 text-xl uppercase"> {{ user?.name }}</p>

        <div class="flex  items-center  gap-4 mt-4">

            <Button text="Solicitar acceso" :is-submitting="isLoading" @click="handleRequestAccess">
                <IconLockOpen class="w-6 h-6" />
            </Button>

            <RouterLink to="/history" class="  border-primary px-2 py-1.5 rounded-lg  text-sm text-primary ">
                <IconHistory class="w-6 h-6 inline-block mr-1" />
                Historial
            </RouterLink>

            <RouterLink v-if="userHasRole('admin')" to="/users"
                class="  border-primary px-2 py-1.5 rounded-lg  text-sm text-primary ">
                <IconUsers class="w-6 h-6 inline-block mr-1" />
                Usuarios
            </RouterLink>
        </div>
    </main>
</template>

<script setup>
    import Button from '@/components/Button.vue';
    import { useRequest } from '@/composables/useRequest';
    import { logout } from '@/modules/auth/services/authService';
    import { useAuthStore } from '@/modules/auth/stores/authStore';
    import { accessRequests } from '@/modules/requestAccess/services/requestAccessService';
    import router from '@/router';
    import { IconHistory, IconLockOpen, IconLogout, IconUserFilled, IconUsers } from '@tabler/icons-vue';
    import { storeToRefs } from 'pinia';
    import { useToast } from 'vue-toastification';

    const authStore = useAuthStore();
    const toast = useToast();

    const { user } = storeToRefs(authStore);

    const { resetUser, userHasRole } = authStore;


    const { execute } = useRequest(logout,
        {
            onSuccess: (response) => {
                resetUser();
                localStorage.removeItem('token');
                router.push({ name: 'login' });
            }
        }
    );

    const { execute: handleRequestAccess, isLoading } = useRequest(
        async () => await accessRequests({
            'method': 'APP',
            'uuid': user.value?.uuid
        }),
        {
            onSuccess: (response) => {

                toast.success("Solicitud de acceso en proceso");
            }
        }
    );


</script>