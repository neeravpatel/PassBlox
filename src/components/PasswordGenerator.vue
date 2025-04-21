<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

// Register the FontAwesomeIcon component
const length = ref(14)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const password = ref('')
const copyButtonText = ref('Copy to Clipboard') // State for button text

function generatePassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

  let chars = ''
  if (includeLowercase.value) chars += lowercase
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
      copyButtonText.value = 'Copied!' // Change button text
      setTimeout(() => (copyButtonText.value = 'Copy to Clipboard'), 2000) // Reset text after 2 seconds
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }
}

// Generate a password when the component is mounted
onMounted(() => {
  generatePassword()
})
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-8">
    <!-- Header -->
    <h2 class="text-3xl font-bold text-gray-800 text-center">🔐 PassBlox</h2>
    <p class="text-center text-gray-600">
      Instantly generate a secure, random password with customizable options.
    </p>

    <!-- Password Display with Generate Button -->
    <div class="flex items-center justify-between bg-gray-100 p-4 rounded-md text-center font-mono text-lg break-all">
      <span class="mr-4">{{ password }}</span> <!-- Added margin-right -->
      <button
        @click="generatePassword"
        class="flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        <FontAwesomeIcon :icon="faArrowsRotate" class="hover:animate-[spin_.5s_ease_1]" />
      </button>
    </div>

    <!-- Controls -->
    <div class="space-y-4">
      <!-- Password Length -->
      <div>
        <label for="length" class="block text-sm font-medium text-gray-700">
          Password Length: <span class="font-mono">{{ length }}</span>
        </label>
        <input
          id="length"
          type="range"
          min="5"
          max="64"
          v-model="length"
          class="w-full mt-2"
        />
      </div>

      <!-- Options -->
      <div class="grid grid-cols-2 gap-4">
        <label class="flex items-center space-x-3">
          <input
            type="checkbox"
            v-model="includeUppercase"
            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700">Include Uppercase</span>
        </label>
        <label class="flex items-center space-x-3">
          <input
            type="checkbox"
            v-model="includeLowercase"
            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700">Include Lowercase</span>
        </label>
        <label class="flex items-center space-x-3">
          <input
            type="checkbox"
            v-model="includeNumbers"
            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700">Include Numbers</span>
        </label>
        <label class="flex items-center space-x-3">
          <input
            type="checkbox"
            v-model="includeSymbols"
            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700">Include Symbols</span>
        </label>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
      <button
        v-if="password"
        @click="copyToClipboard"
        :class="{
          'bg-blue-800 hover:bg-blue-600': copyButtonText === 'Copy to Clipboard',
          'bg-green-600 hover:bg-green-700': copyButtonText === 'Copied!'
        }"
        class="w-full text-white font-semibold py-2 rounded-lg transition"
      >
        {{ copyButtonText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  accent-color: #2563eb; /* Tailwind's blue-600 */
}

.fixed {
  z-index: 50; /* Ensure the toast appears above other elements */
}
</style>
