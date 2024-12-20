<template>
  <div class="flex flex-col w-[60%] gap-4">
    <transition-group name="fade" tag="div">
      <div
        v-if="isLoading"
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center justify-center transition-opacity duration-600"
      >
        <div
          v-if="currentStep === index"
          class="p-4 w-full h-24 flex items-center justify-center rounded-lg bg-slate-800 dark:bg-slate-600 shadow-xl animate-blink"
        >
          <span class="text-white text-xl font-semibold flex"
            >{{ step
            }}<Icon name="line-md:loading-alt-loop" class="w-6 h-6 ml-2"
          /></span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "GithubLoader",
  props: {
    isLoading: { type: Boolean, default: true },
  },
  data() {
    return {
      steps: ["Git add", "Git commit", "Git push"],
      currentStep: 0,
    };
  },
  watch: {
    isLoading(newVal) {
      if (newVal) {
        this.startLoading();
      } else {
        this.currentStep = 0;
      }
    },
  },
  methods: {
    startLoading() {
      this.steps.forEach((step, index) => {
        setTimeout(() => {
          this.currentStep = index;
          if (index === this.steps.length - 1) {
            setTimeout(() => {
              this.$emit("update:isLoading", false);
            }, 5000);
          }
        }, index * 5000);
      });
    },
  },
};
</script>

<style>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-blink {
  animation: blink 3s infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
