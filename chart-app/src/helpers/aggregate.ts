import { format } from 'date-fns';
import { AggregatedData, Observation } from '../interfaces/interfaces';

export const aggregateDataByTimeFrequency = (
    observations: Observation[],
    timeFrequency: 'daily' | 'monthly' | 'yearly'
  ): AggregatedData[] => {
    if (timeFrequency === 'daily') {
      return observations;
    }
  
    const grouped: { [key: string]: Observation[] } = {};
  
    observations.forEach((obs) => {
      const date = new Date(obs.date);
      let key: string;
  
      if (timeFrequency === 'monthly') {
        key = format(date, 'yyyy-MM');
      } else if (timeFrequency === 'yearly') {
        key = format(date, 'yyyy');
      } else {
        return;
      }
  
      if (!grouped[key]) {
        grouped[key] = [];
      }
  
      grouped[key].push(obs);
    });

    const aggregatedData: AggregatedData[] = Object.keys(grouped).map((key) => {
      const group = grouped[key];
      const value = group.reduce((sum: number, obs: Observation) => sum + parseFloat(obs.value), 0) / group.length;
      return {
        date: key,
        value: value.toString(),
      };
    });
    console.log(aggregatedData);
    
  
    return aggregatedData;
};
