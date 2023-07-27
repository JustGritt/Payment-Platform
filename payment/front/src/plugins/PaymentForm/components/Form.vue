<script setup>
import { ref } from 'vue'
import { createInput } from '@formkit/vue'
import { createZodPlugin } from '@formkit/zod'
import { z } from 'zod'
import InputCard from './InputCard.vue'

import { validateCardNumber as validateCardNumber_ } from '../utils/my-custom-rules/card-input.js'
import { checkCardExpiry as checkCardExpiry_ } from '../utils/my-custom-rules/card-input.js'
import { validateCardCVC as validateCardCVC_ } from '../utils/my-custom-rules/card-input.js'
import CardInputCvC from './CardInputs/CardInputCVC.vue'
import CardInputNumberVue from './CardInputs/CardInputNumber.vue'
import CardInputExpiry from './CardInputs/CardInputExpiry.vue'


const values = ref({
    "type_payment": "card"
})

const is_details_opened = ref(false)

const inputCard = createInput(InputCard)
const cardInputCVC = createInput(CardInputCvC)
const cardInputNumber = createInput(CardInputNumberVue)
const inputCardExpiry = createInput(CardInputExpiry)

const zodSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    region: z.string(),
    adress: z.string(),
    type_payment: z.string(),
    cardNumber: z.object({
        card_number: z.string(),
        cvc: z.number(),
        expiry: z.string(),
    }),
})


const [zodPlugin, submitHandler] = createZodPlugin(
    zodSchema,
    async (formData) => {
        console.log(formData)
        // fake submit handler, but this is where you
        // do something with your valid data.
        await new Promise((r) => setTimeout(r, 2000))
        alert('Form was submitted!')
    }
    , {
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: true,
    })

const onErrorForm = (errors) => {
    console.log(errors)
}

</script>
<style lang="scss">
@import "./form.scss";
</style>

<template >
    <FormKit id="form-payment" :actions="false" type="form" class="form-payment-container" outer-class="i-will-be-appended"
        v-model="values" :plugins="[zodPlugin]" @submit="submitHandler">
        <header class="header-payment-form">
            <div class="logo-header-payment-form">
                <img class="logo-header-payment-form" src="../assets/strapouz.svg" />
                <div class="details-payment-form">
                    <h1>42.99€</h1>
                    <button @click="is_details_opened = !is_details_opened" type="button">Details <i
                            :class="is_details_opened ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" /></button>
                </div>
            </div>
            <div v-if="is_details_opened" class="details-payment-info">
                <ul>
                    <li>
                        <span class="little-label">Name</span>
                        <h4>12.86 €</h4>
                    </li>
                    <li class="tva">
                        <span class="little-label">Tva</span>
                        <h4>+ 0.20%</h4>
                    </li>
                    <li>
                        <span ref="thisDiv" class="label-title">Total</span>
                        <h4 class="label-title">13.06 €</h4>
                    </li>
                </ul>
            </div>

        </header>
        <section class="form-input-payment">
            <label for="email" class="label-title">Contact info</label>
            <FormKit type="text" name="email" id="email" placeholder="Enter email" />
        </section>

        <hr class="form-separator">
        <section>
            <h2 class="label-title">Shipping</h2>
            <div class="form-input-payment mt-10">
                <label for="name" class="little-label">Name</label>
                <FormKit type="text" name="name" id="name" placeholder="Enter name" outer-class="$reset formik-inner" />
            </div>
            <div class="form-input-payment mt-10">
                <label for="name" class="little-label">Country or region</label>
                <FormKit type="select" outer-class="$reset little-label" name="region" :options="[
                    'Monaco',
                    'Vatican City',
                    'Maldives',
                    'Tuvalu',
                ]" />
            </div>
            <div class="form-input-payment mt-10">
                <label for="adress" class="little-label">Adress line</label>
                <FormKit name="adress" id="adress" placeholder="Enter your address" type="text" />
            </div>
        </section>
        <hr class="form-separator">
        <section>
            <h2 class="label-title">Payment</h2>
            <div>
                <FormKit validation="required" :type="inputCard" class="font - size20" name="type_payment" :options="[
                    { label: 'Card', value: 'card', attrs: { icon: 'fas fa-credit-card text-20', class_active: 'type_payment_active' } },
                    { label: 'Google Pay', value: 'googlepay', attrs: { disabled: true, icon: 'fab fa-google-pay text-30', class_active: 'type_payment_active' } },
                    { label: 'Cash', value: 'cash', attrs: { disabled: true, icon: 'fas fa-money-bill-alt text-20', class_active: 'type_payment_active' } },
                ]" :classes="{
    outer: 'foo-bar',
    inner: {
        $reset: true,
        'form-input-payment-options': true
    }
}" />

                <div class="form-input-payment mt-10">
                    <FormKit type="group" name="cardNumber">
                        <FormKit validation="validateCardNumber:card-number" :validation-rules="{ validateCardNumber }"
                            :type="cardInputNumber"
                            :options="{ type: 'tel', vCardformat: 'cardNumber' }" name="card_number"
                            id="card_number" placeholder="1234 5678 9012 3456" />

                    <FormKit validation="validateCardCVC:card-cvc" :validation-rules="{ validateCardCVC  }"
                            :type="cardInputCVC" name="cvc"
                        id="cvc" placeholder="123" />

                    <FormKit validation="checkCardExpiry:card-expiry" :validation-rules="{ checkCardExpiry }"
                            :type="inputCardExpiry" name="expiry"
                    id="expiry" placeholder="01/01" />
                    </FormKit>
                    <!-- <FormKit type="group" name="personalInfo">
                        <FormKit @error="this.$refs.validateCardNumber" validation="cardNumber.number"
                            :type="inputCreditCard" type="number" name="cardNumber" id="cardNumber"
                            placeholder="1234 5678 9012 3456" />
                    </FormKit> -->
                </div>
            </div>
        </section>
        <section class="form-payments-actions">
            <FormKit :options="{ mask: '#### #### #### ####' }" type="submit" label="Pay now"
                outer-class="$reset btn-save-payment" />
            <button type="button" @click="() => { this.$emit('close') }" class="btn-cancel-payment">
                Cancel
            </button>
        </section>
    </FormKit>
</template>
<link href="https://cdn.staticaly.com/gh/hung1001/font-awesome-pro/4cac1a6/css/all.css" rel="stylesheet" type="text/css" />

<script>
export default {
    mounted() {
        console.log(this.$cardFormat)
    },
    methods: {
        validateCardNumber: function (node, group = 'card-number') {
            return validateCardNumber_.bind(this)(node, group)
        },
        validateCardCVC: function (node, group = 'card-cvc') {
            return validateCardCVC_.bind(this)(node, group)
        },
        checkCardExpiry: function (node, group = 'card-expiry') {
            return checkCardExpiry_.bind(this)(node, group)
        }
    }
}
</script>