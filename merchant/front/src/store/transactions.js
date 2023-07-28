import { defineStore } from "pinia";
import { performHttpCall, credentialsB64 } from "../utils/api";
import { createToast } from 'mosha-vue-toastify';
export const useTransactionsStore = defineStore("transactions", {
  state: () => ({
    requestTransaction: {
      loading: false,
      data: [],
      error: null,
    },
    requestTransactionRefund: {
      loading: false,
      error: null,
      data: null,
    },
  }),
  getters: {
    getTransactions() {
      return this.requestTransactions;
    },
    getTransactionRefund() {
      return this.requestTransactionRefund;
    },
  },
  actions: {
    async requestTransactions() {
      this.requestTransaction.loading = true
      try {
        const response = await performHttpCall(`/transactions`, 'GET', null, `Basic: ${credentialsB64}`)
        this.requestTransaction.data = response
      } catch (error) {
        createToast(error.message, { type: 'danger', hideProgressBar: true })
        this.requestTransaction.error = error
        throw new Error(error.message)
      }
    },

    // refund request
    async requestRefund({ order }) {
      this.requestTransactionRefund.loading = true
      await setTimeout(async () => {
        try {
          const response = await performHttpCall(`/transactions/${order.transaction_id}/operation/refund`, 'POST', { ...order }, `Basic: ${credentialsB64}`)
          createToast('Refund successfully', { type: 'success', hideProgressBar: true })
          this.requestTransactionRefund.data = response
          this.requestTransactionRefund.loading = false
          this.requestTransactionRefund.data = this.requestTransaction.data.map(transaction => {
            if (transaction.transaction_id === order.transaction_id) {
              transaction.transaction_state = { name: order.transaction_amount > 0 ? 'partial-refund' : 'full-refund' }
            }
          })
        } catch (error) {
          createToast(error.message, { type: 'danger', hideProgressBar: true })
          this.requestTransactionRefund.error = error
          throw new Error(error.message)
        }
      }, 1000)
    }

  },

});



