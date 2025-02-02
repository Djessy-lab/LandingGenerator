<template>
  <div class="dark:bg-gray-900 dark:text-white min-h-screen">
    <Dashboard
      :user-email="userEmail"
      :user-id="userId"
      :user-image="userImage"
      :user-configs="userConfigs"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const { data: authData, getSession } = useAuth();

const userEmail = ref(null);
const userId = ref(null);
const userImage = ref(null);
const userConfigs = ref([]);

async function fetchUserConfigs(userId) {
  try {
    const response = await $fetch(`/api/getConfig?userId=${userId}`);
    if (response.error) {
      console.error(
        "Erreur lors de la récupération des configurations:",
        response.error,
      );
      return [];
    }
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des configurations:", error);
    return [];
  }
}

async function registerUser(userData) {
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: userData.email,
        name: userData.name,
        image: userData.image,
        provider: userData.provider,
      },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
    throw error;
  }
}

async function checkMagicLinkAuth() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await $fetch("/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      userEmail.value = response.email;
      userId.value = response.userId;
      userConfigs.value = await fetchUserConfigs(response.userId);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erreur lors de la vérification du magic link:", error);
    return false;
  }
}

watch(
  authData,
  async (newAuthData) => {
    if (newAuthData?.user) {
      try {
        const response = await registerUser(newAuthData.user);
        if (response.status === 200) {
          userEmail.value = newAuthData.user.email;
          userId.value = response.userId;
          userImage.value = newAuthData.user.image;
          userConfigs.value = await fetchUserConfigs(userId.value);
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'enregistrement de l'utilisateur:",
          error,
        );
      }
    }
  },
  { immediate: true },
);

onMounted(async () => {
  const session = await getSession();

  if (session?.accessToken) {
    localStorage.setItem("github_token", session.accessToken);
    localStorage.setItem("auth_provider", "github");
  }
  if (!authData.value?.user) {
    const isAuthenticated = await checkMagicLinkAuth();
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }
});

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/login",
  },
});
</script>
