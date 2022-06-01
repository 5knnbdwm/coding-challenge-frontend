<template>
  <div class="app" v-if="!initialLoad">
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
      <div class="box-main">
        <div class="text-main">
          {{convertToEuroFormat(ordersTotalCurrentMonth, 2)}}
        </div>
      </div>
      <target-section :target="targetCurrentMonth" :ordersValue="ordersTotalCurrentMonth" />
    </div>
    <!-- <div class="content"></div> -->
  </div>
</template>

<script>
import MonthSelector from '@/components/MonthSelector.vue';
import TargetSection from '@/components/TargetSection.vue';

import { fetchOrders, fetchTargets } from './api/googleSheets';
import { convertToEuroFormat } from './utils';

export default {
  name: 'App',
  components: {
    MonthSelector,
    TargetSection,
  },
  data() {
    return {
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
</style>

<style lang="scss" scoped>
.app {
  // width: 100vw;
  // height: 100vh;
  background-color: rgb(0, 0, 0);
  padding: 36px 0;
}
.box-head {
  padding: 0 37px ;
}
.box-header {
  display: flex;
  justify-content: space-between;
}
.box-main {
  margin: 158px 0 101px 0;
}
</style>
