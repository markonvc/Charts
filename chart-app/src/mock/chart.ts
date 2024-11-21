import { Chart } from "../interfaces/interfaces";

const initChart: Chart = {
    id: Date.now(),
    seriesId: 'GDP',
    chartTitle: 'Chart 1',
    chartType: 'line',
    yAxisLabel: 'value',
    timeFrequency: 'monthly',
  };
  
  export default initChart;