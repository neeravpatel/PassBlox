<script lang="ts" setup>
  import { ref } from 'vue'

  const length = ref(12)
  const includeUppercase = ref(true)
  const includeNumbers = ref(true)
  const includeSymbols = ref(true)
  const password = ref('')
  const showToast = ref(false) // State for showing the toast

  function generatePassword() {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

    let chars = lowercase
    if (includeUppercase.value) chars += uppercase
    if (includeNumbers.value) chars += numbers
    if (includeSymbols.value) chars += symbols

    let result = ''
    for (let i = 0; i < length.value; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    password.value = result
  }

  async function copyToClipboard() {
    if (password.value) {
      try {
        await navigator.clipboard.writeText(password.value)
        showToast.value = true // Show toast notification
        setTimeout(() => (showToast.value = false), 2000) // Hide toast after 2 seconds
      } catch (err) {
        console.error('Failed to copy password:', err)
      }
    }
  }
</script>

<template>
  <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">🔐 PassBlox</h2>

    <div class="flex items-center justify-between">
      <label for="length" class="text-sm font-medium text-gray-700">Password Length</label>
      <span class="text-sm font-mono text-gray-600">{{ length }}</span>
    </div>
    <input
      id="length"
      type="range"
      min="4"
      max="32"
      v-model="length"
      class="w-full"
    />

    <div class="space-y-2">
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="includeUppercase" />
        <span class="text-sm text-gray-700">Include Uppercase (A-Z)</span>
      </label>
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="includeNumbers" />
        <span class="text-sm text-gray-700">Include Numbers (0-9)</span>
      </label>
      <label class="flex items-center space-x-2">
        <input type="checkbox" v-model="includeSymbols" />
        <span class="text-sm text-gray-700">Include Symbols (!@#...)</span>
      </label>
    </div>

    <button
      @click="generatePassword"
      class="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Generate Password
    </button>

    <div v-if="password" class="bg-gray-100 p-3 rounded-md text-center font-mono text-lg break-all">
      {{ password }}
    </div>

    <div v-if="password" class="flex justify-center space-x-4">
      <button
        @click="copyToClipboard"
        class="bg-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-700 transition"
      >
        Copy to Clipboard
      </button>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg"
    >
      Password copied to clipboard!
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  accent-color: #2563eb; /* Tailwind's blue-600 */
}

.fixed {
  z-index: 50; /* Ensure the toast appears above other elements */
}
</style>
