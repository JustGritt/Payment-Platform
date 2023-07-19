<script setup>
import { ref } from 'vue'
import { createInput } from '@formkit/vue'
import InputCard from './InputCard.vue'

const values = ref({})
const inputCard = createInput(InputCard)

</script>

<template>
    <FormKit type="form" class="form-payment-container" outer-class="i-will-be-appended" v-model="values">
        <div class="form-input-payment">
            <label for="email">Contact info</label>
            <input name="email" id="email" placeholder="Enter email" type="email" />
        </div>
        <hr class="form-separator">
        <section>
            <h2 class="label-title">Shipping</h2>
            <div class="form-input-payment mt-10">
                <label for="name" class="little-label">Name</label>
                <FormKit type="text" name="name" id="name" placeholder="Enter name" outer-class="$reset formik-inner" />
            </div>
            <div class="form-input-payment mt-10">
                <FormKit type="select" label="Country or region" outer-class="$reset little-label" name="region" :options="[
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
                <FormKit :type="inputCard" :class="font - size20" name="type_payment" label="Best movie" :options="[
                    { label: 'Card', value: 'card', attrs: { icon: 'fas fa-credit-card text-20', class_active: 'type_payment_active' } },
                    { label: 'Google Pay', value: 'googlepay', attrs: {disabled: true, icon: 'fab fa-google-pay text-30', class_active: 'type_payment_active' } },
                    { label: 'Cash', value: 'cash', attrs: { disabled: true, icon: 'fas fa-money-bill-alt text-20', class_active: 'type_payment_active' } },
                ]" :classes="{
                        outer: 'foo-bar',
                        inner: {
                            $reset: true,
                            'form-input-payment-options': true
                        }
                    }" 
                    help="What is the best movie of all time?" />


            </div>
        </section>
    </FormKit>
    <pre wrap>{{ values }}</pre>
</template>
<link href="https://cdn.staticaly.com/gh/hung1001/font-awesome-pro/4cac1a6/css/all.css" rel="stylesheet" type="text/css" />
<style>
@import "./form.css";
</style>

<script>

</script>