
<template>
  <aside class="w-full px-9 mt-8">
    <h3 class="font-blooming text-4xl leading-none">Transactions chart</h3>
    <section class="w-full">
      <!-- <apexchart
        width="500"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart> -->
    </section>

    <section
      class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 class="font-blooming text-4xl leading-none">Dernières Transactions</h3>

      <!-- Table -->
      <div class="flex flex-col mt-6">
        <div class="overflow-x-auto rounded-lg">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Référence
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Montant
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                    >
                      Méthode de paiement
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800">
                  <TransactionEntry v-for="transaction in transactions" :key="transaction.transaction_id" :transaction="transaction" />

                  <!-- <TransactionEntry
                    transactionType="Remboursement"
                    clientName="John Doe"
                    transactionDate="20/04/2023"
                    amount="-1900€"
                    referenceNumber="0047568936"
                    paymentMethod="Visa"
                    creditCardLastFourDigits="1234"
                    status="Failed"
                  />

                  <TransactionEntry
                    transactionType="Remboursement"
                    clientName="John Doe"
                    transactionDate="20/04/2023"
                    amount="-1900€"
                    referenceNumber="0047568936"
                    paymentMethod="Visa"
                    creditCardLastFourDigits="1234"
                    status="Progress"
                  /> -->
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
            type="button"
            data-dropdown-toggle="transactions-dropdown"
          >
            7 derniers jours
            <i class="fas fa-caret-down ml-2 mt-1"></i>
          </button>
          <!-- Dropdown menu -->
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="transactions-dropdown"
          >
            <div class="px-4 py-3" role="none">
              <p
                class="text-sm font-medium text-gray-900 truncate dark:text-white"
                role="none"
              >
                Sep 16, 2021 - Sep 22, 2021
              </p>
            </div>
            <ul class="py-1" role="none">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Yesterday</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Today</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Last 7 days</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Last 30 days</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  >Last 90 days</a
                >
              </li>
            </ul>
            <div class="py-1" role="none">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Custom...</a
              >
            </div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <a
            href="#"
            class="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            Voir toutes les transactions
            <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>

    </section>
  </aside>
</template>

<style></style>

<script setup>
import TransactionEntry from "@/components/components/TransactionEntry.vue";
import { ref, computed, onMounted } from 'vue'
import apiService from '../services/apiService'

const transactions = ref([])


apiService.getAllTransaction()
    .then((response) => {
      console.log(response)
      transactions.value = response
    })
    .catch((error) => {
    if (error.response && error.response.status == 401) {
        error.value = true;
    } else {
        console.log(error);
    }})


</script>
