<template>
    <div class="flex flex-col items-center justify-center w-full h-screen overflow-y-auto bg-accent">

        <img src="/logo.png" alt="CQRITY CONNECT logo" class="w-96 h-auto object-contain" />

        <form class="space-y-4 bg-white p-6 rounded shadow-md w-96" @submit.prevent="onSubmit">

            <Input v-bind="emailAttrs" id="email" name="email" type="email" label="Email" placeholder="Enter your email"
                v-model="email" :errors="errors?.email" />

            <Input v-bind="passwordAttrs" id="password" name="password" type="password" label="Password"
                placeholder="Enter your password" v-model="password" :errors="errors?.password" />

                <Button class="ml-auto" text="Login" :is-submitting="isLoading" />

        </form>
    </div>
</template>

<script setup>
    import Button from '@/components/Button.vue';
    import Input from '@/components/Input.vue';

    import { loginSchema } from '@/modules/auth/schemas/loginSchema';
    import { login } from '@/modules/auth/services/authService';
    import { useRequest } from '@/composables/useRequest';

    import { useForm } from 'vee-validate';
    import { AxiosError } from 'axios';
    import router from '@/router';

    const { values, errors, setErrors, defineField, handleSubmit } = useForm({
        validationSchema: loginSchema,
        initialValues: {
            email: '',
            password: ''
        }
    });

    const [email, emailAttrs] = defineField('email');
    const [password, passwordAttrs] = defineField('password');

    const { execute, isLoading } = useRequest(
        async () => await login(values), {
        onSuccess: (response) => {
            localStorage.setItem('token', response);
            router.push({ name: 'users.home' });
        },
        onError: (requestError) => {
            if (requestError instanceof AxiosError) {
                if (requestError.response?.status === 422) {
                    setErrors(requestError?.response?.data?.errors);
                }
            } else {
                console.error(errors);
            }
        }
    });

    const onSubmit = handleSubmit(execute);
</script>