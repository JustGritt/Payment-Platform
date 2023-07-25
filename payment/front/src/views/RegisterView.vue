<template>
    <aside class="w-full px-9 mt-8 h-auto overflow-scroll">
        <h3 class="font-blooming text-4xl leading-none">S'inscrire</h3>

        <section class="w-full mt-6 py-2">
            <div class="col-span-2">
                <div
                    class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 class="mb-4 text-xl font-semibold dark:text-white">
                        Informations sur votre entreprise
                    </h3>
                    <form @submit.prevent="registerMerchant">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="company-name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de
                                    l'entreprise</label>
                                <input v-model="companyName" type="text" name="company-name" id="company-name"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Stripouz" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email de
                                    contact</label>
                                <input v-model="email" type="email" name="email" id="email"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="exemple@company.fr" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="current-password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de
                                    passe</label>
                                <input type="password" v-model="password" name="current-password" id="current-password"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="••••••••" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmation de
                                    mot de passe</label>
                                <input type="password" v-model="confirmPassword" name="password" id="password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••" required />
                                <div data-popover id="popover-password" role="tooltip"
                                    class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                    class="absolute z-10 invisible inline-block text-sm font-light text-gray-500
                                    transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm
                                    opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                    <div class="p-3 space-y-2">
                                        <h3 class="font-semibold text-gray-900 dark:text-white">
                                            Mot de passe doit contenir au moins 6 caractères
                                        </h3>
                                        <div class="grid grid-cols-4 gap-2">
                                            <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                            <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                            <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                            <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                        </div>
                                        <p>Votre mot de passe doit contenir:</p>
                                        <ul>
                                            <li class="flex items-center mb-1">
                                                <svg class="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                                                    aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                                Une lettre majuscule et minuscule
                                            </li>
                                            <li class="flex items-center mb-1">
                                                <svg class="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                    aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                                Un caractère spécial (#$&)
                                            </li>
                                            <li class="flex items-center">
                                                <svg class="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                    aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                                Le mot de passe doit contenir au moins 12 caractères
                                            </li>
                                        </ul>
                                    </div>
                                    <div data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="country"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pays</label>
                                <input type="text" v-model="country" name="country" id="country"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="France" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="city"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ville</label>
                                <input type="text" v-model="city" name="city" id="city"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Paris" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="address"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
                                <input type="text" v-model="address" name="address" id="address"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="242 rue Faubourg Saint-Antoine" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="phone-number"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de
                                    téléphone</label>
                                <input type="tel" v-model="phoneNumber" name="phone-number" id="phone-number"
                                    pattern="[0-9]{10}"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="+(33) 01 23 45 67 89"  />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="zip-code"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code
                                    postal</label>
                                <input type="number" v-model="zipCode" name="zip-code" id="zip-code"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="123456" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="kbis"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro
                                    KBIS</label>
                                <input v-model="kbis" type="text" name="kbis" id="kbis"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Numéro KBIS" required />
                            </div>
                        </div>
                        <h3 class="mt-4 w-full text-xl font-semibold dark:text-white">
                            Informations de contact
                        </h3>
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="lastname"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de
                                    contact</label>
                                <input type="text" v-model="LastName" name="lastname" id="lastname"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="John" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="firstname"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom
                                    de
                                    contact</label>
                                <input type="text" v-model="FirstName" name="firstname" id="firstname"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Doe" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="role"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rôle</label>
                                <input type="text" v-model="role" name="role" id="role"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Responsable des communications" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="department"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Département</label>
                                <input type="text" v-model="department" name="department" id="department"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Ventes" required />
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="Email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email de contact</label>
                                <input type="email" v-model="contactEmail" name="contactEmail" id="contactEmail"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Email de contact" required />
                            </div>
                            <div class="col-span-6 sm:col-full">
                                <button
                                    class="px-3 py-2 my-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="submit">
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </aside>
</template>


<script>
    // Importez le service API
    import apiService from "@/services/apiService";

    export default {
        data() {
            return {
                companyName: "",
                email: "",
                password: "",
                confirmPassword: "",
                FirstName: "",
                LastName: "",
                role: "",
                department: "",
                country: "",
                city: "",
                address: "",
                phoneNumber: "",
                zipCode: "",
                kbis: "",
                contactEmail: "",
            };
        },
        methods: {
            async registerMerchant() {
                try {
                    // Données du formulaire
                    const merchantData = {
                        name: this.companyName,
                        email: this.email,
                        kbis: this.kbis,
                        redirectUrlConfirmation: "",
                        redirectUrlCancellation: "",
                    };

                   
                    // Données du formulaire de contact
                    const contactData = {
                        firstname: this.FirstName,
                        lastname: this.LastName,
                        email: this.contactEmail,
                        // Ajoutez d'autres propriétés ici...
                    };

                    const data = {
                    merchantData: merchantData,
                    contactData: contactData,
        };

                // Appelez la fonction d'enregistrement du marchand du service API en passant les données complètes
                const newMerchant = await apiService.registerMerchant(data);
        


                    // Traitement des étapes suivantes après l'enregistrement réussi (par exemple, afficher un message de succès)
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>

<style>
    /* Votre code CSS ici */
</style>