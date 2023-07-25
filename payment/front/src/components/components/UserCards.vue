<script setup>
import { defineProps } from "vue";
const { name, role } = defineProps(["name", "role"]);

import { impersonate, updateTokenJWT } from "@/contexts/User.js";

async function impersonateUser() {
    // Call the impersonate function to update the userState in the context
    impersonate(name, role);

    // Prepare the updated user profile data to pass to updateTokenJWT
    const userProfileData = {
        user: name,
        role: role,
    };

    console.log(userProfileData);

    // Create a new JWT token with the updated user profile data
    const token = await updateTokenJWT(userProfileData);
}
</script>

<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pt-6 pb-10">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Image de profil"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ name }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ role }}</span>

            <div class="flex mt-6 space-x-3 md:mt-6">
                <button
                    @click="impersonateUser"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Impersonate
                </button>
            </div>
        </div>
    </div>
</template>

