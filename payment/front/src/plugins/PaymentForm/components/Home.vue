<template>
    <Modal @close="toggleModal" :modalActive="modalActive">
        <Form @close="toggleModal" />
    </Modal>
    <slot :click="toggleModal"></slot>
</template>
  
<script>
import Modal from "./Modal.vue";
import Form from "./Form.vue";
import { ref } from "vue";
export default {
    name: "Home",
    components: {
        Modal,
        Form
    },
    setup() {
        const modalActive = ref(false);

        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        };

        return { modalActive, toggleModal };
    },
};
</script>
  
<style lang="scss" scoped></style>