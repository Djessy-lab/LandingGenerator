<template>
  <div
    class="flex flex-col justify-center p-32 rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-600 transition-colors duration-500">
    <h2 class="text-center text-2xl mb-10 font-prompt">
      Se connecter avec un lien magique 🪄
    </h2>
    <input class="rounded-2xl p-2 text-center mb-10 min-w-64 dark:bg-gray-700" v-model="email" type="email"
      id="auth-email" placeholder="Entrez votre email" />
    <Button @click="loginWithMagic">
      Se connecter
    </Button>

    <h2 class="text-center text-2xl mb-10 font-prompt">
      Ou connectez-vous avec GitHub
    </h2>
    <Button @click="handleSignIn('github')" :level="4">
 Se connecter avec GitHub
    </Button>
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
    async handleSignIn(provider) {
      try {
        const response = await $fetch(`/api/auth/login`, {
          method: 'POST',
          body: { provider },
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          window.location.href = "/";
        } else {
          console.error("Erreur lors de la connexion avec GitHub:", response.message);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion avec GitHub:", error);
      }
    }
  },
};
</script>
