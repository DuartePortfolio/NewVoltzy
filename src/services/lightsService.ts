import { apiClient } from './api';

export interface Light {
  id: number;
  house_id: number;
  room_name: string;
  name: string;
  is_on: boolean;
  brightness: number;
  color: string;
  power_consumption_watts: number;
  created_at?: string;
}

export interface CreateLightData {
  house_id: number;
  room_name: string;
  name: string;
  is_on?: boolean;
  brightness?: number;
  color?: string;
  power_consumption_watts?: number;
}

export interface UpdateLightData {
  is_on?: boolean;
  brightness?: number;
  color?: string;
  name?: string;
  room_name?: string;
  power_consumption_watts?: number;
}

class LightsService {
  // Get all lights for a house
  async getLightsByHouse(houseId: number): Promise<Light[]> {
    const response = await apiClient.get<{ lights: Light[] }>(`/api/houses/${houseId}/lights`);
    return response.lights;
  }

  // Get lights by room
  async getLightsByRoom(houseId: number, roomName: string): Promise<Light[]> {
    const response = await apiClient.get<{ lights: Light[] }>(
      `/api/houses/${houseId}/rooms/${encodeURIComponent(roomName)}/lights`
    );
    return response.lights;
  }

  // Get single light details
  async getLight(lightId: number): Promise<Light> {
    const response = await apiClient.get<{ light: Light }>(`/api/lights/${lightId}`);
    return response.light;
  }

  // Create a new light
  async createLight(data: CreateLightData): Promise<Light> {
    const response = await apiClient.post<{ light: Light }>('/api/lights', data);
    return response.light;
  }

  // Update light state
  async updateLight(lightId: number, data: UpdateLightData): Promise<Light> {
    const response = await apiClient.put<{ light: Light }>(`/api/lights/${lightId}`, data);
    return response.light;
  }

  // Delete a light
  async deleteLight(lightId: number): Promise<void> {
    await apiClient.delete(`/api/lights/${lightId}`);
  }

  // Toggle light on/off
  async toggleLight(lightId: number, currentState: boolean): Promise<Light> {
    return this.updateLight(lightId, { is_on: !currentState });
  }

  // Update light brightness
  async updateBrightness(lightId: number, brightness: number): Promise<Light> {
    return this.updateLight(lightId, { brightness });
  }

  // Update light color
  async updateColor(lightId: number, color: string): Promise<Light> {
    return this.updateLight(lightId, { color });
  }
}

export const lightsService = new LightsService();
