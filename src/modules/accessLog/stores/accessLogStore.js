import { useSearchParams } from "@/composables/useQueryParams";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getAccessLogs } from "../services/accessLogService";

export const useAccessLogStore = defineStore("accessLog", () => {

    const accessLogs = ref([]);

    const accessLogsPage = ref([]);

    const accessLogsFilters = ref({
        userName: '',
        createdAt: '',
    });

    const isAccessLogsEmpty = computed(() => {
        return accessLogs.value === null || accessLogs.value.length === 0;
    });

    const setAccessLogs = (newAccessLogs) => {
        accessLogs.value = newAccessLogs;
    };

    const fetchAccessLogs = async () => {
        const response = await getAccessLogs(currentParamsAccessLog.value);
        setAccessLogs(response);
    }

    const {
        search: searchAccessLog,
        changePage: changeAccessLogPage,
        currentParams: currentParamsAccessLog,
        addOption: addAccessLogOption,
    } = useSearchParams(accessLogsPage, accessLogsFilters, fetchAccessLogs);

    return {
        accessLogs,
        setAccessLogs,
        isAccessLogsEmpty,
        
        accessLogsFilters,
        searchAccessLog,
        addAccessLogOption,
        changeAccessLogPage,
    }
});