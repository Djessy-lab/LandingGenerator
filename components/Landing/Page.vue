<template>
  <div class="relative">
    <div>
      <LandingHeroSection
        :imgHero="imgHero"
        :title="titleHero"
        :description="descriptionHero"
        :imgHeroShadow="imgHeroShadow"
        :imgHeroRounded="imgHeroRounded"
        :imgHeroPosition="imgHeroPosition"
        :imgHeroFit="imgHeroFit"
        :imgHeroWidth="imgHeroWidth"
        :imgHeroHeight="imgHeroHeight"
        :color="color"
        :buttonAndCardsColor="getButtonColor"
        :appName="appName"
      />
    </div>
    <div>
      <LandingAdvantages
        :color="color"
        :advantages="advantages"
        :appName="appName"
      />
    </div>
    <div>
      <LandingHowItsWorks
        :imgArg="imgArg"
        :imgArgShadow="imgArgShadow"
        :imgArgRounded="imgArgRounded"
        :imgArgPosition="imgArgPosition"
        :imgArgFit="imgArgFit"
        :imgArgWidth="imgArgWidth"
        :imgArgHeight="imgArgHeight"
      />
    </div>
    <div>
      <LandingPricing
        :color="color"
        :pricing="pricing"
        :buttonAndCardsColor="getCardsColor"
      />
    </div>
    <div>
      <LandingTestimonials :testimonials="testimonials" />
    </div>
    <div>
      <LandingGetEmail :color="color" :buttonAndCardsColor="getButtonColor" />
    </div>
    <div class="absolute top-2 right-44 mt-3 mr-3">
      <ThemeToggle size="sm" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Page",
  props: {
    titleHero: { type: String, default: "" },
    descriptionHero: { type: String, default: "" },
    color: { type: String, default: "blue" },
    buttonAndCardsColor: { type: String, default: "" },
    imgHero: { type: String, default: "" },
    imgArg: { type: String, default: "" },
    imgHeroShadow: { type: Boolean, default: false },
    imgHeroRounded: { type: Boolean, default: false },
    imgArgShadow: { type: Boolean, default: false },
    imgArgRounded: { type: Boolean, default: false },
    imgHeroPosition: { type: String, default: "center" },
    imgHeroFit: { type: String, default: "contain" },
    imgArgPosition: { type: String, default: "center" },
    imgArgFit: { type: String, default: "contain" },
    imgHeroWidth: { type: String, default: "50" },
    imgHeroHeight: { type: String, default: "50" },
    imgArgWidth: { type: String, default: "50" },
    imgArgHeight: { type: String, default: "50" },
    advantages: { type: Array, default: () => [] },
    testimonials: { type: Array, default: () => [] },
    pricing: { type: Array, default: () => [] },
    appName: { type: String, default: "" },
    configName: { type: String, default: "" },
    createdAt: { type: String, default: "" },
  },
  computed: {
    getButtonColor() {
      return this.buttonAndCardsColor || "bg-gray-900";
    },
    getCardsColor() {
      return this.buttonAndCardsColor || "bg-gray-200";
    },
  },
};
</script>
