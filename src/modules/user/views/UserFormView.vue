<template>
    <main class="flex flex-col items-center justify-center max-w-2xl mx-auto bg-gray-100 p-4 rounded-lg mb-16 ">

        <div class="w-full relative flex items-center justify-center mt-4">
            <RouterLink to="/users"
                class="absolute left-0 flex items-center gap-1 text-primary group hover:text-primary/80">
                <IconArrowBackUp class="w-6 h-6 inline-block group-hover:text-primary/80" />
                <span>Regresar</span>
            </RouterLink>
        </div>
        <form class="flex flex-col space-y-4 " @submit.prevent="onSbumit">


            <div class="relative mx-auto flex items-center justify-center size-28 rounded-full bg-gray-200 mb-8">
                <div v-if="imagePreview">
                    <img class="w-24 h-24 rounded-full object-cover" :src="imagePreview" alt="" srcset="">
                    <IconX class="absolute right-1 w-6 h-6 text-primary cursor-pointer" @click="removeImage" />
                </div>
                <div v-else>
                    <IconUserFilled class="w-24 h-24 text-secondary" />
                    <IconUpload class="absolute right-1 w-6 h-6 text-primary cursor-pointer" @click="openFileManager" />
                </div>
            </div>

            <input type="file" name="image-uploader" id="image-uploader" @change="handleFileUpload" class="hidden" />

            <Input v-model="name" v-bind="nameAttrs" type="text" id="name" name="name" placeholder="Nombre completo"
                :errors="errors?.name" />

            <Input v-model="email" v-bind="emailAttrs" type="email" id="email" name="email"
                placeholder="Correo electrónico" :errors="errors?.email" />
            <Input v-model="uuid" v-bind="uuidAttrs" :is-readonly="true" type="text" id="uuid" name="uuid"
                placeholder="UUID del dispositivo RFID" :errors="errors?.uuid" />

            <Input v-model="password" v-bind="passwordAttrs" type="password" id="password" name="password"
                placeholder="Contraseña" :errors="errors?.password" />

            <Input v-model="passwordConfirmation" v-bind="passwordConfirmationAttrs" type="password"
                id="password_confirmation" name="password_confirmation" placeholder="Confirmar contraseña"
                :errors="errors?.password_confirmation" />

            <div>
                <select v-model="role" v-bind="roleAttrs" name="user-rol" id="user-rol"
                    class="w-full p-2 border text-gray-800 border-gray-300 rounded-lg outline-0">
                    <option value="">Seleccionar rol</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
                <Error :errors="errors?.role" />
            </div>

            <label for="is-user-active">
                <input type="checkbox" name="is-user-active" id="is-user-active" v-model="isActive" value="1"
                    v-bind="isActiveAttrs" class="mr-2" />
                <span class="ml-1">Usuario activo</span>
            </label>

            <Button class="ml-auto" text="Guardar" :is-submitting="isLoading" />
        </form>

    </main>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { echo } from '@/libs/echo';
    import { useForm } from 'vee-validate';
    import Input from '@/components/Input.vue';
    import { updateUserSchema, userSchema } from '../schemas/userSchema';
    import { IconArrowBackUp, IconUpload, IconUserFilled, IconX } from '@tabler/icons-vue';
    import Button from '@/components/Button.vue';
    import { useRequest } from '@/composables/useRequest';
    import Error from '@/components/Error.vue';
    import { createUser, getUser, updateUser } from '../services/userService';
    import { useToast } from 'vue-toastification';
    import { useRoute } from 'vue-router';

    const toast = useToast();
    const route = useRoute();

    const imagePreview = ref(null);

    const { values, errors, resetForm, setErrors, setFieldValue, defineField, handleSubmit } = useForm({
        validationSchema: route.name === 'users.create' ? userSchema : updateUserSchema,
        initialValues: {
            name: '',
            email: '',
            uuid: '',
            role: '',
            isActive: true,
        }
    });

    const [isActive, isActiveAttrs] = defineField('isActive');
    const [image, imageAttrs] = defineField('image');
    const [name, nameAttrs] = defineField('name');
    const [email, emailAttrs] = defineField('email');
    const [uuid, uuidAttrs] = defineField('uuid');
    const [role, roleAttrs] = defineField('role');
    const [password, passwordAttrs] = defineField('password');
    const [passwordConfirmation, passwordConfirmationAttrs] = defineField('password_confirmation');

    const removeImage = () => {
        setFieldValue('image', null);
        imagePreview.value = null;

        const fileInput = document.getElementById('image-uploader');

        if (fileInput) {
            fileInput.value = '';
        }
    }

    const openFileManager = () => {
        const fileInput = document.getElementById('image-uploader');

        if (fileInput) {
            fileInput.click();
        }
    }

    const handleFileUpload = (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        setFieldValue('image', file);

        const reader = new FileReader();

        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    const { execute, isLoading } = useRequest(
        async () => {

            const isActiveValue = values.isActive;
            setFieldValue('isActive', isActiveValue  ? 1 : 0);

            if (route.name === 'users.edit') {
                const response = await updateUser(route.params.id, values);
                setFieldValue('isActive', isActiveValue);
                return response;
            }
            
            const response = await createUser(values);
            setFieldValue('isActive', isActiveValue);

        },
        {
            onSuccess: (response) => {
            
                if (route.name === 'users.edit') {
                    toast.success('Usuario actualizado exitosamente');
                    return;
                }
        
                resetForm();
                removeImage();
                toast.success('Usuario creado exitosamente');
            },
            onError: (requestError) => {
                if (requestError.response?.status === 422) {
                    setErrors(requestError.response.data.errors);
                } else {
                    console.error(requestError);
                }
            }
        }
    );

    const onSbumit = handleSubmit(execute);

    onMounted(async () => {

        if (route.name === 'users.edit') {

            const response = await getUser(route.params.id);

            setFieldValue('name', response.data.name);
            setFieldValue('email', response.data.email);
            setFieldValue('uuid', response.data.uuid);
            setFieldValue('role', response.data.roles[0]);
            setFieldValue('isActive', response.data.isActive === 1)

            if (response.data.image) {
                imagePreview.value = response.data.image;
            }

        }


        echo.private('rfid.register')
            .listen('.uuid.read', (event) => {
                setFieldValue('uuid', event.uuid);
            });
    });
</script>