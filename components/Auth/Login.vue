<template>
  <div class="flex flex-col md:flex-row items-center justify-center gap-8 p-8 md:p-16 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto">
    <div class="flex flex-col items-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full md:w-1/2">
      <h2 class="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        Se connecter avec un lien magique 🪄
      </h2>
      <input
        v-model="email"
        type="email"
        placeholder="Entrez votre email"
        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 mb-4 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        @click="loginWithMagic"
        class="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Se connecter</span>
        <span v-else class="flex items-center justify-center">
          <svg
            class="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Chargement...
        </span>
      </button>
    </div>

    <div class="flex flex-col items-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full md:w-1/2">
      <h2 class="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        Ou connectez-vous avec GitHub
      </h2>
      <button
        @click="handleSignIn('github')"
        class="w-full bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
      >
        Se connecter avec GitHub
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const { signIn } = useAuth();

async function handleSignIn(provider: string) {
  if (provider === 'github') {
    await signIn(provider, { callbackUrl: '/' });
  }
}

async function loginWithMagic() {
  isLoading.value = true;
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value },
    });

    if (response.status === 200) {
      alert('Vérifiez votre email pour le lien magique.');
      email.value = '';
    } else {
      console.error('Erreur:', response.message);
      alert('Impossible d’envoyer le lien magique.');
    }
  } catch (error) {
    console.error('Échec de la connexion:', error);
    alert('Une erreur est survenue.');
  } finally {
    isLoading.value = false;
  }
}
</script>
