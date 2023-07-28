<script setup lang="ts">
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/vue";
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalRefundForm from "./components/ModalRefundForm.vue";
import { performHttpCall } from "./components/api";

const userNavigation = [
	{ name: "Refund",  },
];
const emit = defineEmits()

// const onSubmit = async (data) => {
// 	submitting.value = true
// 	try {
// 		const response = await performHttpCall(`/transactions/${transaction.value.transaction_id}/operation/pay`, 'POST', { ...data, amount: amount_value }, `Basic: ${credentialsB64}`)
// 		submitting.value = false
// 		if (response.confirmationUrl)
// 			location.replace(response.confirmationUrl)
// 	} catch (error) {
// 		if (Object.keys(error).includes('urlFailed')) {
// 			if (error.urlFailed) {
// 				location.replace(error.urlFailed)
// 			}
// 		}
// 		createToast(error.message, { type: 'danger', hideProgressBar: true })
// 		submitting.value = false
// 		throw new Error(error.message)
// 	}
// }
const { open, close } = useModal({
	component: ModalRefundForm,
	attrs: {
		amount: 100,
		item: {},
		onSubmit(formData) {
			alert(JSON.stringify(formData, null, 2))
			close()
		},
		close: () => {
			close()
		}
	},
})

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

	<td
		class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center relative flex justify-center">
		<Menu as="div" class="relative">
			<MenuButton class="flex items-center p-1.5">
				<a href="#" class="text-indigo-600 hover:text-indigo-900">
					Edit
				</a>
			</MenuButton>
			<transition enter-active-class="transition ease-out duration-100"
				enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
				leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
				leave-to-class="transform opacity-0 scale-95">
				<MenuItems
					class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
					<MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
					<VButton @click="open" :class="[
						active ? 'bg-gray-50' : '',
						'block w-full px-3 py-1 text-sm leading-6 text-gray-900',
					]">{{ item.name }}</VButton>
					</MenuItem>
				</MenuItems>
			</transition>
		</Menu>

	</td>
	<ModalsContainer />
</template>