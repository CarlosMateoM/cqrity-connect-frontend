export const debounce = (func, delay, { leading } = {}) => {
    let timerId
    let shouldInvoke

    return (...args) => {
        shouldInvoke = true

        if (!timerId && leading) {
            func(...args)
            shouldInvoke = false
        }
        clearTimeout(timerId)

        timerId = setTimeout(() => shouldInvoke && func(...args), delay)
    }
}

export const debounceWithLoading = (func, delay) => {
    let timerId;

    return async (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        return new Promise((resolve, reject) => {
            timerId = setTimeout(async () => {
                try {
                    const result = await func(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}