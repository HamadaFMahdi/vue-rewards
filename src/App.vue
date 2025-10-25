<script setup lang="ts">
import { ref } from 'vue'
import { useReward } from './composables/confetti'

// Example 1: Traditional string ID (backward compatible)
const { reward: confettiReward } = useReward('confetti-id', 'confetti');

// Example 2: Using template ref (new feature - Vue 3.5 style)
const balloonContainer = ref<HTMLElement | null>(null);
const { reward: balloonReward } = useReward(balloonContainer, 'balloons');

// Example 3: Using template ref with emoji
const emojiContainer = ref<HTMLElement | null>(null);
const { reward: emojiReward } = useReward(emojiContainer, 'emoji');

</script>

<script lang="ts">
export default {
  data() {
    return {
    };
  },
  methods: {
    conf() {
      const { reward: confettiReward, isAnimating: isConfettiAnimating } = this.$reward('options-api-id', 'confetti')
      confettiReward()
    }
  }
};
</script>

<template>
  <div style="padding: 20px;">
    <h1>Vue Rewards Demo</h1>
    
    <!-- Example 1: Traditional string ID -->
    <div style="margin: 20px 0;">
      <h2>Example 1: String ID (Traditional)</h2>
      <button @click="confettiReward">
        <span id="confetti-id"></span>
        🎉 Confetti (String ID)
      </button>
    </div>

    <!-- Example 2: Template Ref with Balloons -->
    <div style="margin: 20px 0;">
      <h2>Example 2: Template Ref (New Feature)</h2>
      <button @click="balloonReward">
        <span ref="balloonContainer"></span>
        🎈 Balloons (Template Ref)
      </button>
    </div>

    <!-- Example 3: Template Ref with Emoji -->
    <div style="margin: 20px 0;">
      <h2>Example 3: Template Ref with Emoji</h2>
      <button @click="emojiReward">
        <span ref="emojiContainer"></span>
        😀 Emoji (Template Ref)
      </button>
    </div>

    <!-- Example 4: Options API with String ID -->
    <div style="margin: 20px 0;">
      <h2>Example 4: Options API (String ID)</h2>
      <button @click="conf">
        <span id="options-api-id"></span>
        🎊 Confetti (Options API)
      </button>
    </div>
  </div>
</template>

<style scoped></style>
