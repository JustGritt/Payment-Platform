<script setup>
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/vue";
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalRefundForm from "./components/ModalRefundForm.vue";
import { performHttpCall, credentialsB64 } from "../../utils/api";
import { ref, computed } from "vue";
import { createToast } from 'mosha-vue-toastify';
import { useTransactionsStore } from "@/store/transactions";

const transactionStore = useTransactionsStore();
const transactions = computed(() => transactionStore.requestTransaction);




const userNavigation = [
	{ name: "Refund", },
];


const formatDate = (dateString) => {
	const date = new Date(dateString);
	// Then specify how you want your dates to be formatted
	return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(date);
}

const { order } = defineProps(["order"]);

const { open, close } = useModal({
	component: ModalRefundForm,
	attrs: {
		order: order,
		async onSubmit(order) {
			transactionStore.requestRefund(order);
			close()
		},
		close: () => {
			close()
		}
	},
})

</script>

<template>
	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		<div class="flex items-center justify-center">
			{{ order.client ? order.client.email : 'Anonymous' }}
		</div>
	</td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		{{ order.transaction_amount }} {{ order.currency.name === "EUR" ? "€" : "" }}
	</td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		<span v-if="order.transaction_state.name === 'completed'"
			class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
			Completed
		</span>
		<span v-if="order.transaction_state.name === 'pending'"
			class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500">
			En attente
		</span>
		<span v-if="order.transaction_state.name === 'partial-refund'"
			class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500">
			Partial refunded
		</span>

		<span v-if="order.transaction_state.name === 'full-refund'"
			class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500">
			Full refunded
		</span>

		<span v-if="order.transaction_state.name === 'cancelled'"
			class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-red-400 border border-red-100 dark:border-red-500">
			Cancelled
		</span>

		<span v-if="order.transaction_state.name === 'capture'"
			class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400">
			Intent
		</span>
	</td>

	<td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400 text-center">
		{{ formatDate(order.createdAt) }}
	</td>

	<td v-if="order.transaction_state.name === 'completed'"
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