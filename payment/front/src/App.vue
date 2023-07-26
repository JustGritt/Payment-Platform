<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SideBar from './components/components/SideBar.vue';
import { userState } from './contexts/User.js';


const isLoggedIn = userState.user;
</script>

<template>
  <SideBar v-if="isLoggedIn" /> 
  <RouterView />
</template>


