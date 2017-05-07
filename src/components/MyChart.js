import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['reportData'],
  data() {
    return {
      chartData: this.reportData,
    }
  },
  mounted() {
    this.renderChart(this.chartData);
  },
})