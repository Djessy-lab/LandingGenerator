<template>
  <div
    class="text-xl font-bold font-mono p-4 flex justify-between shadow-lg dark:shadow-2xl"
  >
    <a href="/">Landing Generator</a>
    <ThemeToggle size="sm" />
  </div>
  <div class="flex justify-center mt-20">
    <AuthLogin />
  </div>
</template>

<script>

export default {
  name: "Login",
};
</script>
