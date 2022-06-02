<template>
  <div class="container">
    <div class="box-target">
      <div class="box-target-inner">
        <div class="text-main-target">
          {{convertToEuroFormat(target.targetValue,0)}}
        </div>
        <div class="indicator-line"></div>
      </div>
    </div>
    <div class="box-progress-bar">
      <progress-bar
        :value="formatTargetValueToCSSWidth(ordersValue, target.targetValue)"
        height="47px"
        backgroundColor="#2F2F2F"
      />
    </div>
  </div>
</template>

<script>
import { formatTargetValueToCSSWidth, convertToEuroFormat } from '@/utils';
import ProgressBar from './ProgressBar.vue';

export default {
  props: ['target', 'ordersValue'],
  components: { ProgressBar },
  methods: {
    formatTargetValueToCSSWidth,
    convertToEuroFormat,
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 119px;
}
.box-target {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: 119px;
  grid-template-areas: ". . . . target";
  z-index: 2;
}
.box-target-inner{
  grid-area: target;
  height:inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.indicator-line{
  width: 6px;
  height: 79px;

  background-color: #C4C4C4;
  z-index: 10;
}
.box-progress-bar {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: 56px 0 0 0;
}
</style>
