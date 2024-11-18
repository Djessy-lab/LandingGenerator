<template>
  <div class="sm:w-[100%] lg:w-[50%] mx-auto rounded-3xl shadow-2xl">
    <img class="rounded-xl shadow-xl w-full h-96 object-cover" :src="imgArg" alt="Comment ça marche">
  </div>
</template>


<script>
export default {
  name: 'HowItsWorks',
  props: {
    imgArg: { type: String, default: "" },
  }
}
</script>
