<script setup >
import { reactive, computed } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { useTransactionsStore } from "@/store/transactions";

const props = defineProps({
    order: {
        type: Object,
        default: 0
    },
    close: {
        type: Function
    }
})


const transactionStore = useTransactionsStore();
const requestTransactionRefund = computed(() => transactionStore.requestTransactionRefund);
const requestTransaction = computed(() => transactionStore.requestTransaction);

const emit = defineEmits()

const amount = reactive({
    count: props.order.transaction_amount,
})

const onUpdate = (newValue, oldValue) => {
    amount.count = newValue
}

//emit('submit', formData)"
</script>
<template>
    <VueFinalModal class="flex justify-center items-center"
        content-class="relative p-4 rounded-lg bg-white dark:bg-gray-900" content-transition="vfm-fade"
        overlay-transition="vfm-fade">
        <div class="w-[400px]">
            <div class="justify-between flex">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Refund</h1>
                <img class="w-20" src="@/assets/strapouz.svg" />
            </div>
            <div class="w-full mt-3 bg-gray-100 p-4 rounded-md">
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <div class="w-10 h-10 ">
                            <img src="@/assets/profil-ico.png" alt="" class="object-fill object-center" />
                        </div>
                        <div class="flex justify-center flex-col ml-3">
                            <h3 class="font-semibold text-gray-900 sm:pl-0 leading-[1rem]">Account</h3>
                            <p class="leading-[1rem] text-gray-500 text-sm truncate w-[10rem]">{{ props.order?.client?.email
                            }}</p>
                        </div>
                    </div>
                    <div class="mt-1">
                        <p class="leading-[1rem] text-sm">12 jan 2023</p>
                    </div>
                </div>
                <h3 class="my-3 font-semibold text-gray-900 sm:pl-0 text-xl text-center">{{ props.order.transaction_amount
                }} €</h3>
                <div class="flex justify-between items-center">
                    <span
                        class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500">Montant
                        restant
                        - {{ (props.order.transaction_amount - amount.count) }} €</span>
                    <p class="leading-[1rem] text-gray-500 text-[0.75rem] text-end italic">Éffectuer avec la carte 4453</p>
                </div>
            </div>

            <p class="mt-1 text-sm text-gray-700">
                Saisissez le montant du remborsement
            </p>

            <div class="flex justify-center my-2">
                <vue-number-input :min=0 :max="props.order.transaction_amount" @update:model-value="onUpdate"
                    :model-value="amount.count" :change="onChange" inline center controls></vue-number-input>
            </div>

            <div class="flex justify-end gap-x-2">
                <button
                    :disabled="requestTransactionRefund.loading"
                    class="bg-[#CCE4FE] text-[#1A4C9F] hover:bg-[#deebff] group flex gap-x-3 rounded-md px-4 py-2 text-sm leading-6 font-semibold"
                    :onclick="() => emit('submit', { order })">
                    {{ requestTransactionRefund.loading ? 'Processing...' : 'Refund' }}
                </button>
                <button v-if="!requestTransactionRefund.loading"
                    class="bg-[#FFFFFF] border border-[#d9d9d9] text-black hover:border-black group flex gap-x-3 rounded-md px-4 py-2 text-sm leading-6 font-semibold"
                    :onClick="close">
                    Cancel
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>
