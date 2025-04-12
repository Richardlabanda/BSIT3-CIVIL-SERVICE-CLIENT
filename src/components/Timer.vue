<template>
  <div>
    <p>Time Left: {{ timeLeft }} seconds</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    time: Number
  },
  data() {
    return {
      timeLeft: this.time,
      intervalId: null,
    };
  },
  watch: {
    time: function(newTime) {
      this.timeLeft = newTime;
      this.startTimer();
    },
  },
  methods: {
    startTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.intervalId);
          this.$emit('timer-ended');
        }
      }, 1000);
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>

<style scoped>
p {
  font-size: 18px;
}
</style>
