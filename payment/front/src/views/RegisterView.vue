<script setup>
import { ref, watch, computed } from 'vue';
import Valid from '@/assets/icons/Valid.vue';
import Invalid from '@/assets/icons/Invalid.vue';

const password = ref('');

// Password validation properties
const validPassword = {
    pwlength: false,
    pwuppercase: false,
    pwnumber: false,
    pwspecial: false,
};

// Watch password
watch(password, (value) => {
    validPassword.pwlength = value.length >= 8;
    validPassword.pwuppercase = value.match(/[A-Z]/) !== null;
    validPassword.pwlowercase = value.match(/[a-z]/) !== null;
    validPassword.pwnumber = value.match(/[0-9]/) !== null;
    validPassword.pwspecial = value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) !== null;
});

</script>


<template>
    <aside class="w-full px-9 mt-8 h-auto overflow-scroll">
        <h3 class="font-blooming text-4xl leading-none">S'inscrire</h3>

        <section class="w-full mt-6 py-2">
            <div class="col-span-2">

                <div v-if="submitted">
                    <h2>Submission successful!</h2>
                </div>

                <div
                    class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 class="mb-4 text-xl font-semibold dark:text-white">
                        Informations sur votre entreprise
                    </h3>

                    <FormKit type="form"
                        id="registration-exemple"
                        :form-class="submitted ? 'hide' : 'show'"
                        submit-label="Register"
                        @submit="registerMerchant"
                        :actions="false">
                        <!-- <form @submit.prevent="registerMerchant"> -->
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="companyName" type="text" name="company-name" id="company-name" label="Nom de l'entreprise" placeholder="Amazon" validation="required|text|between:1,50"
                                :input-class="{
                                        'shadow-sm': true,
                                        'bg-gray-50': true,
                                        'border': true,
                                        'border-gray-300': true,
                                        'text-gray-900': true,
                                        'sm:text-sm': true,
                                        'rounded-lg': true,
                                        'focus:ring-primary-500': true,
                                        'focus:border-primary-500': true,
                                        'block': true,
                                        'w-full': true,
                                        'p-2.5': true,
                                        'mt-2': true,
                                        'dark:bg-gray-700': true,
                                        'dark:border-gray-600': true,
                                        'dark:placeholder-gray-400': true,
                                        'dark:text-white': true,
                                        'dark:focus:ring-primary-500': true,
                                        'dark:focus:border-primary-500': true,
                                    }"
                                />
                            </div>

                            <!-- Email de contact -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit
                                    v-model="email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    label="Email de contact"
                                    placeholder="exemple@mail.fr"
                                    validation="required|email"
                                    :input-class="{
                                        'shadow-sm': true,
                                        'bg-gray-50': true,
                                        'border': true,
                                        'border-gray-300': true,
                                        'text-gray-900': true,
                                        'sm:text-sm': true,
                                        'rounded-lg': true,
                                        'focus:ring-primary-500': true,
                                        'focus:border-primary-500': true,
                                        'block': true,
                                        'w-full': true,
                                        'p-2.5': true,
                                        'mt-2': true,
                                        'dark:bg-gray-700': true,
                                        'dark:border-gray-600': true,
                                        'dark:placeholder-gray-400': true,
                                        'dark:text-white': true,
                                        'dark:focus:ring-primary-500': true,
                                        'dark:focus:border-primary-500': true
                                    }"
                                    required
                                />
                            </div>

                            <!-- Mot de passe -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit
                                    type="password"
                                    name="current-password"
                                    id="current-password"
                                    label="Mot de passe"
                                    placeholder="••••••••"
                                    validation="required|+length:8"
                                    :validation-messages="{
                                        length: 'Le mot de passe doit être supérieur à 8 caractères',
                                    }"

                                    :input-class="{
                                        'shadow-sm': true,
                                        'bg-gray-50': true,
                                        'border': true,
                                        'border-gray-300': true,
                                        'text-gray-900': true,
                                        'sm:text-sm': true,
                                        'rounded-lg': true,
                                        'focus:ring-primary-500': true,
                                        'focus:border-primary-500': true,
                                        'block': true,
                                        'w-full': true,
                                        'p-2.5': true,
                                        'mt-2': true,
                                        'dark:bg-gray-700': true,
                                        'dark:border-gray-600': true,
                                        'dark:placeholder-gray-400': true,
                                        'dark:text-white': true,
                                        'dark:focus:ring-primary-500': true,
                                        'dark:focus:border-primary-500': true
                                    }"
                                    required
                                />
                            </div>

                            <!-- Confirmation de mot de passe -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit
                                    type="password"
                                    name="password"
                                    id="password"
                                    validation="required|confirm"
                                    validation-visibility="live"
                                    label="Confirmation de mot de passe"
                                    placeholder="••••••••"
                                    :validation-messages="{
                                        length: 'Le mot de passe ne correspond pas',
                                    }"
                                    :input-class="{
                                        'relative': true,
                                        'shadow-sm': true,
                                        'bg-gray-50': true,
                                        'border': true,
                                        'border-gray-300': true,
                                        'text-gray-900': true,
                                        'sm:text-sm': true,
                                        'rounded-lg': true,
                                        'focus:ring-primary-500': true,
                                        'focus:border-primary-500': true,
                                        'block': true,
                                        'w-full': true,
                                        'p-2.5': true,
                                        'mt-2': true,
                                        'dark:bg-gray-700': true,
                                        'dark:border-gray-600': true,
                                        'dark:placeholder-gray-400': true,
                                        'dark:text-white': true,
                                        'dark:focus:ring-primary-500': true,
                                        'dark:focus:border-primary-500': true
                                    }"
                                    required
                                />
                            </div>

                            <div class="col-span-6 sm:col-span-6" v-show="password">
                                <div class="p-3 space-y-2">
                                    <h3 class="font-semibold text-gray-900 dark:text-white">
                                        Mot de passe doit contenir au moins 8 caractères
                                    </h3>
                                    <div class="grid grid-cols-4 gap-2">
                                        <div :class="{ 'bg-orange-300 dark:bg-orange-400': (validPassword.pwuppercase && validPassword.pwlowercase), 'bg-gray-200 dark:bg-gray-600': !(validPassword.pwuppercase && validPassword.pwlowercase) }" class="h-1"></div>
                                        <div :class="{ 'bg-orange-300 dark:bg-orange-400': validPassword.pwspecial, 'bg-gray-200 dark:bg-gray-600': !validPassword.pwspecial }" class="h-1"></div>
                                        <div :class="{ 'bg-orange-300 dark:bg-orange-400': validPassword.pwnumber, 'bg-gray-200 dark:bg-gray-600': !validPassword.pwnumber }" class="h-1"></div>
                                        <div :class="{ 'bg-orange-300 dark:bg-orange-400': validPassword.pwlength, 'bg-gray-200 dark:bg-gray-600': !validPassword.pwlength }" class="h-1"></div>
                                    </div>
                                    <p>Votre mot de passe doit contenir:</p>
                                    <ul>
                                        <li class="flex items-center mb-1">
                                            <Valid v-if="validPassword.pwuppercase && validPassword.pwlowercase" />
                                            <Invalid v-else />
                                            Une lettre majuscule et minuscule
                                        </li>
                                        <li class="flex items-center mb-1">
                                            <Valid v-if="validPassword.pwspecial" />
                                            <Invalid v-else />
                                            Un caractère spécial (#$&)
                                        </li>
                                        <li class="flex items-center mb-1">
                                            <Valid v-if="validPassword.pwnumber" />
                                            <Invalid v-else />
                                            Le mot de passe doit contenir au moins un chiffre
                                        </li>
                                        <li class="flex items-center">
                                            <Valid v-if="validPassword.pwlength" />
                                            <Invalid v-else />
                                            Le mot de passe doit contenir au moins 8 caractères
                                        </li>
                                    </ul>
                                </div>
                                <div data-popper-arrow></div>
                            </div>

                            <!-- Pays -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit
                                    v-model="country"
                                    type="text"
                                    name="country"
                                    id="country"
                                    label="Pays"
                                    placeholder="France"
                                    validation="required|?length:2"
                                    :validation-messages="{
                                        length: 'Entrez un pays valide',
                                    }"
                                    :input-class="{
                                        'shadow-sm': true,
                                        'bg-gray-50': true,
                                        'border': true,
                                        'border-gray-300': true,
                                        'text-gray-900': true,
                                        'sm:text-sm': true,
                                        'rounded-lg': true,
                                        'focus:ring-primary-500': true,
                                        'focus:border-primary-500': true,
                                        'block': true,
                                        'w-full': true,
                                        'p-2.5': true,
                                        'mt-2': true,
                                        'dark:bg-gray-700': true,
                                        'dark:border-gray-600': true,
                                        'dark:placeholder-gray-400': true,
                                        'dark:text-white': true,
                                        'dark:focus:ring-primary-500': true,
                                        'dark:focus:border-primary-500': true
                                    }"
                                    required
                                />
                            </div>

                            <!-- Ville -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit
                                    v-model="city"
                                    type="text"
                                    name="city"
                                    id="city"
                                    label="Ville"
                                    placeholder="Paris"
                                    validation="required|?length:2"
                                    :validation-messages="{
                                        length: 'Entrez une ville valide',
                                    }"
                                    :input-class="{
                                        'shadow-sm': true,
                                        'bg-gray-50': true,
                                        'border': true,
                                        'border-gray-300': true,
                                        'text-gray-900': true,
                                        'sm:text-sm': true,
                                        'rounded-lg': true,
                                        'focus:ring-primary-500': true,
                                        'focus:border-primary-500': true,
                                        'block': true,
                                        'w-full': true,
                                        'p-2.5': true,
                                        'mt-2': true,
                                        'dark:bg-gray-700': true,
                                        'dark:border-gray-600': true,
                                        'dark:placeholder-gray-400': true,
                                        'dark:text-white': true,
                                        'dark:focus:ring-primary-500': true,
                                        'dark:focus:border-primary-500': true
                                    }"
                                    required
                                />
                            </div>

                            <!-- Adresse -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="address" type="text" name="address" id="address" label="Adresse"
                                placeholder="242 rue Faubourg Saint-Antoine"
                                validation="required|?length:2"
                                :validation-messages="{
                                    length: 'Entrez une adresse valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- Numéro de téléphone -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="phoneNumber" type="tel" name="phone-number" id="phone-number"
                                pattern="[0-9]{10}"
                                label="Numéro de téléphone"
                                placeholder="+(33) 01 23 45 67 89"
                                validation="matches:/^[0-9]{10}$/|?length:2"
                                :validation-messages="{
                                    matches: 'Le numéro de téléphone est au mauvais format',
                                }"
                                validation-visibility="dirty"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" />
                            </div>

                            <!-- Code postal -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="zipCode" type="number" name="zip-code" id="zip-code"
                                label="Code postal"
                                placeholder="123456"
                                validation="matches:/^[0-9]{5}$/"
                                :validation-messages="{
                                    matches: 'Le code postal est au mauvais format',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- Numéro KBIS -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="kbis" type="text" name="kbis" id="kbis" label="Numéro KBIS"
                                placeholder="Numéro KBIS"
                                validation="matches:/^\d{3}\s\d{3}\s\d{3}\s00035$/"
                                :validation-messages="{
                                    matches: 'Le numéro KBIS est au mauvais format',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- URL d'annulation -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="cancellationUrl" type="text" name="CancellationUrl"
                                id="CancellationUrl"
                                label="URL d'annulation"
                                placeholder="https://www.exemple.com"
                                validation="url"
                                :validation-messages="{
                                    matches: 'Entrez une URL valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- URL de confirmation -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="confirmationUrl" type="text" name="confirmationUrl"
                                id="confirmationUrl"
                                label="URL de confirmation"
                                placeholder="https://www.exemple.com"
                                validation="url"
                                :validation-messages="{
                                    matches: 'Entrez une URL valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>
                        </div>


                        <h3 class="mt-4 w-full text-xl font-semibold dark:text-white">
                            Informations de contact
                        </h3>
                        <div class="grid grid-cols-6 gap-6">

                            <!-- Nom de contact -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="LastName" type="text" name="lastname" id="lastname"
                                label="Nom de contact"
                                placeholder="John"
                                validation="required|text|between:1,50"
                                :validation-messages="{
                                    length: 'Entrez un nom valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- Prénom de contact -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="FirstName" type="text" name="firstname" id="firstname"
                                label="Prénom de contact"
                                placeholder="Doe"
                                validation="required|text|between:1,50"
                                :validation-messages="{
                                    length: 'Entrez un prénom valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- Rôle -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="role" type="text" name="role" id="role" label="Rôle" placeholder="Responsable des communications"
                                validation="?text|between:2,50"
                                :validation-messages="{
                                    length: 'Entrez un rôle valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- Département -->
                            <div class="col-span-6 sm:col-span-3">
                                <FormKit v-model="department" type="text" name="department" id="department"
                                label="Département"
                                placeholder="Ventes"
                                validation="?text|between:2,50"
                                :validation-messages="{
                                    length: 'Entrez un département valide',
                                }"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <!-- Email de contact -->
                            <div class="col-span-6 sm:col-full">
                                <FormKit v-model="contactEmail" type="email" name="contactEmail" id="contactEmail"
                                label="Email de contact"
                                validation="required|email"
                                placeholder="Email de contact"
                                :input-class="{
                                'shadow-sm': true,
                                'bg-gray-50': true,
                                'border': true,
                                'border-gray-300': true,
                                'text-gray-900': true,
                                'sm:text-sm': true,
                                'rounded-lg': true,
                                'focus:ring-primary-500': true,
                                'focus:border-primary-500': true,
                                'block': true,
                                'w-full': true,
                                'p-2.5': true,
                                'mt-2': true,
                                'dark:bg-gray-700': true,
                                'dark:border-gray-600': true,
                                'dark:placeholder-gray-400': true,
                                'dark:text-white': true,
                                'dark:focus:ring-primary-500': true,
                                'dark:focus:border-primary-500': true
                                }" required />
                            </div>

                            <div class="col-span-6 sm:col-full">
                                <button
                                    class="px-3 py-2 my-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="submit">
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    <!-- </form> -->
                    </FormKit>
                </div>
            </div>
        </section>
    </aside>
</template>

<style>
    .formkit-form {
        max-width: none;
        width: 100%;
        min-height: auto;
        box-shadow: none;
        border-radius: 0px;
        padding-bottom: 0px;
    }
</style>