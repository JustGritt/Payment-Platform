<script setup>
import { ref } from 'vue'
const props = defineProps({
    context: Object,
})

const selected = ref(props.context.node.value)

function handleInput(val) {
    if (!val.attrs?.disabled) {
        selected.value = val.value
        props.context.node.input(val.value)
    }
}

</script>

<template>
    <div v-for="item in props.context.attrs.options" :disabled="item.attrs?.disabled === true"
        :class="['form-input-payment-option', selected === item.value ? item.attrs.class_active : item.attrs?.disabled === true ? 'cursor-not-allowed' : 'cursor-pointer']"
        @click="() => { handleInput(item) }">
        <i
            :class="[item.attrs.icon, (selected === item.value) ? 'text-selected' : item.attrs?.disabled === true ? 'text-disabled' : '']" />
        <span :class="(selected === item.value) ? 'text-selected' : item.attrs?.disabled === true ? 'text-disabled' : ''">{{
            item.label
        }}</span>
    </div>
</template>

<style scoped>
/* input[type=checkbox].hidden {
        display: none;
    } */

.cursor-pointer {
    cursor: pointer;
}

.cursor-not-allowed {
    cursor: not-allowed;
}

.font-size20 {
    font-size: 20px;
}

.text-selected {
    color: var(--blue-primary);
}

.text-disabled {
    color: var(--grey-fair);
}
</style>