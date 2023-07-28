<script setup>
import { ref, watch, computed } from 'vue';
import Valid from '@/assets/icons/Valid.vue';
import Invalid from '@/assets/icons/Invalid.vue';
// Importez le service API
import apiService from "@/services/apiService";
import route from "../router";
const pw = ref("");
// Password validation properties
const validPassword = {
    pwlength: false,
    pwuppercase: false,
    pwnumber: false,
    pwspecial: false,
};

// Watch password
watch(pw, (value) => {
    validPassword.pwlength = value.length >= 8;
    validPassword.pwuppercase = value.match(/[A-Z]/) !== null;
    validPassword.pwlowercase = value.match(/[a-z]/) !== null;
    validPassword.pwnumber = value.match(/[0-9]/) !== null;
    validPassword.pwspecial = value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) !== null;
});

// Define the reactive variables
const companyName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const FirstName = ref("");
const LastName = ref("");
const role = ref("");
const country = ref("");
const city = ref("");
const address = ref("");
const phoneNumber = ref("");
const zipCode = ref("");
const kbis = ref("");
const contactEmail = ref("");
const cancellationUrl = ref("");
const confirmationUrl = ref("");

// Create the registerMerchant function
async function registerMerchant() {
    try {
        // Données du formulaire
        const merchantData = {
            name: companyName.value,
            email: email.value,
            kbis: kbis.value,
            country: country.value,
            city: city.value,
            address: address.value,
            postal_code: zipCode.value,
            phone: phoneNumber.value,
            redirectUrlConfirmation: confirmationUrl.value,
            redirectUrlCancellation: cancellationUrl.value,
            password: pw.value,
        };

        // Données du formulaire de contact
        const contactData = {
            firstname: FirstName.value,
            lastname: LastName.value,
            email: contactEmail.value,
            title: role.value,
        };

        const data = {
            merchantData: merchantData,
            contactData: contactData,
        };

        console.log(data);

        // Appelez la fonction d'enregistrement du marchand du service API en passant les données complètes
        const newMerchant = await apiService.registerMerchant(data);

        console.log("hello", newMerchant);
        console.log("newMerchant.isvalid", newMerchant.isvalid);
        if (newMerchant && !newMerchant.isvalid) {
            route.push('/login');
        }
        // Traitement des étapes suivantes après l'enregistrement réussi (par exemple, afficher un message de succès)
    } catch (error) {
        console.error(error);
    }
}

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
                                <FormKit v-model="companyName" type="text" name="company-name" id="company-name" label="Nom de l'entreprise" placeholder="Amazon" validation="required|text"
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
                                    v-model="pw"

                                    type="password"
                                    name="password"
                                    value="super-secret"
                                    label="Password"
                                    help="Enter a new password"
                                    validation="required|+length:8"
                                    validation-visibility="live"
                                    :validation-messages="{
                                        length: 'Le mot de passe doit être supérieur à 8 caractères',
                                    }"
                                    placeholder="••••••••"

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
                                    v-model="confirmPassword"
                                    type="password"
                                    name="password_confirm"
                                    label="Confirmation de mot de passe"
                                    help="Confirm your new password"
                                    validation="required|confirm"
                                    validation-visibility="live"
                                    validation-label="Password confirmation"
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

                            <div class="col-span-6 sm:col-span-6" v-show="pw">
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
                                validation="required|text"
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
                                validation="required|text"
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
                                validation="text"
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
                                validation="text"
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

<style lang="scss">

html {
    --blue-primary : #268FFF;
    --grey-fair    : #a6a6a6d4;
    --grey-gen: #e5e5e5;
    --primary-input: #F7FAFB;
    --red-light    : #ff6b6b;
    }

    .header-payment-form {
    border-bottom   : 1px solid var(--grey-gen);
    position        : sticky;
    top             : 0;
    width           : 100%;
    background-color: white;
    padding         : 10px 20px;
    border-radius: 12px 12px  0 0;
    margin-bottom: 10px;
    .logo-header-payment-form{
        display         : flex;
        flex-direction: row;
        justify-content: space-between;

        img.logo-header-payment-form {
        height: 45px;
        width: 98px;
        transform: scale(2);
        margin-top: 4px;
        }
        .details-payment-form{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        >h1{
            font-size  : 15px;
            font-weight: 600;
        }
        button{
            color: var(--grey-fair);
        }
        }
    }
    .details-payment-info{
        border-top         : 1px solid var(--grey-gen);
        margin-top: 12px;
        >ul{
        // padding-top: 4px;
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0px;
            &.tva{
            border-bottom: 1px solid var(--grey-gen);
            border-top: 1px solid var(--grey-gen);
            &:last-child{
                border-bottom: none;
                border-top: none;
            }
            color: var(--grey-fair)

            }
        }
        }
    }



    }
    #form-payment .formkit-messages #form-payment-incomplete{
        display: none;
    }
    .formkit-form {
    max-width         : 600px;
    width             : 100%;
    min-height        : 930px;
    -webkit-box-shadow: 0px 0px 15px 5px #e5e5e5;
    box-shadow        : 0px 0px 15px 5px #e5e5e5;
    border-radius     : 12px;
    padding-bottom: 20px;
    section {
        padding: 0px 20px;
    }
    }

    .header-title {
    font-size  : 12px;
    font-weight: 600;
    }

    .formkit-form .label-title {
    font-size     : 18px;
    font-weight   : 600;
    display       : flex;
    flex-direction: column;
    color         : #404660;
    }

    .form-input-payment {}

    .formkit-form .form-payments-actions {
    display        : flex;
    justify-content: flex-end;
    gap            : 10px;
    margin-top     : 20px;
    }

    .form-input-payment .little-label {
    font-size  : 14px;
    color      : #404660;
    font-weight: 600;
    }

    .mt-10 {
    margin-top: 10px;
    }

    .text-20 {
    font-size: 20px;
    }

    .text-30 {
    font-size: 30px;
    }

    .form-input-payment input,
    .form-input-payment select {
    padding         : 11px 13px;
    background-color: var(--primary-input);
    margin-top      : 7px;
    width           : 100%;
    border-radius   : 6px;
    font-size       : 13px;
    border          : 1px solid transparent;
    }

    .form-input-payment input:focus,
    .form-input-payment select:focus {
    outline   : none !important;
    border    : 1px solid var(--blue-primary);
    box-shadow: 0 0 5px var(--blue-primary);
    }

    .formkit-form hr.form-separator {
    margin: 20px 0;
    }

    .formkit-form .form-input-payment-options .type_payment_active {
    background-color: #fff;
    border          : 1px solid var(--blue-primary);
    }

    .formkit-form .form-input-payment-options {
    overflow-x: scroll;
    display   : flex;
    gap       : 10px;
    }

    .form-input-payment-options .form-input-payment-option {
    max-width       : 200px;
    width           : 100%;
    height          : 70px;
    border          : 1px solid #e5e5e5;
    background-color: var(--primary-input);
    border-radius   : 5px;
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    }

    .card {
    border : 1px solid gray;
    padding: 10px;
    }

    .formkit-form .error-payment-card {
    border: 1px solid var(--red-light) !important;
    }

    .error-payment-card:focus {
    box-shadow: 0 0 5px var(--red-light) !important;
    }

    input[type="checkbox"]:checked~.form-input-payment-option {
    /* Add your desired border color here */
    border-color: red;
    }


    .chk-circle>i {
    position     : relative;
    float        : left;
    display      : block;
    width        : 6px;
    height       : 6px;
    margin-top   : 5px;
    border-radius: 100px;
    cursor       : pointer;
    z-index      : 1;
    border       : 3px solid #ddd;
    background   : #fff;
    cursor       : pointer;
    }

    .chk-circle>label {
    cursor: pointer;
    margin: 0 10px auto;

    }

    .chk-hide {
    visibility: hidden;
    }

    .chk-circle>input[type=checkbox]:checked+i {
    border: 3px solid green;
    }

    .formkit-form .btn-save-payment .formkit-wrapper .formkit-input {
    background-color: var(--blue-primary);
    color           : #fff;
    border          : 1px solid var(--blue-primary);
    padding         : 10px 20px;
    border-radius   : 5px;
    font-size       : 14px;
    font-weight     : 600;
    min-width       : 130px;
    }

    .formkit-form .btn-save-payment .formkit-wrapper .formkit-input:hover {
    background-color: #fff;
    color           : var(--blue-primary);
    }

    .formkit-form .btn-cancel-payment {
    padding         : 10px 20px;
    background-color: #fff;
    border          : 1px solid var(--grey-fair);
    color           : black;
    min-width       : 130px;
    border-radius   : 5px;
    }

    .formkit-form .btn-cancel-payment:hover {
    background-color: var(--grey-fair);
    color           : black;
    }

    .formkit-form [data-invalid] .formkit-wrapper .formkit-input {
    border    : 1px solid var(--red-light) !important;
    box-shadow: 0 0 5px var(--red-light) !important;
    }

    [data-message-type] {
    color      : var(--red-light);
    font-size  : 12px;
    font-weight: 600;
    }

    .error-text-payment {
    color      : var(--red-light);
    font-size  : 12px;
    font-weight: 600;
    }

    @media (min-width: 768px) {
    .form-input-payment-options .form-input-payment-option {
        width: 150px;
    }
    }

    .formkit-form {
            max-width: none;
            width: 100%;
            min-height: auto;
            box-shadow: none;
            border-radius: 0px;
            padding-bottom: 0px;
        }
</style>