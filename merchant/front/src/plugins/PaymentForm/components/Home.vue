<template>
    <Modal @close="toggleModal" :modalActive="modalActive">
        <Form @close="toggleModal" :amount="amount" />
    </Modal>
    <slot :click="toggleModal"></slot>
</template>
  
<script setup>
import Modal from "./Modal.vue";
import Form from "./Form.vue";
import { ref, defineProps, watch } from "vue";
import { createToast } from 'mosha-vue-toastify';

const { amount } = defineProps(['amount'])
if (!amount) throw new Error('amount is required')
const modalActive = ref(false);

const toggleModal = () => {
    const CLIENT_ID = localStorage.getItem('clientId');
    const CLIENT_TOKEN = localStorage.getItem('clientToken');
    if (!CLIENT_ID || !CLIENT_TOKEN) {
        const error = 'clientId or clientToken not found'
        createToast(error, { type: 'danger', hideProgressBar: true })
        throw new Error(error)
    }
    modalActive.value = !modalActive.value;
};

</script>
  
<style lang="scss" scoped></style>