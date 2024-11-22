<template>
  <div class="sm:w-[100%] lg:w-[50%] h-[20rem] mx-auto rounded-3xl">
    <img :class="imageClass" :src="imgArg" alt="Comment ça marche">
  </div>
</template>


<script>
export default {
  name: 'HowItsWorks',
  props: {
    imgArg: { type: String, default: "" },
    imgArgShadow: { type: Boolean, default: false },
    imgArgRounded: { type: Boolean, default: false },
    imgArgPosition: { type: String, default: 'center' },
    imgArgFit: { type: String, default: 'contain' },
  },
  computed: {
    imageClass() {
      let classes = `object-${this.imgArgFit} object-${this.imgArgPosition} w-full h-full`;
      if (this.imgArgShadow) classes += ' shadow-2xl';
      if (this.imgArgRounded) classes += ' rounded-xl';
      return classes;
    },
  }
}
</script>
