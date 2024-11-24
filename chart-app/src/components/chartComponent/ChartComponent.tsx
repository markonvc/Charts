import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchFREDData } from '../../services/chartService';
import "./ChartComponent.css"


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({
  seriesId,
  chartType,
  chartTitle,
  yAxisLabel,
  timeFrequency,
  lineColor = 'rgba(75, 192, 192, 1)',
  barColor = 'rgba(75, 192, 192, 1)',
  lineStyle = 'solid',
}: {
  seriesId: string;
  chartType: 'line' | 'bar';
  chartTitle: string;
  yAxisLabel: string;
  timeFrequency: 'daily' | 'monthly' | 'yearly';
  lineColor?: string;
  barColor?: string;
  lineStyle?: 'solid' | 'dashed';
  barThickness?: number;
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFREDData(seriesId, timeFrequency);
        setChartData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [seriesId, timeFrequency]);

  if (loading) return <div>Loading...</div>;
  if (!chartData) return <div>Error loading chart data</div>;
  console.log(lineColor);
  
  

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
      x: {
        title: {
          display: true,
          text: `Time Frequency: ${timeFrequency}`,
        },
      },
    },
    elements: {
      line: {
        borderColor: lineColor,
        borderWidth: 4,
        borderDash: lineStyle === "dashed" ? [5, 5] : [],
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
      x: {
        title: {
          display: true,
          text: `Time Frequency: ${timeFrequency}`,
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: barColor,
        borderColor: barColor,
        borderWidth: 1,
        borderRadius: 5,
      },
    },
  };

  
  return (
    <div className='chart'>
      {chartType === 'line' ? (
        <Line data={chartData} options={lineOptions} />
      ) : (
        <Bar data={chartData} options={barOptions} />
      )}
    </div>
  );
};

export default ChartComponent