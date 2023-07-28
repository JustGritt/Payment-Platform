<script setup>
import OrderEntry from "@/components/dashboard/OrderEntry.vue";
import { performHttpCall, credentialsB64 } from "../utils/api";
import { ref, onMounted } from "vue";
import { useCartStore } from "@/store/cart";
import { useTransactionsStore } from "@/store/transactions";

const transactionStore = useTransactionsStore();


onMounted(() => {
    //transactionStore.getTransactions
})

// Simulate a database query
const orders = ref([])


</script>

<template>
    <section class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Commandes</h1>
                <p class="mt-2 text-sm text-gray-700">
                    Gérez vos commandes et vos retours.
                </p>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" class="py-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center">
                                    Client
                                </th>
                                <th scope="col" class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Montant
                                </th>
                                <th scope="col" class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Statut
                                </th>
                                <th scope="col" class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Date
                                </th>
                                <th scope="col" class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="order in orders" :key="order.product_name">
                                <OrderEntry :order="order" />
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>
</template>
