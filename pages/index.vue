<template>
  <div>
    <Dashboard v-if="isAuthenticated" :user-email="userEmail" :user-id="userId" :user-configs="userConfigs" />
    <div v-else>
      <p>Veuillez vous connecter pour accéder à cette page.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userEmail = ref(null);
const userId = ref(null);
const userConfigs = ref([]);
const { user, isAuthenticated } = useAuth();

async function fetchUserConfigs(userId) {
  try {
    const response = await $fetch(`/api/getConfig?userId=${userId}`);
    if (response.error) {
      console.error("Erreur lors de la récupération des configurations:", response.error);
      return [];
    }
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des configurations:", error);
    return [];
  }
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await $fetch("/api/auth/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        userEmail.value = response.email;
        userId.value = response.userId;
        userConfigs.value = await fetchUserConfigs(userId.value);
      } else {
        console.error("Erreur lors de la récupération de l'utilisateur:", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  } else if (isAuthenticated) {
    userEmail.value = user.email;
    userId.value = user.id;
    userConfigs.value = await fetchUserConfigs(userId.value);
  }
});

definePageMeta({
  middleware: "auth",
});
</script>
