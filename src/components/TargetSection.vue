<template>
  <div class="container">
    <div class="target-box">
      <div class="target-box-inner">
        <div class="text-main-target">
          {{convertToEuroFormat(target.targetValue,0)}}
        </div>
        <div class="indicator-line"></div>
      </div>
    </div>
    <div class="bar-box">
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
  // display: inline-flex;
  // width: calc(100% - (36px * 2));
  width: 100%;
  height: 119px;
}
.target-box {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: auto;
  grid-template-areas: ". . . . target";
  height:119px;
  z-index: 2
}
.target-box-inner{
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
  z-index:10;
}
.bar-box {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  // left:
  // right:0;
  // display: inline-flex;
  // width: inherit;
  // width:;
  margin: 28px 0 0 0;
}
</style>
