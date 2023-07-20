
<template>
  <aside class="w-full px-9 mt-8">
    <h3 class="font-blooming text-4xl leading-none ">Transactions chart</h3>
    <section class="w-full">
      <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
    </section>

    <section class="mt-7 max-w-[1200px]">
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
  </aside>
</template>

<style></style>

<script>
import { getTagClass } from '@/lib/utils.js'
export default {
  data: function () {
    return {
      chartOptions: {
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        stroke: {
              curve: 'smooth'
            },
        zoom: {
          enabled: true
        },
        chart: {
          id: "vuechart-example",
          type: 'area',
          height: 350,
        },
      },

      series: [{
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 170, 190],
      }],


    };
  },
  methods:{
    getTagClass,
  }
};
</script>