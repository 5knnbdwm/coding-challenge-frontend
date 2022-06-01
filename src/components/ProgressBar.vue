<template>
  <div
    class="outter"
    :style="`height: ${height}; background-color: ${backgroundColor};`"
  >
    <div
      class="inner"
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
.outter {
  display: block;
  width: 100%;

  z-index: 1;
}
.inner {
  height: inherit;
  background-color: #2066D2;

  z-index:2;
}
</style>
