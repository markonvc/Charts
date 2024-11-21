import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchFREDData } from '../services/chartService';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ seriesId, chartType, chartTitle, yAxisLabel, timeFrequency, }: { seriesId: string, chartType: 'line' | 'bar', chartTitle: string, yAxisLabel: string, timeFrequency: 'daily' | 'monthly' | 'yearly' }) => {
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
  console.log(chartData);
  
  return (
    <div>
      {chartType === 'line' ? (
        <Line
          data={chartData}
          options={{
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
          }}
        />
      ) : (
        <Bar
          data={chartData}
          options={{
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
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent