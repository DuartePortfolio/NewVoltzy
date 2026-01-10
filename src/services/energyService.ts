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
