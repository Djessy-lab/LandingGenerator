<template>
  <div
    class="flex flex-col justify-center p-32 rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-800 transition-colors duration-500">
    <Toast :modelValue="isToastVisible" :title="toast.title" :message="toast.message" :type="toast.type"
      @update:modelValue="isToastVisible = false" />
    <h2 class="text-center text-2xl mb-8 font-prompt">Se connecter avec</h2>
    <div class="flex flex-col gap-4">
      <Button @click="loginWithGitHub" :level="4">
        <Icon name="line-md:github-loop" class="h-5 w-5 mr-4 items-center" />
        GitHub
      </Button>
      <Button @click="loginWithGoogle" :level="4">
        <Icon name="devicon:google" class="h-5 w-5 mr-4 items-center" />
        Google
      </Button>
      <div class="border-b-2 border-gray-200 dark:border-gray-700 mt-8" />
      <h3 class="text-center text-2xl mt-10 font-prompt">
        Ou connectez-vous avec un lien magique 🪄
      </h3>
      <input class="rounded-2xl p-2 text-center mb-4 min-w-64 dark:bg-gray-700" v-model="email" type="email"
        id="auth-email" placeholder="Entrez votre email" />
      <Button v-if="!isLoading" @click="loginWithMagic"> Se connecter </Button>
      <span v-if="isLoading" class="flex items-center justify-center">
        <Icon name="line-md:loading-loop" class="w-10 h-10 text-gray-600 dark:text-slate-700" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  emits: ["authenticated"],
  data() {
    return {
      email: "",
      isLoading: false,
      isToastVisible: false,
      toast: {
        title: "",
        message: "",
        type: "",
      },
    };
  },
  methods: {
    async loginWithMagic() {
      this.isLoading = true;
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email: this.email },
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          this.triggerToast(response);
          this.$emit("authenticated", this.email);
          this.email = "";
        } else {
          console.error("Erreur:", response.message);
        }
        this.isLoading = false;
      } catch (error) {
        console.error("Échec de la connexion:", error);
      }
    },
    async loginWithGitHub() {
      const { signIn } = useAuth();
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://landing-generator-brown.vercel.app";
      try {
        await signIn("github", {
          callbackUrl: `${baseUrl}/`,
        });
      } catch (error) {
        console.error("Erreur lors de la connexion avec GitHub:", error);
      }
    },
    async loginWithGoogle() {
      const { signIn } = useAuth();
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://landing-generator-brown.vercel.app";
      try {
        await signIn("google", {
          callbackUrl: `${baseUrl}/`,
        });
      } catch (error) {
        console.error("Erreur lors de la connexion avec Google:", error);
      }
    },
    triggerToast(result) {
      this.toast.title = result.error ? "Erreur" : "Succès";
      this.toast.message = result.message;
      this.toast.type = result.error ? "error" : "success";
      this.isToastVisible = true;
    },
  },
};
</script>
