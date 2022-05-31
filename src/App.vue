<template>
  <div class="app" v-if="!initialLoad">
    <div class="head">
      <div class="header">
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
      <div class="main">
        <div class="text-header-main">
          <!-- {{typeof ordersTotalCurrentMonth}} -->
          <!-- {{computedConvertToEuroText(ordersTotalCurrentMonth, 2)}} -->
          {{convertToEuroFormat(ordersTotalCurrentMonth, 2)}}
          </div>
      </div>
      <!-- <div class="target">

      </div> -->
      <code class="text-header-refresh">
        <!-- {{ordersTotalCurrentMonth}}
        {{ordersCurrentMonth}} -->
        <!-- {{convertToEuroFormat(targetCurrentMonth.value,0)}} -->
      </code>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import MonthSelector from '@/components/MonthSelector.vue';
import { fetchOrders, fetchTargets } from './api/googleSheets';
import { convertToEuroFormat } from './utils';

export default {
  name: 'App',
  components: {
    MonthSelector,
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
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
}
.head {
  padding: 37px 36px;
}
.header {
  display: flex;
  justify-content: space-between;
}

</style>
