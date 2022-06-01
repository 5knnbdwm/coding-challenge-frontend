<template>
  <div
    class="bar-box"
    :style="`height: ${height}; background-color: ${backgroundColor};`"
  >
    <div
      class="bar"
      :style="`width: ${value};`"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String,
    },
    height: {
      required: true,
      type: String,
    },
    backgroundColor: {
      required: false,
      type: String,
      default: 'rgba(0, 0, 0, 1)',
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-box {
  display: block;
  width: 100%;

  z-index: 1;
}
.bar {
  height: inherit;
  background-color: #2066D2;

  z-index:2;
}
</style>
