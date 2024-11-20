<template>
  <div>
    <LandingHeroSection
      :imgHero="imgHero"
      :title="titleHero"
      :description="descriptionHero"
      :color="color"
      :appName="appName"
    />
  </div>
  <div>
    <LandingAdvantages :color="color" :advantages="advantages" :appName="appName" />
  </div>
  <div class="mt-32">
    <LandingHowItsWorks :imgArg="imgArg" />
  </div>
  <div>
    <LandingPricing :color="color" :pricing="pricing" />
  </div>
  <div>
    <LandingTestimonials :testimonials="testimonials" />
  </div>
  <div>
    <LandingGetEmail :color="color" />
  </div>
  <div class="absolute top-2 right-44 mt-3 mr-3">
    <ThemeToggle size="sm" />
  </div>
</template>
<script>
export default {
  name: "Page",
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
    configName: { type: String, default: "" },
    createdAt: { type: String, default: "" },
  },
};
</script>
