<script setup props="operation">
import { defineProps, computed } from 'vue';
import Mastercard from '@/assets/icons/Mastercard.vue';
import Visa from '@/assets/icons/Visa.vue';

const { operation } = defineProps(['operation']);
console.log(operation)
</script>

<template>
  <tr class="hover:bg-gray-50 hover:dark:bg-gray-700">
    <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">

      {{ operation.status }}
    </td>
    <td
      class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
      {{ operation.createdAt }}
    </td>
    <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
      {{ operation.amount }}
    </td>
    <td
      class="inline-flex items-center p-4 space-x-2 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
    >
    {{ operation.card_number }}
			<span v-if="paymentMethod === 'MasterCard'">
				<Mastercard class="w-6 h-6" />
			</span>

			<span v-if="paymentMethod === 'Visa'">
				<Visa class="w-6 h-6" />
			</span>
    </td>
  </tr>
</template>
