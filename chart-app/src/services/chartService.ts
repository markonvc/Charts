import { axiosObservationInstance, axiosSearchInstance } from './axios';
import { aggregateDataByTimeFrequency } from '../helpers/aggregate';


export const fetchFREDData = async (seriesId: string, timeFrequency: 'daily' | 'monthly' | 'yearly') => {
  try {
    const response = await axiosObservationInstance.get('', {
        params: { series_id: seriesId}
    });

    const observations = response.data.observations.filter((obs: any) => obs.value !== '.');

    const aggregatedData = aggregateDataByTimeFrequency(observations, timeFrequency);

    const chartData = {
        labels: aggregatedData.map((obs: any) => obs.date),
        datasets: [
        {
            label: seriesId,
            data: aggregatedData.map((obs: any) => parseFloat(obs.value)),
        },
        ], 
    };

    return chartData;
  } catch (error) {
    console.error('Error fetching data from FRED:', error);
    throw error;
  }
};

export const fetchFREDSeries = async (searchText: string): Promise<any> => {
  try {
    const seriess = await axiosSearchInstance.get('', {
        params: {search_text: searchText}
    });
    return seriess?.data
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
