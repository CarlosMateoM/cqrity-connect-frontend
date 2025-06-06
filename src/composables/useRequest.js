import { ref } from "vue";

export const useRequest = (callback, hooks = {}) => {

    const errors = ref({});
    const isLoading = ref(false);

    const clearErrors = (error) => {
        errors.value[error] = null;
    }

    const resetErrors = () => {
        errors.value = {};
    }

    const execute = async () => {

        const _hooks = {
            onBefore: async () => {
                await hooks.onBefore?.();
            },
            onSuccess: async (response) => {
                resetErrors();

                await hooks.onSuccess?.(response);
            },
            onError: async (error) => {

                if (error.status === 422) {
                    errors.value = error.response.data.errors;
                }

                await hooks.onError?.(error);
            },
            onFinish: async () => {

                await hooks.onFinish?.();
            },
        }

        await _hooks.onBefore();

        try {
            isLoading.value = true;
            const response = await callback();
            await _hooks.onSuccess(response);
        } catch (error) {
            await _hooks.onError(error);
        } finally {
            isLoading.value = false;
            await _hooks.onFinish();
        }
    }

    return {
        isLoading,
        errors,
        execute,
        clearErrors,
    }
}