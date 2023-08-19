<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useReward } from './composables/confetti'
const {reward: confettiReward, isAnimating: isConfettiAnimating} = useReward('fsfsfdsfdsf', 'confetti');

onMounted(() => {
  confettiReward()
})

</script> -->

<script lang="ts">
export default {
  data() {
    return {
    };
  },
  methods: {
    conf() {
      const { reward: confettiReward, isAnimating: isConfettiAnimating } = this.$reward('g', 'confetti')
      confettiReward()
    }
  }
};
</script>

<template>
  <div>
    <button @click="conf">
      <span id="fsfsfdsfdsf"></span>
      🎉
    </button>


  </div>
</template>

<style scoped></style>
