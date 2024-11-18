<template>
  <div>
    <Dashboard :user-email="userEmail" :user-id="userId" :user-configs="userConfigs" />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      currentConfig: null,
      userEmail: null,
      userId: null,
      userConfigs: [],
    };
  },
  async mounted() {
    try {
      const response = await $fetch("/api/auth/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        this.userEmail = response.email;
        this.userId = response.userId;
        this.userConfigs = await this.fetchUserConfigs(this.userId);
      } else {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          response.message
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  },
  methods: {
    async fetchUserConfigs(userId) {
      try {
        const response = await $fetch(`/api/getConfig?userId=${userId}`);
        if (response.error) {
          console.error(
            "Erreur lors de la récupération des configurations:",
            response.error
          );
          return [];
        }
        return response;
      } catch (error) {
        console.error("Erreur lors de la récupération des configurations:", error);
        return [];
      }
    },
  },
};
definePageMeta({
  middleware: "auth",
});
</script>
