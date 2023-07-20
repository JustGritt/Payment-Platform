<script setup>
import { ref } from 'vue'
import { createInput } from '@formkit/vue'
import { createZodPlugin } from '@formkit/zod'
import { z } from 'zod'
import InputCard from './InputCard.vue'
import InputCreditCard from './InputCreditCard.vue'

const values = ref({})
const inputCard = createInput(InputCard)
const inputCreditCard = createInput(InputCreditCard)

const zodSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    region: z.string(),
    adress: z.string(),
    type_payment: z.string(),
    cardNumber: z.object({
        number: z.number(),
        cvc: z.number(),
        expiry: z.string(),
    }),
})

const [zodPlugin, submitHandler] = createZodPlugin(
  zodSchema,
  async (formData) => {
    // fake submit handler, but this is where you
    // do something with your valid data.
    await new Promise((r) => setTimeout(r, 2000))
    alert('Form was submitted!')
    console.log(formData)
  }
)

</script>
<style >
    @import "./form.css";
</style>
<template>
    <FormKit type="form" class="form-payment-container" outer-class="i-will-be-appended" v-model="values"  :plugins="[zodPlugin]" @submit="submitHandler">
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
            <FormKit validation="required"  :type="inputCard" :class="font - size20" name="type_payment" :options="[
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
                     />

                <div class="form-input-payment mt-10">
                    <FormKit  :type="inputCreditCard" label="card" type="number" name="card" id="card" placeholder="1234 5678 9012 3456" />
                </div>
            </div>
        </section>
    </FormKit>
    <pre wrap>{{ values }}</pre>
</template>
<link href="https://cdn.staticaly.com/gh/hung1001/font-awesome-pro/4cac1a6/css/all.css" rel="stylesheet" type="text/css" />


<script>

</script>