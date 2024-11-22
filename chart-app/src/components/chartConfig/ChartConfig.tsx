import { useState } from "react";
import ChartComponent from "../ChartComponent";
import initChart from "../../mock/chart";
import { Chart } from "../../interfaces/interfaces";
import SearchFREDSeries from "../SearchSeries";
import "./ChartConfig.css"

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
              <h2>Chart Configuration</h2>
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
              <br />
              {chart.chartType === 'line' && (
              <>
                <label>
                  Line Color:
                  <input
                    type="color"
                    value={chart.lineColor}
                    onChange={(e) => updateChartConfig(chart.id, { lineColor: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  Line Style:
                  <select
                    value={chart.lineStyle}
                    onChange={(e) => updateChartConfig(chart.id, { lineStyle: e.target.value as 'solid' | 'dashed' })}
                  >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                  </select>
                </label>
                <br />
              </>
            )}
            {chart.chartType === 'bar' && (
              <>
                <label>
                  Bar Color:
                  <input
                    type="color"
                    value={chart.barColor}
                    onChange={(e) => updateChartConfig(chart.id, { barColor: e.target.value })}
                  />
                </label>
                <br />
              </>
            )}
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
  