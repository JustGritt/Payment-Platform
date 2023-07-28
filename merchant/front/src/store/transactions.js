import { defineStore } from "pinia";
import { performHttpCall } from "../utils/api";

export const useTransactionsStore = defineStore("transactions", {
  state: () => ({
    requestTransactions: {
      loading: false,
      data: [],
      error: null,
    },
    requestTransactionRefund: {
      loading: false,
      error: null,
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
    async asyncTransactions() {
      commit("REQUEST_TRANSACTIONS");
      try {
        const response = await performHttpCall(`/transactions`, 'GET', null, `Basic: ${credentialsB64}`)
        commit("REQUEST_TRANSACTIONS_SUCCESS", response);
      } catch (error) {
        createToast(error.message, { type: 'danger', hideProgressBar: true })
        commit("REQUEST_TRANSACTIONS_ERROR", error.message);
        throw new Error(error.message)
      }
    },

    // refund request
    async requestRefund({ order: transaction }) {
      commit("REQUEST_TRANSACTION_REFUND");
      await setTimeout(async () => {
        try {
          const response = await performHttpCall(`/transactions/${transaction.transaction_id}/operation/refund`, 'POST', { ...transaction }, `Basic: ${credentialsB64}`)
          createToast('Refund successfully', { type: 'success', hideProgressBar: true })
          commit("REQUEST_TRANSACTION_REFUND_SUCCESS", response);
          close()
        } catch (error) {
          createToast(error.message, { type: 'danger', hideProgressBar: true })
          commit("REQUEST_TRANSACTION_REFUND_ERROR", error.message);
          throw new Error(error.message)
        }
      }, 8000)
    }

  },
  mutations: {
    REQUEST_TRANSACTIONS(state) {
      state.requestTransactions.loading = true
    },
    REQUEST_TRANSACTIONS_SUCCESS(state, payload) {
      state.requestTransactions.data = payload
      state.requestTransactions.loading = false
    },
    REQUEST_TRANSACTIONS_ERROR(state, payload) {
      state.requestTransactions.error = payload
      state.requestTransactions.loading = false
    },

    // refund request
    REQUEST_TRANSACTION_REFUND(state) {
      state.requestTransactionRefund.loading = true
    },
    REQUEST_TRANSACTION_REFUND_SUCCESS(state, payload) {
      state.requestTransactionRefund.data = payload
      state.requestTransactionRefund.loading = false
    },
    REQUEST_TRANSACTION_REFUND_ERROR(state, payload) {
      state.requestTransactionRefund.error = payload
      state.requestTransactionRefund.loading = false
    }
  },
});



