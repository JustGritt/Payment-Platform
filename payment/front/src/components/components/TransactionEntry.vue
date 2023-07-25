<script setup>
import { defineProps } from 'vue';

// Import the mastercard icon from the icons folder
import Mastercard from '@/assets/icons/Mastercard.vue';
import Visa from '@/assets/icons/Visa.vue';


const { transactionType, clientName, transactionDate, amount, referenceNumber, paymentMethod, creditCardLastFourDigits, status } = defineProps([
	'transactionType',
	'clientName',
  'transactionDate',
  'amount',
  'referenceNumber',
  'paymentMethod',
	'creditCardLastFourDigits',
  'status',
]);
</script>

<template>
  <tr class="hover:bg-gray-50 hover:dark:bg-gray-700">
    <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
      {{ transactionType }} par <span class="font-semibold">{{ clientName }}</span>
    </td>
    <td
      class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
      {{ transactionDate }}
    </td>
    <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
      {{ amount }}
    </td>
    <td
      class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
      {{ referenceNumber }}
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

      <span>••• {{ creditCardLastFourDigits }}</span>
    </td>
    <td class="p-4 whitespace-nowrap">
      <span v-if="status === 'Completed'"
        class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
				{{ status }}
			</span>
			<span v-if="status === 'Pending'"
				class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500">
				{{ status }}
			</span>
			<span v-if="status === 'Failed'"
				class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-red-400 border border-red-100 dark:border-red-500">
				{{ status }}
			</span>

			<span v-if="status === 'Progress'"
				class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400">
				In Progress
			</span>
    </td>
  </tr>
</template>
