import { Chart } from "../interfaces/interfaces";

const initChart: Chart = {
    id: Date.now(),
    seriesId: 'GDP',
    chartTitle: 'Chart 1',
    chartType: 'line',
    yAxisLabel: 'value',
    timeFrequency: 'monthly',
    lineColor: '#7c2d2d',
    barColor: 'rgba(75, 192, 192, 1)',
    lineStyle: 'solid',
  };
  
  export default initChart;