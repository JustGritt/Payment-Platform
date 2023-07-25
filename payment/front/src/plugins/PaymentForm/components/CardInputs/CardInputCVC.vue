

<template>
    <div class="form-group">
        <label class="little-label">Card CvC
            <input :name="props.context.node.name" :id="props.context.node.context.id" :oninput="handleInput"
                :class="['form-control', (errorInput) ? 'error-payment-card' : '']" v-cardformat:formatCardCVC
                :data-error="(errorInput) ? true : false" :placeholder="props.context.attrs.placeholder"
                :type="props.context.attrs.type"></label>

    </div>
</template>

<script setup>
import { watch } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    context: Object,
})

const errorInput = computed(
    () => {
        switch (true) {
            case Object.prototype.hasOwnProperty.call(props.context.messages, 'rule_validateCardCVC'):
                return props.context.messages['rule_validateCardCVC'].value
            default:
                return props.context.messages['cardNumber.cvc:zod']?.value
        }
    }
)


function handleInput(val) {
    if (!val.attrs?.disabled) {
        props.context.node.input(parseInt(val.target.value))
    }
}

</script>

<style scoped>
input[data-error='true'] {
    border: 1px solid var(--red-light) !important;
    box-shadow: 0 0 5px var(--red-light) !important;
}
</style>