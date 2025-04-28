<script setup lang="ts">
import PasswordGenerator from "./components/PasswordGenerator.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <header class="bg-white p-4 shadow-md">
      <h1 class="text-3xl font-bold text-gray-800 text-center">🔐 PassBlox</h1>
      <p class="text-center pt-4 text-gray-600">
        Instantly generate a secure, random password with customizable options.
      </p>
    </header>

    <main class="flex-grow flex justify-center p-4">
      <div class="w-full max-w-2xl">
        <password-generator />
      </div>
    </main>

    <footer class="bg-white p-4 shadow-md text-center text-gray-500">
      Developed by Neerav Patel | Powered by Netlify
    </footer>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
