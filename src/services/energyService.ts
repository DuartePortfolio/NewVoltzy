import { apiClient } from './api';

export interface CurrentEnergyStats {
  lights_on_count: number;
  current_consumption_kwh: number;
  today_consumption_kwh: number;
  today_saved_kwh: number;
  last_updated?: string;
}

export interface HourlyData {
  hour: number;
  consumption_kwh: number;
}

export interface HourlyConsumption {
  date: string;
  hourly_data: HourlyData[];
}

export interface RoomConsumption {
  room_name: string;
  light_count: number;
  lights_on: number;
  current_consumption_kw: number;
  total_capacity_kw: number;
}

export interface EnergyMeasurement {
  measurement_time: string;
  active_energy_import_kwh: number;
  active_energy_export_kwh: number;
  inst_active_power_import_kw: number;
  inst_active_power_export_kw: number;
}

export interface ProductionData {
  date: string;
  period: string;
  data: EnergyMeasurement[];
}

export interface LoadCurveDataPoint {
  measurement_time: string;
  consumption_kw: number;
  production_kw: number;
  net_flow_kw: number;
}

export interface LoadCurveData {
  date: string;
  period: string;
  data: LoadCurveDataPoint[];
}

export interface HeatmapHourData {
  hour: number;
  days: number[]; // Array of 7 values (Sunday to Saturday)
}

export interface HeatmapData {
  heatmap: HeatmapHourData[];
}

export interface SolarMetrics {
  has_upac: boolean;
  upac_power_kw?: number;
  self_sufficiency_percentage: number;
  panel_efficiency_percentage: number;
  total_production_today_kwh?: number;
  total_consumption_today_kwh?: number;
}

class EnergyService {
  // Get current energy stats for dashboard
  async getCurrentStats(houseId: number): Promise<CurrentEnergyStats> {
    const response = await apiClient.get<CurrentEnergyStats>(
      `/api/houses/${houseId}/energy/current`
    );
    return response;
  }

  // Get hourly consumption data for chart
  async getHourlyConsumption(houseId: number, date?: string): Promise<HourlyConsumption> {
    const dateParam = date ? `?date=${date}` : '';
    const response = await apiClient.get<HourlyConsumption>(
      `/api/houses/${houseId}/energy/hourly${dateParam}`
    );
    return response;
  }

  // Get consumption by room
  async getConsumptionByRoom(houseId: number): Promise<RoomConsumption[]> {
    const response = await apiClient.get<{ rooms: RoomConsumption[] }>(
      `/api/houses/${houseId}/energy/by-room`
    );
    return response.rooms;
  }

  // Get energy production data
  async getProductionData(houseId: number, date?: string, period?: string): Promise<ProductionData> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (period) params.append('period', period);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    const response = await apiClient.get<ProductionData>(
      `/api/houses/${houseId}/energy/production${queryString}`
    );
    return response;
  }

  // Get load and production curve data
  async getLoadCurveData(houseId: number, date?: string, period?: string): Promise<LoadCurveData> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (period) params.append('period', period);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    const response = await apiClient.get<LoadCurveData>(
      `/api/houses/${houseId}/energy/load-curve${queryString}`
    );
    return response;
  }

  // Get consumption heatmap data
  async getHeatmapData(houseId: number): Promise<HeatmapData> {
    const response = await apiClient.get<HeatmapData>(
      `/api/houses/${houseId}/energy/heatmap`
    );
    return response;
  }

  // Get solar panel metrics
  async getSolarMetrics(houseId: number): Promise<SolarMetrics> {
    const response = await apiClient.get<SolarMetrics>(
      `/api/houses/${houseId}/energy/solar-metrics`
    );
    return response;
  }

  // Update energy stats (for testing/simulation)
  async updateEnergyStats(
    houseId: number,
    data: Partial<CurrentEnergyStats>
  ): Promise<void> {
    await apiClient.post(`/api/houses/${houseId}/energy/update`, data);
  }

  // Add hourly consumption data (for testing/simulation)
  async addHourlyData(
    houseId: number,
    date: string,
    hour: number,
    consumption_kwh: number
  ): Promise<void> {
    await apiClient.post(`/api/houses/${houseId}/energy/hourly`, {
      date,
      hour,
      consumption_kwh,
    });
  }
}

export const energyService = new EnergyService();
