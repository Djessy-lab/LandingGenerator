<template>
  <div>
    <Dashboard :user-email="userEmail" :user-id="userId" :user-configs="userConfigs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userEmail = ref(null);
const userId = ref(null);
const userConfigs = ref([]);

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
  try {
    const response = await $fetch("/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
});

definePageMeta({
  middleware: "auth",
});
</script>
