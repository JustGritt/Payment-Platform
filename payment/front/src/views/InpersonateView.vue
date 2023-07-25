<script setup>
import UserCards from '@/components/components/UserCards.vue';
</script>

<template>
    <aside class="h-auto w-full overflow-scroll">
        <h1 class="sm:text-4xl text-center p-4">Select a User Account</h1>

        <div class="grid grid-cols-3 place-items-center px-4 justify-center gap-4">
            <UserCards
                name="John Doe"
                role="Admin"
            />

            <UserCards
                name="Jane Doe"
                role="User"
            />

            <UserCards
                name="John Wick"
                role="Admin"
            />
        </div>
    </aside>
</template>
