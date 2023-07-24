<script setup>
import { RouterLink, RouterView } from 'vue-router' 
import { inject } from 'vue'

const user  = inject('userState')

console.log(user.role)
</script>


<template>
    <aside class="max-w-[300px] w-full bg-red h-full border-r flex flex-col">
        <header>
            <img src="@/assets/logo/strapouz.svg" />
        </header>
        <nav class="px-8 pb-10 flex-1 flex flex-col justify-between">
            <div>
                <h1 class="font-blooming text-2xl text-neutral-400">Menu principal</h1>

                <div class="flex-col flex mt-2">
                    <router-link active-class="bg-gray-200"
                        class="px-4  transition-all py-2 group border border-neutral-200 rounded-xl hover:bg-gray-200 "
                        to="/"><i class="fad fa-home-lg-alt mr-2"></i>Home</router-link>
                    <router-link active-class="bg-gray-200"
                        class="px-4 transition-all py-2 group border border-neutral-200 rounded-xl hover:bg-gray-200 mt-2"
                        to="/transactions"><i class="fad fa-money-check mr-2"></i>Toutes les transactions</router-link>

                   
                    <router-link v-if ="user && user.role === 'admin'"  class="px-4 transition-all py-2 group border border-neutral-200 rounded-xl hover:bg-gray-200 mt-2"
                            to="/users">
                            <i class="fal fa-users mr-2"></i>Utilisateurs
                    </router-link>
                   

                    <router-link active-class="bg-gray-200"
                        class="px-4 transition-all py-2 group border border-neutral-200 rounded-xl hover:bg-gray-200 mt-2"
                        to="/settings">
                        <i class="fas fa-cog mr-2"></i>Paramètres
                    </router-link>
                </div>

                <h1 class="font-blooming text-2xl text-neutral-400 mt-3">Autres</h1>

                <div class="flex-col flex mt-1">
                    <router-link active-class="bg-gray-200"
                        class="px-4 transition-all py-2 group border border-neutral-200 rounded-xl hover:bg-gray-200 mt-2"
                        to="/logs">
                        <i class="fal fa-robot mr-2"></i>Logs
                    </router-link>
                   
                </div>
            </div>
            <button class=" rounded-xl hover:bg-transparent text-gray-400 hover:underline" to="/logs"><i class="far fa-sign-out-alt"></i> Déconnexion</button>
        </nav>
    </aside>
</template>