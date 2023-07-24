<script setup>
import UserCards from '@/components/components/UserCards.vue';
</script>
<template>
    <section class="w-full h-auto overflow-y-scroll">
        <h1 class="sm:text-4xl text-center p-4">Select a User Account</h1>

        <div class="grid grid-cols-3 place-items-center px-4 justify-center gap-10">
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
            <UserCards />
        </div>
    </section>
</template>

  