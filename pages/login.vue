<template>
  <div class="text-xl font-bold font-mono">
    <a href="/">{{ appName }}</a>
  </div>
  <div class="flex justify-center mt-20">
    <AuthLogin :color="color" />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      color: this.$route.query.color,
      appName: this.$route.query.appName,
    };
  },
};
</script>
