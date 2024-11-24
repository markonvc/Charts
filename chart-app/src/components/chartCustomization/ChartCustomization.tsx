import { Chart } from "../../interfaces/interfaces";
import "./ChartCustomization.css";

interface ChartCustomizationProps {
  chart: Chart;
  updateChartConfig: (id: number, updatedConfig: Partial<Chart>) => void;
}

const ChartCustomization = ({ chart, updateChartConfig }: ChartCustomizationProps) => {
  return (
<div className="customization-container">
  <div className="form-row">
    <label htmlFor="chartTitle">Chart Title:</label>
    <input
      type="text"
      id="chartTitle"
      value={chart.chartTitle}
      onChange={(e) => updateChartConfig(chart.id, { chartTitle: e.target.value })}
    />
  </div>

  <div className="form-row">
    <label htmlFor="chartType">Chart Type:</label>
    <select
      id="chartType"
      value={chart.chartType}
      onChange={(e) =>
        updateChartConfig(chart.id, { chartType: e.target.value as "line" | "bar" })
      }
    >
      <option className="test" value="line">Line</option>
      <option className="test" value="bar">Bar</option>
    </select>
  </div>

  <div className="form-row">
    <label htmlFor="yAxisLabel">Y Axis Label:</label>
    <input
      type="text"
      id="yAxisLabel"
      value={chart.yAxisLabel}
      onChange={(e) => updateChartConfig(chart.id, { yAxisLabel: e.target.value })}
    />
  </div>

  <div className="form-row">
    <label htmlFor="timeFrequency">Time Frequency:</label>
    <select
      id="timeFrequency"
      value={chart.timeFrequency}
      onChange={(e) =>
        updateChartConfig(chart.id, {
          timeFrequency: e.target.value as "daily" | "monthly" | "yearly",
        })
      }
    >
      <option value="daily">Daily</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>

  {chart.chartType === "line" && (
    <>
      <div className="form-row" id="color-bar">
        <label htmlFor="lineColor">Line Color:</label>
        <input
          type="color"
          id="lineColor"
          value={chart.lineColor}
          onChange={(e) => updateChartConfig(chart.id, { lineColor: e.target.value })}
        />
      </div>

      <div className="form-row">
        <label htmlFor="lineStyle">Line Style:</label>
        <select
          id="lineStyle"
          value={chart.lineStyle}
          onChange={(e) =>
            updateChartConfig(chart.id, { lineStyle: e.target.value as "solid" | "dashed" })
          }
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
        </select>
      </div>
    </>
  )}

  {chart.chartType === "bar" && (
    <div className="form-row">
      <label htmlFor="barColor">Bar Color:</label>
      <input
        type="color"
        id="barColor"
        value={chart.barColor}
        onChange={(e) => updateChartConfig(chart.id, { barColor: e.target.value })}
      />
    </div>
  )}
</div>
  );
};

export default ChartCustomization;
