import { useState } from "react";
import ChartComponent from "../chartComponent/ChartComponent";
import SearchFREDSeries from "../searchSeries/SearchSeries";
import SearchResult from "../searchResult/SearchResult";
import { Chart } from "../../interfaces/interfaces";
import initChart from "../../mock/chart";
import "./ChartConfig.css";
import ChartCustomization from "../chartCustomization/ChartCustomization";

const ChartConfig = () => {
    const [charts, setCharts] = useState<Chart[]>([initChart]);

    const addChart = () => {
      const newChart: Chart = {
        id: Date.now(),
        seriesId: 'UNRATE',
        chartTitle: 'Chart Title',
        chartType: 'line',
        yAxisLabel: 'Value',
        timeFrequency: 'monthly',
        lineColor: '#7c2d2d',
        barColor: 'rgba(75, 192, 192, 1)',
        lineStyle: 'solid',
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
        {charts.map((chart) => (
          <div className="config-chart-contaier">
            <div className="config-container" key={chart.id} style={{ marginBottom: '20px' }}>
              <h2 className="chart-config-title">Chart Configuration</h2>
              <button onClick={() => removeChart(chart.id)}>Remove Chart</button>
              <br />
              <SearchFREDSeries />
              <ChartCustomization updateChartConfig={updateChartConfig} chart={chart} />
              <SearchResult onSelectSeries={handleSeriesSelect} />
            </div>
            <div className="chart-container">
              <ChartComponent
                seriesId={chart.seriesId}
                chartType={chart.chartType}
                chartTitle={chart.chartTitle}
                yAxisLabel={chart.yAxisLabel}
                timeFrequency={chart.timeFrequency}
                lineColor={chart.lineColor}
                barColor={chart.barColor}
                lineStyle={chart.lineStyle}
              />
            </div>
          </div>
        ))}
      </div>
    );
};

export default ChartConfig
  