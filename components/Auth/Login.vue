<template>
  <div class="login-container">
      <p class="title">Sign-In Options:</p>
      <div class="form-container">
          <Button class="btn github" @click="signIn('github')">Github</Button>
      </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/',
  }
})
const { signIn } = useAuth()
</script>
