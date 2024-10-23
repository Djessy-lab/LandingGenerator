<template>
  <div>
    <HeroSection :imgHero="imgHero" :title="titleHero" :description="descriptionHero" :color="color" :appName="appName" />
  </div>
  <div>
    <Advantages :color="color" :advantages="advantages" :appName="appName" />
  </div>
  <div>
    <HowItsWorks :imgArg="imgArg" />
  </div>
  <div>
    <Pricing :color="color" :pricing="pricing" />
  </div>
  <div>
    <Testimonials :testimonials="testimonials" />
  </div>
  <div>
    <GetEmail :color="color" />
  </div>
  <div class="absolute top-2 right-44 mt-3 mr-3">
    <ThemeToggle size="sm" />
  </div>
</template>
<script>

export default {
  name: 'Home',
  props: {
    titleHero: { type: String, default: "" },
    descriptionHero: { type: String, default: "" },
    color: { type: String, default: "blue" },
    imgHero: { type: String, default: "" },
    imgArg: { type: String, default: "" },
    advantages: { type: Array, default: () => [] },
    testimonials: { type: Array, default: () => [] },
    pricing: { type: Array, default: () => [] },
    appName: { type: String, default: "" },
  }
}
</script>
