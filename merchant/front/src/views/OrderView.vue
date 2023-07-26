<script setup>
import OrderEntry from "@/components/dashboard/OrderEntry.vue";

// Simulate a database query
const orders = [
	{
		product_name: "Objet 1",
        product_price: "120",
		product_image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",

        currency: "€",
        status: "Pending",
        date: "2021-08-01",
	},
	{
		product_name: "Objet 2",
        product_price: "120",
		product_image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",

        currency: "€",
        status: "Failed",
        date: "2021-08-01",
	},
  // More orders...
];
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
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Nouvelle commande
                </button>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center">
                                    Nom du produit
                                </th>
                                <th scope="col"
                                    class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Prix
                                </th>
                                <th scope="col"
                                    class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Statut
                                </th>
                                <th scope="col"
                                    class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
                                    Date
                                </th>
                                <th scope="col"
                                    class="py-3 text-sm font-semibold text-gray-900 sm:pl-0">
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
