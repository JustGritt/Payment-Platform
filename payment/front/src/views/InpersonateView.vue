<template>
    <aside class="h-auto w-full overflow-scroll">
        <h1 class="sm:text-4xl text-center p-4">Select a User Account</h1>

        <div class="grid grid-cols-3 place-items-center px-4 justify-center gap-4">
        <!-- Use conditional rendering based on isLoading and error -->
        <template v-if="isLoading">
            <!-- Show loading spinner or some loading indicator -->
            <!-- You can customize this according to your UI design -->
            <p>Loading...</p>
        </template>

        <template v-else-if="error">
            <div class="rounded-md bg-red-50 p-4">
                <div class="flex">
                <div class="flex-shrink-0">
                    X

                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">There were 2 errors with your submission</h3>
                    <div class="mt-2 text-sm text-red-700">
                    <ul role="list" class="list-disc space-y-1 pl-5">
                        <li>Your password must be at least 8 characters</li>
                        <li>Your password must include at least one pro wrestling finishing move</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </template>

        <template v-else>
            <UserCards v-for="merchant in merchants" :key="merchant.id" :merchant="merchant" />
        </template>
        </div>
    </aside>
</template>

<script setup>
    import { ref } from 'vue';
    import UserCards from '@/components/components/UserCards.vue';
    import apiService from '../services/apiService';
    // Use ref to track the state
    const merchants = ref([]);
    const isLoading = ref(true);
    const error = ref(false);

    apiService.getAllMerchants()
    .then((response) => {
        isLoading.value = false;
        merchants.value = response;
    })
    .catch((error) => {
    if (error.response && error.response.status == 401) {
        error.value = true;
    } else {
        console.log(error);
    }
});
</script>
  