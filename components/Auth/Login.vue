<template>
  <div
    class="flex flex-col justify-center p-32 rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-600 transition-colors duration-500"
  >
    <h2 class="text-center text-2xl mb-10 font-prompt">
      Se connecter avec un lien magique 🪄
    </h2>
    <input
      class="rounded-2xl p-2 text-center mb-10 min-w-64 dark:bg-gray-700"
      v-model="email"
      type="email"
      id="auth-email"
      placeholder="Entrez votre email"
    />
    <button
      :class="`bg-gray-800 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-100  p-2 h-10 rounded-lg ml-2 min-w-64`"
      @click="loginWithMagic"
    >
      Se connecter
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  emits: ["authenticated"],
  data() {
    return {
      email: "",
    };
  },
  props: {
    color: { type: String, default: "blue" },
  },
  methods: {
    async loginWithMagic() {
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email: this.email },
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          alert("Vérifiez votre email pour le lien magique.");
          this.$emit("authenticated", this.email);
          this.email = "";
        } else {
          console.error("Erreur:", response.message);
        }
      } catch (error) {
        console.error("Échec de la connexion:", error);
      }
    },
  },
};
</script>
