import { useSearchParams } from "@/composables/useQueryParams";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getUsers } from "../services/userService";

export const useUserStore = defineStore("user", () => {

    const users = ref(null);

    const usersPage = ref(1);

    const usersFilters = ref({
        name: '',
        email: '',
    });

    const setUsers = (newUser) => {
        users.value = newUser;
    };

    const fetchUsers = async () => {
        const response = await getUsers(usersCurrentParams.value);
        setUsers(response);
    }

    const {
        search: searchUsers,
        changePage: changeUsersPage,
        currentParams: usersCurrentParams,
        addOption: addUserOption,
        removeOption: removeUserOption,
        setOptions: setUserOptions,
    } = useSearchParams(usersPage, usersFilters, fetchUsers)

    return {
        users,
        setUsers,
        usersPage,
        usersFilters,
        searchUsers,
        changeUsersPage,
        addUserOption
    };
});