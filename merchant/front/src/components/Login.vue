<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit="handleSubmit" id="form" class="space-y-6" action="" method="POST">
          <div>
            <label for="clientid" class="block text-sm font-medium leading-6 text-gray-900">Client Id</label>
            <div class="mt-2">
              <input id="clientid" name="clientid" type="text" autocomplete="text" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="clientId" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="clientToken" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Valider</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import router from "../router";
  
  const clientId = ref('');
  const clientToken = ref('');
  
  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Get the values entered by the user in the form fields
    const enteredClientId = clientId.value;
    const enteredClientToken = clientToken.value;
  
    // Store the values in localStorage
    localStorage.setItem("clientId", enteredClientId);
    localStorage.setItem("clientToken", enteredClientToken);
  
    // Redirect the user to the desired page (if needed)
    // For example, you can use Vue Router to handle navigation
    router.push({ name: 'Home' });
  };
  </script>