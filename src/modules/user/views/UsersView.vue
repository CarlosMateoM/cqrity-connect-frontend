<template>
    <main class="flex flex-col items-center justify-center max-w-2xl mx-auto bg-gray-100 p-4 rounded-lg">

        <div class="w-full relative flex items-center justify-center">

            <RouterLink to="/home"
                class="absolute left-0 flex items-center gap-1 text-primary group hover:text-primary/80">
                <IconArrowBackUp class="w-6 h-6 inline-block group-hover:text-primary/80" />
                <span>Regresar</span>
            </RouterLink>


            <h1 class="text-3xl text-center">Usuarios</h1>


        </div>

        <div class="w-full flex justify-between gap-4 my-4">

            <Input v-model="usersFilters.name" @change="execute" type="text" id="search" name="search"
                placeholder="Buscar por nombre" />

            <RouterLink to="/users/nuevo" class="  flex items-center gap-1 text-primary group hover:text-primary/80">
                <IconUserPlus class="w-6 h-6 inline-block group-hover:text-primary/80" />
                <span>Nuevo</span>
            </RouterLink>


        </div>

        <div v-for="user in users?.data" :key="user.id" class="flex w-full gap-8 border border-gray-200 p-2">

            <img :src="user.image" alt="imagen de ejemplo" class="w-44 h-34 object-cover rounded-lg " />

            <div>
                <span class="text-gray-600 ">Nombre: </span>
                <p class="text-xl "> {{ user?.name }} </p>
                <RouterLink :to="`/users/${user.id}/edit`"
                    class="mt-2 flex items-center text-primary hover:text-primary/80 text-sm self-center">
                    <IconUserEdit class="w-6 h-6 inline-block mr-1" />
                    Editar
                </RouterLink>
            </div>

        </div>

        <Pagination v-if="users?.meta" class="w-full" :meta="users?.meta" :links="users?.links" @prev="changeUsersPage"
            @next="changeUsersPage" />
    </main>
</template>

<script setup>

    import { useRequest } from '@/composables/useRequest';
    import Pagination from '@/components/Pagination.vue';
    import { useUserStore } from '../stores/userStore';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import { IconArrowBackUp, IconEdit, IconUserEdit, IconUserPlus } from '@tabler/icons-vue';
    import Input from '@/components/Input.vue';


    const userStore = useUserStore();

    const { users, usersFilters } = storeToRefs(userStore);

    const { searchUsers, changeUsersPage } = userStore;


    const { execute, isLoading } = useRequest(searchUsers);


    onMounted(() => {
        execute();
    });
</script>