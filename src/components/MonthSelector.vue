<template>
  <div class="content">
    <div class="text-header-month">{{currentMonth}}</div>
    <div class="button-group">
      <arrow-button :disabled="isFirstMonth" direction="left" @pressed="changeSelectedMonth"/>
      <arrow-button :disabled="isLastMonth" direction="right" @pressed="changeSelectedMonth"/>
    </div>
  </div>
</template>

<script>
import ArrowButton from './ArrowButton.vue';

export default {
  components: { ArrowButton },
  props: ['availableMonth', 'selectedMonth'],
  data() {
    return {
    };
  },
  methods: {
    changeSelectedMonth(change) {
      this.$emit('changeSelectedMonth', this.selectedMonth + change);
    },
  },
  computed: {
    currentMonth() {
      return this.availableMonth[this.selectedMonth];
    },
    isFirstMonth() {
      if (this.selectedMonth === 0) return true;
      return false;
    },
    isLastMonth() {
      if (this.selectedMonth === this.availableMonth.length - 1) return true;
      return false;
    },
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 432px;
}
.button-group > *:not(:last-child){
  margin-right:9px;
}
.main {
  margin: 158px 0;
}
</style>
