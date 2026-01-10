import { apiClient } from './api';

export interface House {
  id: number;
  name: string;
  address?: string;
  contracted_power_kva?: number;
  has_upac?: boolean;
  upac_power_kw?: number;
  created_at?: string;
}

export interface Room {
  id: number;
  name: string;
  house_id?: number;
  created_at?: string;
}

export interface CreateHouseData {
  name: string;
  address?: string;
  contracted_power_kva?: number;
  has_upac?: boolean;
  upac_power_kw?: number;
}

export interface CreateRoomData {
  name: string;
}

class HousesService {
  // Get all houses for the current user
  async getHouses(): Promise<House[]> {
    const response = await apiClient.get<{ houses: House[] }>('/api/houses');
    return response.houses;
  }

  // Create a new house
  async createHouse(data: CreateHouseData): Promise<House> {
    const response = await apiClient.post<{ house: House }>('/api/houses', data);
    return response.house;
  }

  // Get all rooms in a house
  async getRooms(houseId: number): Promise<Room[]> {
    const response = await apiClient.get<{ rooms: Room[] }>(`/api/houses/${houseId}/rooms`);
    return response.rooms;
  }

  // Get unique room names from lights (alternative to rooms table)
  async getRoomNames(houseId: number): Promise<string[]> {
    try {
      const lights = await apiClient.get<{ lights: any[] }>(`/api/houses/${houseId}/lights`);
      const roomNames = [...new Set(lights.lights.map((light: any) => light.room_name))];
      return roomNames.filter(Boolean) as string[];
    } catch (error) {
      console.error('Failed to fetch room names:', error);
      return [];
    }
  }

  // Create a new room
  async createRoom(houseId: number, data: CreateRoomData): Promise<Room> {
    const response = await apiClient.post<{ room: Room }>(`/api/houses/${houseId}/rooms`, data);
    return response.room;
  }
}

export const housesService = new HousesService();
