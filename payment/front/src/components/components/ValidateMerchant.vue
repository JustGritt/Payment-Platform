Copy code
<script setup props="merchant, onMerchantAccepted">
  // Import defineProps and defineEmits from 'vue' in script setup
  import { defineProps, defineEmits } from 'vue';
  import apiService from '../../services/apiService';
  import router from '../../router';

  // Define the emitted event name
  const { merchant } = defineProps(['merchant']);
  const handleAccept = (data) => {
    apiService.validateMerchant(data)
      .then((response) => {
        if (response) {
            router.push({name: "home"})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col items-center pt-6 pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="" alt="Merchant image" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ merchant.name }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ merchant.role }}</span>
        <!-- Add more properties from the merchant object as needed -->
        <div class="flex mt-6 space-x-3 md:mt-6">
            <button
            @click="handleAccept(merchant)"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
        </div>

        </div>
    </div>
</template>