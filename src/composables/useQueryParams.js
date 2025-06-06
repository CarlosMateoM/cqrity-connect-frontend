import { computed, ref } from "vue";
import { debounceWithLoading } from "@/utils/debounce";

export const useSearchParams = (page, filters, callback, debounceDelay = 1000) => {

    const options = ref({})

    const addOption = (key, value) => {
        options.value[key] = value;
    }

    const removeOption = (key) => {
        delete options.value[key];
    }

    const setOptions = (newOptions) => {

        if (typeof newOptions === 'function') {
            options.value = newOptions(options.value);
            return;
        }
        options.value = newOptions;
    }

    const currentParams = computed(() => {

        const params = new URLSearchParams();

        params.append('page', page.value);

        for (const key in options.value) {
            if (options.value[key]) {
                params.append(key, options.value[key]);
            }
        }

        for (const key in filters.value) {
            if (filters.value[key]) {
                params.append(`filter[${key}]`, filters.value[key]);
            }
        }

        return params;
    });

    const search = debounceWithLoading(async () => {
        page.value = 1;
        await callback();
    }, debounceDelay);


    const resetQueryParams = () => {
        for (const key in filters.value) {
            filters.value[key] = '';
        }
    }

    const changePage = async (_URL) => {
        if (!_URL) return;
        const parsedURL = new URL(_URL);
        page.value = parsedURL.searchParams.get('page') || 1;
        await callback();
    };

    return {
        search,
        currentParams,

        setOptions,
        addOption,
        removeOption,
        changePage,

        resetQueryParams,
    };
}
