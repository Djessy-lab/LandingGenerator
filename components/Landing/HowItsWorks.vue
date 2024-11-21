<template>
  <div class="sm:w-[100%] lg:w-[50%] mx-auto rounded-3xl">
    <img class="rounded-xl w-full h-full shadow-2xl object-contain" :src="imgArg" alt="Comment ça marche">
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
