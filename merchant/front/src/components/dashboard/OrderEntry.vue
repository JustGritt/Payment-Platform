<script setup>
import { defineProps } from "vue";
const { order } = defineProps(["order"]);
</script>

<template>
	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		<div class="flex items-center">
			<img class="h-11 w-11 rounded-full mr-2" :src="order.product_image" alt="Image du produit" />
			{{ order.product_name }}
		</div>
	</td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		{{ order.product_price }} {{ order.currency }}
	</td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		<span v-if="order.status === 'Completed'"
			class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
			{{ order.status }}
		</span>
		<span v-if="order.status === 'Pending'"
			class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500">
			{{ order.status }}
		</span>
		<span v-if="order.status === 'Failed'"
			class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-red-400 border border-red-100 dark:border-red-500">
			{{ order.status }}
		</span>

		<span v-if="order.status === 'Progress'"
			class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400">
			In Progress
		</span>
	</td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		{{ order.date }}
    </td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		<a href="#" class="text-indigo-600 hover:text-indigo-900">
			Edit
		</a>
	</td>
</template>