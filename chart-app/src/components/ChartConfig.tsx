import { useState } from "react";
import ChartComponent from "./ChartComponent";
import initChart from "../mock/chart";
import { Chart } from "../interfaces/interfaces";
import SearchFREDSeries from "./SearchSeries";

const ChartConfig = () => {
    const [charts, setCharts] = useState<Chart[]>([initChart]);

    const addChart = () => {
      const newChart: Chart = {
        id: Date.now(),
        seriesId: 'GDP',
        chartTitle: 'Chart Title',
        chartType: 'line',
        yAxisLabel: 'Value',
        timeFrequency: 'monthly',
      };
      setCharts([...charts, newChart]);
    };

    const removeChart = (id: number) => {
      setCharts(charts.filter((chart) => chart.id !== id));
    };

    const updateChartConfig = (id: number, updatedConfig: Partial<Chart>) => {
      setCharts(
        charts.map((chart) =>
          chart.id === id ? { ...chart, ...updatedConfig } : chart
        )
      );
    };

    const handleSeriesSelect = (id: string) => {
      const lastChartId = charts[charts.length - 1]?.id;
      if (lastChartId) {
        updateChartConfig(lastChartId, { seriesId: id });
      }
    };
  
    return (
      <div>
        <button onClick={addChart}>Add New Chart</button>
        <h2>Chart Configuration</h2>
        {charts.map((chart) => (
          <div key={chart.id} style={{ marginBottom: '20px' }}>
            <button onClick={() => removeChart(chart.id)}>Remove Chart</button>
            <br />
            <SearchFREDSeries onSelectSeries={handleSeriesSelect} />
            <label>
              Chart Title:
              <input type="text" value={chart.chartTitle} onChange={(e) => updateChartConfig(chart.id, { chartTitle: e.target.value })} />
            </label>
            <br />
            <label>
              Chart Type:
              <select value={chart.chartType} onChange={(e) => updateChartConfig(chart.id, { chartType: e.target.value as 'line' | 'bar' })}>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
              </select>
            </label>
            <br />
            <label>
              Y Axis Label:
              <input type="text" value={chart.yAxisLabel} onChange={(e) => updateChartConfig(chart.id, { yAxisLabel: e.target.value })} />
            </label>
            <br />
            <label>
              Time Frequency:
              <select value={chart.timeFrequency} onChange={(e) => updateChartConfig(chart.id, { timeFrequency: e.target.value as 'daily' | 'monthly' | 'yearly' })}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
            <ChartComponent
              seriesId={chart.seriesId}
              chartType={chart.chartType}
              chartTitle={chart.chartTitle}
              yAxisLabel={chart.yAxisLabel}
              timeFrequency={chart.timeFrequency}
            />
          </div>
        ))}
      </div>
    );
};

export default ChartConfig
  