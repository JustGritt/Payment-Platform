<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/components/SideBar.vue';
import { userState } from './contexts/User.js';

import { computed } from 'vue';
const isLoggedIn = computed(() => !!userState.user);

</script>

<template>
  <SideBar v-if="isLoggedIn" /> 
  <RouterView />
</template>


