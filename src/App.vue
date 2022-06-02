<template>
  <div class="loaded" v-if="!initialLoad">
    <div class="box-head">
      <div class="box-header">
        <div class="text-header-month-label">
          Order Dashboard
        </div>
        <div class="text-header-refresh">
          Refresh in <span class="text-header-refresh-number">{{timeRemaining}}</span>
        </div>
      </div>
      <month-selector
        :availableMonth="availableMonth"
        :selectedMonth="selectedMonth"
        @changeSelectedMonth="newSelectedMonth"
      />
    </div>
    <div class="box-main">
      <div class="text-main">
        {{convertToEuroFormat(ordersTotalCurrentMonth, 2)}}
      </div>
    </div>
    <div class="box-target">
      <target-section :target="targetCurrentMonth" :ordersValue="ordersTotalCurrentMonth" />
    </div>

    <div class="box-table">
      <table-sections :orders="ordersCurrentMonth"/>
    </div>
  </div>
  <img class="background" :src="backgroundArt" alt="backgroundArt">
</template>

<script>
import MonthSelector from '@/components/MonthSelector.vue';
import TargetSection from '@/components/TargetSection.vue';
import TableSections from '@/components/TableSections.vue';

import { fetchOrders, fetchTargets } from '@/api/googleSheets';
import { convertToEuroFormat } from '@/utils';

import backgroundArt from '@/assets/background_art.svg';

export default {
  name: 'App',
  components: {
    MonthSelector,
    TargetSection,
    TableSections,
  },
  data() {
    return {
      backgroundArt,
      orders: [],
      targets: [],
      selectedMonth: 0,
      timeRemaining: 60,
      timeRemainingTimer: null,
      initialLoad: true,
    };
  },
  methods: {
    reduceTimer() {
      this.timeRemaining -= 1;
      if (this.timeRemaining === 0) {
        this.timeRemaining = 60;
        this.getGoogleSheetData();
      }
    },
    async getGoogleSheetData() {
      this.orders = await fetchOrders();
      this.targets = await fetchTargets();
      this.initialLoad = false;
    },
    newSelectedMonth(change) {
      this.selectedMonth = change;
    },
    convertToEuroFormat,
  },
  computed: {
    availableMonth() {
      const month = [];
      this.orders.forEach((element) => {
        if (!month.includes(element.orderDateText)) {
          month.push(element.orderDateText);
        }
      });
      return month;
    },
    ordersCurrentMonth() {
      return this.orders
        .filter((order) => order.orderDateText === this.availableMonth[this.selectedMonth]);
    },
    ordersTotalCurrentMonth() {
      let sum = 0;
      for (let i = 0; i < this.ordersCurrentMonth.length; i += 1) {
        sum += this.ordersCurrentMonth[i].orderVolume;
      }
      return sum;
    },
    targetCurrentMonth() {
      const currentMonth = this.availableMonth[this.selectedMonth].split(' ')[0];
      return this.targets.find((month) => month.month === currentMonth);
    },
  },
  mounted() {
    this.getGoogleSheetData();
    this.timeRemainingTimer = setInterval(() => {
      this.reduceTimer();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timeRemainingTimer);
  },
};
</script>

<style lang="scss">
@import './scss/fonts.scss';

#app {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
}
* {
  z-index: inherit;
}
</style>

<style lang="scss" scoped>
.loaded {
  padding: 36px 0;
  z-index: 1;
}
.background {
  position: absolute;
  width: 1250.4px;
  height: 1234.97px;
  right: -680px;
  top: -480px;
  transform: rotate(-17deg);
  z-index:0;
}
.box-head {
  padding: 0 37px ;
}
.box-header {
  display: flex;
  justify-content: space-between;
}
.box-main {
  padding: 0 37px ;
  margin: 158px 0 101px 0;
  overflow: hidden;
}
.box-target {
  padding: 0 37px ;
}
.box-table {
  // padding: 0 37px ;
  margin-top: 43px;
}
</style>
