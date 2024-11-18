<template>
  <div class="flex justify-center p-10">
    <Icon name="line-md:loading-loop" class="w-48 h-48 text-gray-600" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const { token, email } = route.query;
  console.log("VERIFY", token);

  if (token && email) {
    try {
      const response = await $fetch(`/api/auth/verify?token=${token}&email=${email}`);

      if (response.status === 200) {
        router.push("/");
      } else {
        console.error("Erreur:", response.message);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
    }
  } else {
    console.error("Token ou email manquant.");
  }
});
</script>
