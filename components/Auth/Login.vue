<template>
  <div
    class="flex flex-col justify-center p-32 rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-600 transition-colors duration-500">
    <h2 class="text-center text-2xl mb-10 font-prompt">
      Se connecter avec GitHub
    </h2>
    <Button @click="loginWithGitHub" :level="4">
      Se connecter avec GitHub
      <Icon name="line-md:github" class="ml-2 h-5 w-5" />
    </Button>
  </div>
</template>

<script setup>
const { signIn } = useAuth()

const loginWithGitHub = async () => {
  try {
    await signIn('github', { callbackUrl: '/' })
  } catch (error) {
    console.error('Erreur lors de la connexion avec GitHub:', error)
  }
}
</script>
