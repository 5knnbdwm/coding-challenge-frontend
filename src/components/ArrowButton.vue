<template>
  <button class="outer" :class="disabled ? 'disabled': ''" @click="buttonClicked">
    <div class="inner">
      <img :src="fileForDirection" alt="arrow">
    </div>
</button>
</template>

<script>
import arrowLeft from '@/assets/arrow_left.svg';
import arrowRight from '@/assets/arrow_right.svg';

export default {
  props: ['disabled', 'direction'],
  data() {
    return {
      arrowLeft,
      arrowRight,
    };
  },
  methods: {
    buttonClicked() {
      if (!this.disabled) {
        if (this.direction === 'left') this.$emit('pressed', -1);
        if (this.direction === 'right') this.$emit('pressed', 1);
      }
    },
  },
  computed: {
    fileForDirection() {
      if (this.direction === 'left') return arrowLeft;
      if (this.direction === 'right') return arrowRight;
      return arrowLeft;
    },
  },
};
</script>

<style lang="scss" scoped>
.outer {
  display:inline-block;
  background-color: #26262C;
  border:none;
  border-radius: 5px;
  padding: 10px;
}
.inner {
  height: 33px;
  width: 33px;
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
}
</style>
