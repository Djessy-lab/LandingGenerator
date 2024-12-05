<template>
  <div class="flex items-center gap-4">
    <template v-if="status === 'authenticated' && data">
      <img
        v-if="data.user?.image"
        :src="data.user.image"
        :alt="data.user?.name || 'Avatar'"
        class="w-8 h-8 rounded-full"
      />
      <span class="text-sm">{{ data.user?.name || data.user?.email }}</span>
      <button
        @click="handleSignOut"
        class="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Se déconnecter
      </button>
    </template>
    <template v-else-if="status === 'loading'">
      <span class="text-sm">Chargement...</span>
    </template>
  </div>
</template>

<script setup>
const { status, data, signOut } = useAuth()

const handleSignOut = async () => {
  try {
    await signOut({ callbackUrl: '/login' })
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}
</script>
