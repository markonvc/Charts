export interface Chart {
    id: number;
    seriesId: string;
    chartTitle: string;
    chartType: 'line' | 'bar';
    yAxisLabel: string;
    timeFrequency: 'daily' | 'monthly' | 'yearly';
}

export interface Observation {
    date: string;
    value: string;
}
  
export interface AggregatedData {
    date: string;
    value: string;
}
