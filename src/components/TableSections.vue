<template>
  <div class="box-table-grid">
    <div class="box-table box-table-right">
      <table>
        <tr class="text-table-head">
          <th style="width: 13%;">nr</th>
          <th style="width: 20%;">date</th>
          <th style="width: 45%;">product name</th>
          <th style="width: 22%; text-align: right;">order volume</th>
        </tr>
        <template
          v-for="(order, index) in ordersByDateReversed"
          :key="order.id"

        >
          <tr class="text-table-body" v-if="index < 5">
            <td>{{order.id}}</td>
            <td>
              {{new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium'}).format(order.orderDate)}}
            </td>
            <td>{{order.orderProduct}}</td>
            <td style="text-align: right;">
              {{convertToEuroFormat(order.orderVolume)}}
            </td>
          </tr>
        </template>
      </table>
    </div>
    <div class="box-table box-table-left">
      <table>
        <tr class="text-table-head">
          <th style="width: 25%;">top 5 product</th>
          <th style="width: 58%;"></th>
          <th style="width: 17%; text-align: right;"></th>
        </tr>
        <template
          v-for="(product, index) in productsByOrderValue"
          :key="product.name"
        >
          <tr class="text-table-body" v-if="index < 5">
            <td>{{product.name}}</td>
            <td>
              <progress-bar
                :value="formatTargetValueToCSSWidth(product.volume, ordersTotal)"
                height="18px"
                backgroundColor="#26262C"
              />
            </td>
            <td style="text-align: right;">
              {{convertToEuroFormat(product.volume, 2)}}
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import { formatTargetValueToCSSWidth, convertToEuroFormat } from '@/utils';
import ProgressBar from './ProgressBar.vue';

export default {
  props: {
    orders: {
      required: true,
      type: Array,
    },
  },
  components: { ProgressBar },
  methods: {
    formatTargetValueToCSSWidth,
    convertToEuroFormat,
  },
  computed: {
    ordersTotal() {
      let sum = 0;
      for (let i = 0; i < this.orders.length; i += 1) {
        sum += this.orders[i].orderVolume;
      }
      return sum;
    },
    ordersByDateReversed() {
      const tmpOrders = this.orders;
      return tmpOrders.sort((a, b) => a.orderDate - b.orderDate).reverse();
    },
    productsByOrderValue() {
      const products = [];

      for (let i = 0; i < this.orders.length; i += 1) {
        const order = this.orders[i];

        const productIndex = products.findIndex((product) => product.name === order.orderProduct);

        if (productIndex === -1) {
          products.push({
            name: order.orderProduct,
            volume: order.orderVolume,
          });
        } else {
          products[productIndex].volume += order.orderVolume;
        }
      }
      return products.sort((a, b) => a.volume - b.volume).reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-table-grid {
  display: grid;
  grid-template-columns: 1fr 17px 1.3fr;
  grid-template-rows: 280px;
  grid-template-areas: "right . left";
}
.box-table {
  background-color: #26262C;
  padding: 27px 36px;

  &-right{
    grid-area: right
  }
  &-left{
    grid-area: left
  }
}

table, th, tr {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
table {
  border-spacing: 25px;
}
td {
  padding-top: 11px;
}
th {
  border-bottom: 2px solid #C4C4C4;
  padding-bottom: 3px;
}
</style>
