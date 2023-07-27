<script setup>
import { ref, computed, onMounted } from 'vue'
import apiService from '../services/apiService'
import { userState } from '../contexts/User'

// Get the user data from localStorage and parse it as an object
const user = JSON.parse(localStorage.getItem("user") || "{}")

// Convert user to a reactive reference using ref
const userRef = ref(user)

// Create computed properties for clientToken and clientSecret
const clientToken = computed(() => userRef.value.client_token)
const clientSecret = computed(() => userRef.value.client_secret)

const regenerateToken = () => {
  apiService.regenerateToken()
    .then((response) => {
      console.log(response)
      // Update the userRef with the new values
      userRef.value = { ...userRef.value, client_token: response.client_token, client_secret: response.client_secret }

      // Update the userState with the new values
      userState.user = { ...userState.user, client_token: response.client_token, client_secret: response.client_secret }

      // Update the values in localStorage
      localStorage.setItem("user", JSON.stringify(userRef.value))
    })
    .catch((error) => {
      console.log(error)
    })
}

// On component mount, update the localStorage if it's in the nested string format
onMounted(() => {
  if (typeof userRef.value === 'string') {
    localStorage.setItem("user", userRef.value);
  }
})
</script>



<template>
  <aside class="w-full px-9 mt-8 h-auto overflow-scroll">
    <h3 class="font-blooming text-4xl leading-none">Paramètres</h3>
    Modifier les paramètres de votre compte
    <section class="w-full mt-6 py-2">
      <div class="col-span-2">
        <div
          class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800"
        >
          <h3 class="mb-4 text-xl font-semibold dark:text-white">
            Informations sur votre entreprise
          </h3>
          <form action="#">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nom de l'entreprise</label
                >
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Stripouz"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email de contact</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="exemple@company.fr"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="country"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Pays</label
                >
                <input
                  type="text"
                  name="country"
                  id="country"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="France"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="city"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Ville</label
                >
                <input
                  type="text"
                  name="city"
                  id="city"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Paris"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Addresse</label
                >
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="242 rue Faubourg Saint-Antoine"
                  required
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="phone-number"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Numéro de téléphone</label
                >
                <input
                  type="number"
                  name="phone-number"
                  id="phone-number"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="+(33) 01 23 45 67 89"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="zip-code"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Code postal</label
                >
                <input
                  type="number"
                  name="zip-code"
                  id="zip-code"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="123456"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-full">
                <button
                  class="px-3 py-2 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="submit"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800"
        >
          <h3 class="mb-4 text-xl font-semibold dark:text-white">
            Informations de contact
          </h3>
          <form action="#">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nom de contact</label
                >
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="John"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Prénom de contact</label
                >
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="role"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Rôle</label
                >
                <input
                  type="text"
                  name="role"
                  id="role"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Responsable des communications"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="department"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Département</label
                >
                <input
                  type="text"
                  name="department"
                  id="department"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ventes"
                  required
                />
              </div>

              <div class="col-span-6 sm:col-full">
                <button
                  class="px-3 py-2 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="submit"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800"
        >
          <h3 class="mb-4 text-xl font-semibold dark:text-white">
            Modification du mot de passe
          </h3>
          <form action="#">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="current-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mot de passe actuel</label
                >
                <input
                  type="text"
                  name="current-password"
                  id="current-password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nouveau mot de passe</label
                >
                <input
                  data-popover-target="popover-password"
                  data-popover-placement="bottom"
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
                <div
                  data-popover
                  id="popover-password"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                >
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
                        <svg
                          class="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Une lettre majuscule et minuscule
                      </li>
                      <li class="flex items-center mb-1">
                        <svg
                          class="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Un caractère spécial (#$&)
                      </li>
                      <li class="flex items-center">
                        <svg
                          class="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Le mot de passe doit contenir au moins 12 caractères
                      </li>
                    </ul>
                  </div>
                  <div data-popper-arrow></div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Mot de passe de confirmation</label
                >
                <input
                  type="text"
                  name="confirm-password"
                  id="confirm-password"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-full">
                <button
                  class="px-3 py-2 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="submit"
                >
                  Enregistrer
                </button>

              </div>
            </div>
          </form>
        </div>

        <div
          class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800"
        >
          <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Vos Tokens</h3>
            <div class="col-span-6 sm:col-span-3">
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Client Token</label
                >
                <input
                  v-model="clientToken"
                  type="text"
                  name="clientToken"
                  id="clientToken"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  disabled
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Client Secret</label
                >
                <input
                  v-model="clientSecret"
                  type="text"
                  name="clientSecret"
                  id="clientSecret"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  disabled

                />
              </div>

              <button @click="regenerateToken()">
                Regenerer
              </button>
          </div>
        </div>

        <div
          class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800"
        >
          <div class="flow-root">
            <h3 class="text-xl font-semibold dark:text-white">Dernières connexions</h3>
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <svg
                      class="w-6 h-6 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-base font-semibold text-gray-900 truncate dark:text-white"
                    >
                      Paris 123.123.123.123
                    </p>
                    <p
                      class="text-sm font-normal text-gray-500 truncate dark:text-gray-400"
                    >
                      Chrome on macOS
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    <a
                      href="#"
                      class="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >Revoke</a
                    >
                  </div>
                </div>
              </li>
              <li class="pt-4 pb-6">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <svg
                      class="w-6 h-6 dark:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-base font-semibold text-gray-900 truncate dark:text-white"
                    >
                      Allemagne 24.456.355.98
                    </p>
                    <p
                      class="text-sm font-normal text-gray-500 truncate dark:text-gray-400"
                    >
                      Safari on iPhone
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    <a
                      href="#"
                      class="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >Revoke</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
