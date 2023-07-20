<template>
  <aside class="h-full w-full">
    <main class="py-6">
      <h3 class="font-blooming text-4xl leading-none px-9">Dashboard</h3>
      <div class="h-4"></div>

      <section class="px-9 grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px]">
        <div class="p-5 w-fit bg-indigo-50 rounded-xl flex flex-col justify-between">
          <h3 class="font-blooming text-2xl leading-[.5]">Revenues</h3>
          <h4 class="font-blooming text-4xl font-bold leading-none">32400 €</h4>
          <p class=" text-md lowercase text-gray-400 leading-[.9]">3.5% better than the past month</p>
        </div>
        <div class="p-5 w-fit bg-fuchsia-50  rounded-xl flex flex-col justify-between">
          <h3 class="font-blooming text-2xl leading-[.7]">Nombres de commandes</h3>
          <h4 class="font-blooming text-4xl font-bold leading-none">12</h4>
          <p class="text-md lowercase text-gray-400 leading-[.9]">1.5% better than the past month</p>
        </div>
        <div class="p-5 w-fit bg-rose-50 rounded-xl flex flex-col justify-between">
          <h3 class="font-blooming text-2xl leading-[.7]">Nombres de visites</h3>
          <h4 class="font-blooming text-4xl font-bold leading-none">2003</h4>
          <p class="text-md lowercase text-gray-400 leading-[.9]">5.5% better than the past month</p>
        </div>
      </section>

      <h3 class="font-blooming text-4xl leading-none px-9 mt-6">Produits en vedette</h3>
      <section class="px-9 flex gap-4 max-w-[1200px] mt-4">
        <div
          class="p-3 transition-all w-fit bg-indigo-50 rounded-xl flex flex-row justify-between items-center gap-4 hover:bg-indigo-100">
          <img class=" object-cover rounded-full h-10 w-10"
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" />
          <div>
            <h3 class="font-blooming text-xl leading-[.5]">Poulet</h3>
            <h4 class="font-blooming text-3xl font-bold leading-none">300 €</h4>
          </div>
        </div>

      </section>

      <section class="mt-7 px-9 max-w-[1200px]">
        <h3 class="font-blooming text-4xl leading-none">Dernières Transactions</h3>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-2 py-4 font-blooming leading-[.6] text-2xl">Name</th>
                      <th scope="col" class="px-2 py-4 font-blooming leading-[.6] text-2xl">Status</th>
                      <th scope="col" class="px-2 py-4 font-blooming leading-[.6] text-2xl">Date</th>
                      <th scope="col" class="px-2 py-4 font-blooming text-2xl leading-[.6]">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td class="whitespace-nowrap px-2 py-4 font-medium">Mark Bernard</td>
                      <td class="whitespace-nowrap px-2 py-4">
                        <div :class="getTagClass('success').class">
                          {{ getTagClass('success').title }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-2 py-4">12/10/2022</td>
                      <td class="font-blooming text-2xl font-bold leading-none px-2">120 €</td>
                    </tr>
                    <tr class="transition duration-300 ease-in-out hover:bg-neutral-100  dark:hover:bg-neutral-600">
                      <td class="whitespace-nowrap px-2 py-4 font-medium">Jacob doe</td>
                      <td class="whitespace-nowrap px-2 py-4">
                        <div :class="getTagClass('processing').class">
                          {{ getTagClass('processing').title }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-2 py-4">12/10/2022</td>
                      <td class="font-blooming text-2xl font-bold leading-none px-2">120 €</td>
                    </tr>
                    <tr class="transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-600">
                      <td class="whitespace-nowrap px-2 py-4 font-medium">Martin Doe</td>
                      <td class="whitespace-nowrap px-2 py-4 font-medium">
                        <div :class="getTagClass('error').class">
                          {{ getTagClass('error').title }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-2 py-4">12/10/2022</td>
                      <td class="font-blooming text-2xl font-bold leading-none px-2">120 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <payment-form>
        <template #title>
          Matt Maribojoc
        </template>
      </payment-form>

    </main>
  </aside>
</template>


<script>
import { getTagClass } from '@/lib/utils.js'
export default {
  methods: {
    getTagClass,
  }
};
</script>