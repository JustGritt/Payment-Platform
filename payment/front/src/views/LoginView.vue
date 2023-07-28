<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit="handleSubmit" id="form" class="space-y-6" action="" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="email" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="password" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import router from "../router";
import apiService from '../services/apiService';
import { userState } from '../contexts/User'; // Import userState here

const email = ref('');
const password = ref('');

//check if the route is admin or login
const checkRoute = () => {
  if (router.currentRoute.value.name === 'login') {
    return true;
  }
  return false;
};

const sendAdminLogin = (data) => {
  apiService.adminLogin(data)
    .then((response) => {
      if (response.status === 200) {
        // Map the user data to the userState
        userState.user = response.data.user;
        userState.role = response.data.user.role || 'user';
        userState.token = response.data.token;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push({ name: 'home' });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendLogin = (data) => {
  apiService.login(data)
    .then((response) => {
      if (response.status === 200) {
        userState.user = response.data.user;
        userState.role = response.data.user.role || 'user';
        userState.token = response.data.token;
        console.log(userState)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push({ name: 'home' });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// Function to handle the form submission
const handleSubmit = (event) => {
  event.preventDefault();
  const data = {
    email: email.value,
    password: password.value
  };
  checkRoute() ? sendLogin(data) : sendAdminLogin(data);
};
</script>
