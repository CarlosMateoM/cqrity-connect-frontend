<template>
    <main class="flex flex-col items-center justify-center max-w-2xl mx-auto bg-gray-100 p-4 rounded-lg">

        <div class="w-full relative flex items-center justify-center">

            <RouterLink to="/home"
                class="absolute left-0 flex items-center gap-1 text-primary group hover:text-primary/80">
                <IconArrowBackUp class="w-6 h-6 inline-block group-hover:text-primary/80" />
                <span>Regresar</span>
            </RouterLink>


            <h1 class="text-3xl text-center">Historial</h1>


        </div>

        <div class="w-full flex justify-start gap-4 my-4">

            <Input v-model="accessLogsFilters.userName" @change="execute" type="text" id="search" name="search"
                placeholder="Buscar por nombre o fecha" />

            <Input v-model="accessLogsFilters.createdAt" @change="execute" type="date" id="search" name="search"
                placeholder="Buscar por nombre o fecha" />

        </div>

        <div v-if="isLoading" v-for="i in 10" class="w-full flex gap-8 border border-gray-200 p-2 mb-4 rounded animate-pulse">

            <div class="w-44 h-28 bg-gray-200   " >

            </div>

            <div class="flex-grow" >
                <div class="h-6 bg-gray-200 mb-2 rounded w-full"> 

                </div>
            </div>
        </div>

        <div v-else v-for="accessLog in accessLogs?.data" :key="accessLog.id"
            class="flex w-full gap-8 border border-gray-200 p-2">

            <img :src="accessLog.image" alt="imagen de ejemplo" class="w-44 h-auto rounded-lg " />

            <div>
                <span class="text-gray-600">Nombre: </span>
                <p class="text-xl mb-2 "> {{ accessLog?.user?.name }} </p>

                <span class="text-gray-600">Fecha de acceso:</span>
                <p class="text-xl"> {{ dateFormatter.format(new Date(accessLog.created_at)) }}</p>
            </div>
        </div>

        <Pagination v-if="accessLogs.meta" class="w-full" :meta="accessLogs?.meta" :links="accessLogs?.links"
            @prev="changeAccessLogPage" @next="changeAccessLogPage" />

    </main>
</template>

<script setup>
    import { useRequest } from '@/composables/useRequest';
    import { IconArrowBackUp } from '@tabler/icons-vue';
    import { useAccessLogStore } from '../stores/accessLogStore';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import { dateFormatter } from '@/utils/formatter';
    import Input from '@/components/Input.vue';
    import Pagination from '@/components/Pagination.vue';

    const accessLogStore = useAccessLogStore();

    const { accessLogs, accessLogsFilters } = storeToRefs(accessLogStore);

    const { searchAccessLog, addAccessLogOption, changeAccessLogPage } = accessLogStore;

    const { execute, isLoading } = useRequest(searchAccessLog);

    onMounted(() => {
        addAccessLogOption('include', 'user');
        execute();
    });
</script>