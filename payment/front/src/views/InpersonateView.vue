<script setup>
import UserCards from '@/components/components/UserCards.vue';
</script>

<template>
    <aside class="h-auto w-full overflow-scroll">
        <h1 class="sm:text-4xl text-center p-4">Select a User Account</h1>

        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center px-4 justify-center gap-4">
            <UserCards name="John Doe" role="admin" />
            <UserCards name="Jane Doe" role="user" />
            <UserCards name="John Wick" role="admin" />
        </div>
    </aside>
</template>
