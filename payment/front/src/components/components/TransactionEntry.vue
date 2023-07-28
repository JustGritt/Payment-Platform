<script setup props="transaction">
import { defineProps, computed } from 'vue';

import { userState } from '@/contexts/User'
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : userState;

import Mastercard from '@/assets/icons/Mastercard.vue';
import Visa from '@/assets/icons/Visa.vue';

const { transaction } = defineProps(['transaction']);
const date = new Date(transaction.transaction_date);
// Convert to a friendly format (e.g. 2021-10-01)
const friendlyDate = computed(() => {
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  return `${day}/${month}/${date.getFullYear()}`;
});
console.log(friendlyDate);
</script>

<template>
  <tr class="hover:bg-gray-50 hover:dark:bg-gray-700">
    <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">

      <span class="font-semibold" v-if="user.role === 'admin'">{{ transaction.merchant_id }}</span>
      <span class="font-semibold" v-else>{{ transaction.client_id.email }}</span>
    </td>
    <td
      class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
      {{ friendlyDate }}
    </td>
    <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
      {{ transaction.transaction_amount }}
    </td>
    <td
      class="inline-flex items-center p-4 space-x-2 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
			<span v-if="paymentMethod === 'MasterCard'">
				<Mastercard class="w-6 h-6" />
			</span>

			<span v-if="paymentMethod === 'Visa'">
				<Visa class="w-6 h-6" />
			</span>
    </td>
  </tr>
</template>
