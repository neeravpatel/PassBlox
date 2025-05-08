<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import PasswordGenerator from './components/PasswordGenerator.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div :class="{ 'dark': isDark }" class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 p-4 shadow-md">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white text-center">🔐 PassBlox</h1>
      <p class="text-center pt-4 text-gray-600 dark:text-gray-300">
        Instantly generate a secure, random password with customizable options.
      </p>
    </header>

    <main class="flex-grow flex justify-center p-4 bg-white dark:bg-gray-700">
      <div class="w-full max-w-2xl ">
        <password-generator />
      </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 p-4 shadow-md text-center text-gray-500 dark:text-gray-300">
      Developed by Neerav Patel | Powered by Netlify
    </footer>
    <button @click="toggleDark()" class="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
      <FontAwesomeIcon :icon="isDark ? faSun : faMoon" class="h-6 w-6 text-gray-700 dark:text-gray-300" />
    </button>
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
