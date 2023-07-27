<template>
    <Modal @close="toggleModal" :modalActive="modalActive">
        <Form @close="toggleModal" :amount="amount" :currency="currency" :submitForm="onSubmit" :submitting="submitting" />
    </Modal>
    <slot :click="toggleModal"></slot>
</template>
  
<script setup>
import Modal from "./Modal.vue";
import Form from "./Form.vue";
import { ref, watch } from "vue";
import { performHttpCall } from "../utils/api";
import { createToast } from 'mosha-vue-toastify';
import router from "../../../router";
const { amount, currency } = defineProps(['amount', 'currency'])
if (!amount || !currency) throw new Error('amount is required')
const modalActive = ref(false);
const submitting = ref(false);
const transaction = ref(null);
const CLIENT_ID = localStorage.getItem('clientId');
const CLIENT_TOKEN = localStorage.getItem('clientToken');
const credentialsB64 = encodeToBase64(`${CLIENT_ID}:${CLIENT_TOKEN}`)
function encodeToBase64(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const base64Encoded = btoa(String.fromCharCode(...data));
    return base64Encoded;
}

const toggleModal = async () => {
    if (!modalActive.value) {
        if (!CLIENT_ID || !CLIENT_TOKEN) {
            const error = 'clientId or clientToken not found'
            createToast(error, { type: 'danger', hideProgressBar: true })
            throw new Error(error)
        }
        try {
            transaction.value = await performHttpCall('/transactions', 'POST', {
                amount,
                currency,
            }, `Basic: ${credentialsB64}`)
        } catch (error) {
            createToast(error.message, { type: 'danger', hideProgressBar: true })
            throw new Error(error.message)
        }
    }
    modalActive.value = !modalActive.value;
};

const onSubmit = async (data) => {
    submitting.value = true
    await setTimeout(async () => {
        try {
            const response = await performHttpCall(`/transactions/${transaction.value.transaction_id}/operation/pay`, 'POST', {
            }, `Basic: ${credentialsB64}`)
            submitting.value = false
            if (response.redirectUrlConfirmation)
                location.replace(response.redirectUrlConfirmation)
        } catch (error) {
            if (Object.keys(error).includes('urlFailed')) {
                if (error.urlFailed) {
                    location.replace(error.urlFailed)
                }
            }
            createToast(error.message, { type: 'danger', hideProgressBar: true })
            submitting.value = false
            throw new Error(error.message)
        }

    }, 520000)
}

</script>
  
<style lang="scss" scoped></style>