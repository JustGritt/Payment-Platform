<script setup>
import TransactionEntry from "@/components/components/TransactionEntry.vue";
import { ref } from 'vue'
import apiService from '../services/apiService'

const kpis = ref([])

apiService.getAllKPIs()
    .then((response) => {
		console.log(response)
		kpis.value = response
    })
    .catch((error) => {
    if (error.response && error.response.status == 401) {
        error.value = true;
    } else {
        console.log(error);
    }});


// const searchData = ref('');

// // Define the searchHandler function to handle the search
// const searchHandler = (searchData) => {
// 	// Call the searchTransaction function
// 	searchTransaction(searchData);

// };

// // Create the registerMerchant function
// async function searchTransaction(searchData) {
//     try {

//         // Appelez la fonction d'enregistrement du marchand du service API en passant les données complètes
//         const response = await apiService.getSearchTransaction(searchData.value);
// 		console.log(response)

//         // Traitement des étapes suivantes après l'enregistrement réussi (par exemple, afficher un message de succès)
//     } catch (error) {
//         console.error(error);
//     }
// }

</script>

<template>
	<aside class="h-auto w-full overflow-scroll">
		<main class="py-6">
			<h3 class="font-blooming text-4xl leading-none px-9">Dashboard</h3>
			<div class="h-4"></div>

			<div v-if="transactionSearch">
				<h3>Transaction Details:</h3>
				<p>Transaction ID: {{ transactionSearch.transaction_history.transaction_id }}</p>
				<!-- Add more details as per your needs -->
			</div>

			<FormKit
				type="form"
				id="searchForm"
				:form-class="submitted ? 'hide' : 'show'"
				submit-label="search"
				@submit="searchHandler"
				:actions="false"
			>
				<FormKit
					type="search"
					placeholder="Search..."
					v-model="searchData"
					:input-class="{
						'shadow-sm': true,
						'bg-gray-50': true,
						'border': true,
						'border-gray-300': true,
						'text-gray-900': true,
						'sm:text-sm': true,
						'rounded-lg': true,
						'focus:ring-primary-500': true,
						'focus:border-primary-500': true,
						'block': true,
						'w-full': true,
						'p-2.5': true,
						'mt-2': true,
						'dark:bg-gray-700': true,
						'dark:border-gray-600': true,
						'dark:placeholder-gray-400': true,
						'dark:text-white': true,
						'dark:focus:ring-primary-500': true,
						'dark:focus:border-primary-500': true
					}"
				/>
			</FormKit>

			<section class="px-9 grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px]">
				<div class="p-5 w-fit bg-indigo-50 rounded-xl flex flex-col justify-between">
					<h3 class="font-blooming text-2xl leading-[.5]">Nombres commandes</h3>
					<h4 class="font-blooming text-4xl font-bold leading-none">{{ kpis.totalOrders }}</h4>
					<p class="text-md lowercase text-gray-400 leading-[.9]">
					</p>
				</div>
				<div class="p-5 w-fit bg-fuchsia-50 rounded-xl flex flex-col justify-between">
					<h3 class="font-blooming text-2xl leading-[.7]">Panier moyen</h3>
					<h4 class="font-blooming text-4xl font-bold leading-none">{{ kpis.averageOrderValue }} EUR</h4>
					<p class="text-md lowercase text-gray-400 leading-[.9]">

					</p>
				</div>
			</section>

			<h3 class="font-blooming text-4xl leading-none px-9 mt-6">Produits en vedette</h3>
			<section class="px-9 flex gap-4 max-w-[1200px] mt-4">
				<div
					class="p-3 transition-all w-fit bg-indigo-50 rounded-xl flex flex-row justify-between items-center gap-4 hover:bg-indigo-100">
					<img class="object-cover rounded-full h-10 w-10"
						src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
					<div>
						<h3 class="font-blooming text-xl leading-[.5]">Poulet</h3>
						<h4 class="font-blooming text-3xl font-bold leading-none">300 €</h4>
					</div>
				</div>
			</section>

			<section class="mt-7 px-9 max-w-[1200px]">
				<div
					class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
					<!-- Card header -->
					<div class="items-center justify-between lg:flex">
						<div class="mb-4 lg:mb-0">
							<h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
								Transactions
							</h3>
							<span class="text-base font-normal text-gray-500 dark:text-gray-400">Dernières transactions
								enregistrées</span>
						</div>
						<div class="items-center sm:flex">
							<div class="flex items-center">
								<button id="dropdownDefault" data-dropdown-toggle="dropdown"
									class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
									type="button">
									Filter par statut
									<i class="fas fa-chevron-circle-down ml-2"></i>
								</button>
								<!-- Dropdown menu -->
								<div id="dropdown" class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
									<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
										Category
									</h6>
									<ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
										<li class="flex items-center">
											<input id="apple" type="checkbox" value=""
												class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

											<label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
												Completed (56)
											</label>
										</li>

										<li class="flex items-center">
											<input id="fitbit" type="checkbox" value="" checked
												class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

											<label for="fitbit"
												class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
												Cancelled (56)
											</label>
										</li>

										<li class="flex items-center">
											<input id="dell" type="checkbox" value=""
												class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

											<label for="dell" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
												In progress (56)
											</label>
										</li>

										<li class="flex items-center">
											<input id="asus" type="checkbox" value="" checked
												class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

											<label for="asus" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
												In review (97)
											</label>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<!-- Table -->
					<div class="flex flex-col mt-6">
						<div class="overflow-x-auto rounded-lg">
							<div class="inline-block min-w-full align-middle">
								<div class="overflow-hidden shadow sm:rounded-lg">
									<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
										<thead class="bg-gray-50 dark:bg-gray-700">
											<tr>
												<th scope="col"
													class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
													Type de transaction
												</th>
												<th scope="col"
													class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
													Date
												</th>
												<th scope="col"
													class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
													Montant
												</th>
												<th scope="col"
													class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
													Réference
												</th>
												<th scope="col"
													class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
													Méthode de paiement
												</th>
												<th scope="col"
													class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
													Statut
												</th>
											</tr>
										</thead>
										<tbody class="bg-white dark:bg-gray-800">
											<!-- <TransactionEntry transactionType="Paiement" clientName="John Doe"
												transactionDate="20/04/2023" amount="1900€" referenceNumber="0047568936"
												paymentMethod="MasterCard" creditCardLastFourDigits="1234" status="Completed" />

											<TransactionEntry transactionType="Paiement" clientName="Jane Doe"
												transactionDate="20/04/2023" amount="290€" referenceNumber="0045568939"
												paymentMethod="MasterCard" creditCardLastFourDigits="1234" status="Pending" />

											<TransactionEntry transactionType="Remboursement" clientName="John Doe"
												transactionDate="20/04/2023" amount="-1900€" referenceNumber="0047568936"
												paymentMethod="Visa" creditCardLastFourDigits="1234" status="Failed" />

											<TransactionEntry transactionType="Remboursement" clientName="John Doe"
												transactionDate="20/04/2023" amount="-1900€" referenceNumber="0047568936"
												paymentMethod="Visa" creditCardLastFourDigits="1234" status="Progress" /> -->
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- Card Footer -->
					<div class="flex items-center justify-between pt-3 sm:pt-6">
						<div>
							<button
								class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
								type="button" data-dropdown-toggle="transactions-dropdown">
								7 derniers jours
								<i class="fas fa-caret-down ml-2 mt-1"></i>
							</button>
							<!-- Dropdown menu -->
							<div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
								id="transactions-dropdown">
								<div class="px-4 py-3" role="none">
									<p class="text-sm font-medium text-gray-900 truncate dark:text-white" role="none">
										Sep 16, 2021 - Sep 22, 2021
									</p>
								</div>
								<ul class="py-1" role="none">
									<li>
										<a href="#"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Yesterday</a>
									</li>
									<li>
										<a href="#"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Today</a>
									</li>
									<li>
										<a href="#"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Last 7 days</a>
									</li>
									<li>
										<a href="#"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Last 30 days</a>
									</li>
									<li>
										<a href="#"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Last 90 days</a>
									</li>
								</ul>
								<div class="py-1" role="none">
									<a href="#"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
										role="menuitem">Custom...</a>
								</div>
							</div>
						</div>
						<div class="flex-shrink-0">
							<a href="#"
								class="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
								Voir toutes les transactions
								<i class="fas fa-arrow-right ml-2"></i>
							</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	</aside>
</template>

<script>
import { getTagClass } from "@/lib/utils.js";
export default {
	methods: {
		getTagClass,
	},
};


</script>
